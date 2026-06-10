# Deepfake Audio Detection 🎙️🤖

A Machine Learning-powered web application that detects whether an uploaded audio sample is **Human-generated** or **AI-generated (Deepfake)** using advanced audio signal processing and feature extraction techniques.

The system analyzes multiple acoustic characteristics such as **MFCCs, Zero Crossing Rate, Spectral Centroid, Chroma Features, RMS Energy, and Spectral Rolloff**, extracts 29 engineered audio features, and classifies the audio using a trained machine learning model.

---

## 🌐 Live Demo

**Frontend Deployment:**
[https://deepfake-audio-detection-4qel.vercel.app](https://deepfake-audio-detection-4qel.vercel.app)

---

## 📌 Features

* 🎵 Upload audio files for analysis
* 🤖 Detects **Human vs AI-generated speech**
* 📊 Extracts and visualizes important audio features
* 📄 Generates a detailed analysis report
* ⚡ Fast prediction response
* 🌐 Responsive web interface
* 📈 Confidence score for predictions
* 🔍 Displays feature-level insights
* 📥 Downloadable PDF report

---

## 🏗️ System Architecture

```text
                Audio File
                      │
                      ▼
            Feature Extraction
                      │
      ┌───────────────┼───────────────┐
      │               │               │
      ▼               ▼               ▼
    MFCCs           ZCR      Spectral Features
                                      │
                                      ▼
                            Chroma + RMS Energy
                                      │
                                      ▼
                         Feature Vector (29)
                                      │
                                      ▼
                          Trained ML Model
                                      │
                                      ▼
                     Human / AI Classification
                                      │
                                      ▼
                            Analysis Report
```

---

# 📂 Project Structure

```text
deepfake-audio-detection/
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│
├── audio_frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
├── data/
│
├── README.md
└── .gitignore
```

---

# 🧠 Machine Learning Pipeline

The backend loads a pre-trained machine learning pipeline:

```python
pipeline = joblib.load("model.pkl")
```

The model is trained on **29 handcrafted audio features** extracted using the Librosa audio processing library.

---

# 🎼 Audio Features Used

## 1. MFCC (Mel-Frequency Cepstral Coefficients)

MFCCs capture the spectral characteristics of human speech and are widely used in speech recognition systems.

Features:

```text
13 MFCC Mean Values
```

---

## 2. Spectral Centroid

Represents the "center of mass" of the spectrum.

```text
1 Feature
```

Higher values indicate brighter sounds.

---

## 3. Zero Crossing Rate (ZCR)

Measures how often the audio signal changes sign.

```text
1 Feature
```

Useful for distinguishing voiced and unvoiced sounds.

---

## 4. Spectral Rolloff

Represents the frequency below which most spectral energy exists.

```text
1 Feature
```

Helpful for detecting synthetic artifacts.

---

## 5. Chroma Features

Captures harmonic and pitch information.

```text
12 Features
```

---

## 6. RMS Energy

Measures average signal power.

```text
1 Feature
```

Useful for loudness analysis.

---

## Total Features

```text
13 MFCC Means
+1 Spectral Centroid
+1 Zero Crossing Rate
+1 Spectral Rolloff
+12 Chroma Means
+1 RMS Energy
---------------------
29 Total Features
```

---

# ⚙️ Backend API

## Base URL

```http
http://localhost:8080
```

---

## GET /

Health Check Endpoint

### Response

```json
{
  "message": "Welcome! Flask backend is running."
}
```

---

## POST /predict

Upload an audio file and get a prediction.

### Request

```http
POST /predict
Content-Type: multipart/form-data
```

### Form Data

| Field | Type       | Description         |
| ----- | ---------- | ------------------- |
| file  | Audio File | WAV, MP3, FLAC, OGG |

---

### Example Response

```json
{
  "message": "file_received",
  "label": "AI",
  "confidence": 0.93,
  "duration": 4.21,
  "prediction_time": 82,
  "features_number": "29"
}
```

---

## GET /report

Returns the latest generated report.

### Example Response

```json
{
  "label": "Human",
  "confidence": 0.89,
  "duration": 3.78,
  "prediction_time": 74
}
```

---

# 🔒 Supported Audio Formats

```text
.wav
.mp3
.flac
.ogg
```

Maximum upload size:

```text
50 MB
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

## Backend

* Flask
* Flask-CORS
* Librosa
* NumPy
* Joblib

## Machine Learning

* Scikit-Learn
* Feature Engineering
* Audio Signal Processing

---

# 🚀 Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/deepfake-audio-detection.git

cd deepfake-audio-detection
```

---

## 2. Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask server:

```bash
python app.py
```

Backend starts on:

```text
http://localhost:8080
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd audio_frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📊 Sample Workflow

1. Upload an audio file.
2. Audio is sent to Flask backend.
3. Librosa extracts 29 audio features.
4. Features are passed to trained ML model.
5. Model predicts:

   * Human Voice
   * AI-Generated Voice
6. Confidence score is calculated.
7. Detailed report is generated.
8. Results are displayed on the frontend dashboard.

---

# 📸 Application Screenshots

## Feature Analysis Dashboard

Displays extracted audio characteristics:

* MFCC Analysis
* Zero Crossing Rate
* Spectral Centroid
* Chroma Features
* RMS Energy
* Spectral Rolloff

## Prediction Report

Displays:

* Classification Result
* Confidence Score
* Processing Time
* Audio Duration
* Features Analyzed
* Model Version
* Key Indicators

---

# 📈 Future Improvements

* Deep Learning Models (CNN/LSTM)
* Transformer-based Audio Classification
* Multi-language Support
* Batch Audio Processing
* Real-time Audio Streaming Detection
* Enhanced Explainable AI (XAI)
* Larger Deepfake Audio Dataset
* Cloud Deployment for Backend

---

# 🎯 Use Cases

* Deepfake Voice Detection
* Audio Content Verification
* Cybersecurity Applications
* Media Authentication
* Fraud Prevention
* Voice Cloning Detection
* Research & Educational Purposes

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Ariba Razi**

Computer Science Engineering Student

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, please consider giving it a star on GitHub!
