from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
from predict import predict_fat_loss, load_artifacts



app = Flask(__name__)
CORS(app)

REQUIRED = {
    "age", "gender", "height", "weight", "calories", "workout_duration",
    "steps", "sleep_hours", "water_intake", "activity_level"
}


@app.before_request
def warm_model():
    if request.endpoint == "predict":
        missing = [path.name for path in [Path("model.pkl"), Path("preprocessor.pkl")] if not (Path(__file__).resolve().parent / path).exists()]
        if missing:
            return jsonify({"message": "Model artifacts missing. Run python train_model.py first.", "missing": missing}), 503
        load_artifacts()


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/predict")
def predict():
    payload = request.get_json(silent=True) or {}
    missing = sorted(REQUIRED - set(payload.keys()))
    if missing:
        return jsonify({"message": "Missing required fields", "fields": missing}), 400
    try:
        return jsonify(predict_fat_loss(payload))
    except Exception as exc:
        return jsonify({"message": "Unable to generate prediction", "detail": str(exc)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

