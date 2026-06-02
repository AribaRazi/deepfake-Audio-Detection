from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import librosa
import os
import tempfile
import time

# ---------------- Configuration ----------------
MODEL_PATH = "model.pkl"  # your trained model file
ALLOWED_EXTS = {".wav", ".mp3", ".flac", ".ogg"}
MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50 MB
latest_report=None
# ---------------- Load model ----------------
print("Loading trained model...")
pipeline = joblib.load(MODEL_PATH)
print("Model loaded successfully!")

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH
# CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])  # allow frontend
CORS(app)

# ---------------- Helper ----------------
def allowed_file(filename):
    _, ext = os.path.splitext(filename.lower())
    return ext in ALLOWED_EXTS

def extract_duration(file_path):
    y,sr=librosa.load(file_path,sr=None)
    duration = librosa.get_duration(y=y, sr=sr)
    return duration
def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs_mean = np.mean(mfccs, axis=1)
    mfccs_var = np.var(mfccs, axis=1)

    centroid = np.array([np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))])
    zcr = np.array([np.mean(librosa.feature.zero_crossing_rate(y))])
    rolloff = np.array([np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))])

    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    chroma_mean = np.mean(chroma, axis=1)
    rms_mean = np.array([np.mean(librosa.feature.rms(y=y))])

    # Combine into 1D array safely
    features = np.hstack([
        mfccs_mean,   # 13
        # mfccs_var,    # 13
        centroid,     # 1
        zcr,          # 1
        rolloff,      # 1
        chroma_mean,  # 12
        rms_mean    # 1
    ])
    return features  # shape (29,)
# ---------------- Prediction Endpoint ----------------
@app.route('/')
def home():
    return jsonify({"message":"Welcome!Flask backend is running."})
@app.route("/favicon.svg")
def favicon():
    print("ok")
@app.route("/predict", methods=["POST"])
def predict():
    start_time = time.time()

    if "file" not in request.files:
        return jsonify({"error": "Missing file"}), 400

    f = request.files["file"]
    if f.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    if not allowed_file(f.filename):
        return jsonify({"error": "Unsupported file type"}), 400

    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(f.filename)[1]) as tmp:
        tmp_name = tmp.name
        f.save(tmp_name)

    try:
        duration = extract_duration(tmp_name)
        features = extract_features(tmp_name)
        print("features shape:", features.shape)
        features_dict = {
             "mfcc_mean": features[:13].tolist(),
             "centroid": float(features[13]),
             "zcr": float(features[14]),
             "rolloff": float(features[15]),
             "chroma_mean": features[16:28].tolist(),
             "rms": float(features[28])
}

        features_2d = features.reshape(1, -1)
        pred = pipeline.predict(features_2d)[0]
        if hasattr(pipeline, "predict_proba"):
            probs = pipeline.predict_proba(features_2d)[0]
            confidence = float(np.max(probs))
        else:
            confidence = None

        label = "Human" if pred == 0 else "AI"

        response = {
            "message": "file_received",
            "features": features_dict,
            "duration": duration,
            "label": label,
            "confidence": confidence,
            "prediction_time": int((time.time() - start_time) * 1000),
            "features_number": "42"
        }
        global latest_report
        latest_report = response
        return jsonify(response), 200

    except Exception as e:
        print("❌ Error during prediction:", e)
        return jsonify({"error": "Prediction failed", "message": str(e)}), 500

    finally:
        try:
            os.remove(tmp_name)
        except Exception:
            pass

@app.route("/report",methods=["GET"])
def get_report():
    global latest_report
    if latest_report:
        return jsonify(latest_report)
    else:
        return jsonify({"message": "No report available yet. Please upload a file first."}), 404
    
# ---------------- Run ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
