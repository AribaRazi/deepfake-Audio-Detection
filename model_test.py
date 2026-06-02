# EXTRACTION OF FEATURES USING LIBROSA LIBRARY
import librosa
import numpy as np
import os

import kagglehub

# Download latest version
path = kagglehub.dataset_download("kambingbersayaphitam/speech-dataset-of-human-and-ai-generated-voices")

print("Path to dataset files:", path)
print(os.listdir(path))

print("extracting features....")

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)

    # --- MFCCs ---
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs_mean = np.mean(mfccs, axis=1)
    mfccs_var = np.var(mfccs, axis=1)
    
    # --- Spectral Centroid ---
    centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))

    # --- Zero Crossing Rate ---
    zcr = np.mean(librosa.feature.zero_crossing_rate(y))

    # --- Spectral Rolloff ---
    rolloff = np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))

    # chroma faetures
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    chroma_mean = np.mean(chroma, axis=1) 
    # rms energy
    rms = librosa.feature.rms(y=y)
    rms_mean = np.mean(rms)
    # Combine all into one vector
    features = np.hstack([mfccs_mean, mfccs_var, centroid, zcr, rolloff, chroma_mean,rms_mean])
    return features

# Building a feature and label array for ai and human 
import pandas as pd

def load_dataset(base_path):
    features = []
    labels = []

    # human voices
    human_path=os.path.join(base_path,"Real/Real")
    for file in os.listdir(human_path):
        fpath=os.path.join(human_path,file)
        #skip if it is a folder
        if os.path.isdir(fpath):
            continue
        features.append(extract_features(fpath))
        labels.append(0)  # 0 = human

    # ai voices
    ai_path = os.path.join(base_path, "Fake/Fake")  
    for file in os.listdir(ai_path):
        fpath = os.path.join(ai_path, file)
        if os.path.isdir(fpath):
            continue
        features.append(extract_features(fpath))
        labels.append(1)  # 1 = ai

    return np.array(features), np.array(labels)

X, y = load_dataset(path)
# TEST SPLIT
print("shape of x",np.shape(X))
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.4, random_state=42, stratify=y
)

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ("scaler", StandardScaler()),  # normalize features
    ("clf", RandomForestClassifier(n_estimators=300, random_state=42))
])
# TRAINING THE MODEL..the model sees for which all values of x_train the values are 0 and 1 and thus learns the pattern
pipeline.fit(X_train, y_train)
import joblib
joblib.dump(pipeline, "model.pkl")
print("✅ Model trained and saved as model.pk123")
# accuracy is insufficient so we will create confusion matrix + classification report
from sklearn.metrics import confusion_matrix,classification_report,accuracy_score

# testing our model
y_pred=pipeline.predict(X_test)
# in accuracy_score we are comparing the values of y pred and y test and returning the accuracy
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred, labels=[0,1]))
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=["Human","AI"]))

def predict_audio(file_path):
    features = extract_features(file_path)  # use your existing feature extractor
    features = features.reshape(1, -1)      # reshape for model input
    prediction = pipeline.predict(features)[0]

    if prediction == 0:
        print("Human Voice")
    else:
        print("AI-generated Voice")


# predict_audio("data/ai/ai2.wav")

