# import librosa
# import librosa.display
# import matplotlib.pyplot as plt
# import pandas as pd
# import numpy as np
# from google import genai


# print("generating ans...")
# # Gemini setup
# client = genai.Client(api_key="AIzaSyDEYq1T3KWjz8dRujxCzZxSEAKsjczUJ4w")

# # Files to test
# files = ["audio1.wav","audio2.wav","audio3.wav","audio5.wav","harvard4.wav","ai.wav"]

# results = []
# # loop
# for f in filvenv\Scripts\activatees:
#     y, sr = librosa.load(f, sr=None)

#     # Features
#     zcr = np.mean(librosa.feature.zero_crossing_rate(y))
#     centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
#     flatness = np.mean(librosa.feature.spectral_flatness(y=y))
#     pitches = librosa.yin(y, fmin=50, fmax=300, sr=sr)
#     pitch_mean = float(np.mean(pitches))
#     pitch_std = float(np.std(pitches))
#     rms = librosa.feature.rms(y=y)
#     rms_var = float(np.var(rms))

#     # Pack features
#     features = {
#         "Zero Crossing Rate": float(zcr),
#         "Spectral Centroid": float(centroid),
#         "Spectral Flatness": float(flatness),
#         "Pitch Mean": pitch_mean,
#         "Pitch Std": pitch_std,
#         "RMS Variance": rms_var,
#     }

#     # Ask Gemini to classify
#     prompt = f"""
#     You are an audio forensic expert.
#     Based on these extracted audio features, decide if the voice 
#     is more likely HUMAN or AI-generated.

#     File: {f}
#     Features: {features}

#     Answer strictly in one short sentence: "Likely Human" or "Likely AI".
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt,
#     )

#     result = response.text.strip()
#     results.append({"file": f, "classification": result, **features})

# # Show results as dataframe
# df = pd.DataFrame(results)
# print("\nClassification Results:")
# print(df[["file","classification"]])

# main.py
import librosa
import numpy as np
import os

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)   # load audio
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # extract 13 MFCCs
    mfccs_mean = np.mean(mfccs, axis=1)  # take mean of each coefficient
    return mfccs_mean


# print("Human files:", os.listdir("data/human"))
# print("AI files:", os.listdir("data/ai"))
# building dataset

import pandas as pd

def load_dataset():
    features = []
    labels = []

    # human voices
    for file in os.listdir("data/human"):
        path = os.path.join("data/human",file)
        #skip if it is a folder
        if os.path.isdir(path):
            continue
        features.append(extract_features(path))
        labels.append(0)  # 0 = human

    # ai voices
    for file in os.listdir("data/ai"):
        path = os.path.join("data/ai",file)
        # skip if it is a folder
        if os.path.isdir(path):
            continue
        features.append(extract_features(path))
        labels.append(1)  # 1 = ai

    return np.array(features), np.array(labels)

X, y = load_dataset()
print(X)
print("Shape of X:", X.shape)  # (num_samples, 13)
print("Shape of y:", y.shape)  # (num_samples,)

# TRAINING ---LOGISTIC REGRESSION
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, accuracy_score

# Split dataset with stratify
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.4, random_state=42, stratify=y
)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
# print(len(X_train))
# print(len(X_test))
# print(len(y_train))
# print(len(y_test))
# Create and train the pipeline
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])
pipeline.fit(X_train, y_train)

# Make predictions
y_pred =model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
# Evaluate
# print("Accuracy:", accuracy_score(y_test, y_pred))
# cm = confusion_matrix(y_test, y_pred, labels=[0,1])
# print("Confusion Matrix:\n", cm)

test_file = "data/human/human1.wav"  # change this
features = extract_features(test_file).reshape(1, -1)
prediction = model.predict(features)

if prediction[0] == 0:
    print("✅ Human Voice")
else:
    print("❌ Deepfake Voice")


