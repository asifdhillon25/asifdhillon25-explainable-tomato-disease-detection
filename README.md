# 🍅 Explainable Tomato Leaf Disease Detection Using EfficientNet-B0 and Grad-CAM

An AI-powered web application for automated tomato leaf disease classification using Deep Learning, Transfer Learning, and Explainable AI techniques.

The system utilizes EfficientNet-B0 for high-accuracy disease recognition and Grad-CAM for visual explanations, allowing users to understand which regions of the leaf influenced the model's prediction.

---

## 📖 Overview

Plant diseases significantly affect agricultural productivity and crop yield worldwide. Early disease detection can help farmers take timely corrective actions and reduce losses.

This project presents an end-to-end disease detection system capable of identifying ten tomato leaf conditions from images uploaded by users.

The application combines:

* Deep Learning
* Computer Vision
* Transfer Learning
* Explainable AI (XAI)
* Web Deployment

to deliver accurate and interpretable predictions.

---

## ✨ Features

### Disease Classification

* Detects 10 tomato leaf conditions
* Supports healthy and diseased leaves
* Real-time prediction

### Explainable AI

* Grad-CAM heatmaps
* Visual explanation of model decisions
* Improved transparency and trust

### Treatment Recommendations

* Disease-specific recommendations
* Basic preventive measures
* Agricultural guidance

### Modern Web Interface

* Drag-and-drop image upload
* Responsive design
* Real-time results
* Confidence score visualization

---

## 🧠 Model Information

### Baseline CNN

A custom Convolutional Neural Network was initially developed and trained as a baseline model.

Architecture:

* Conv2D (32 Filters)
* MaxPooling
* Conv2D (64 Filters)
* MaxPooling
* Conv2D (128 Filters)
* MaxPooling
* Flatten
* Dense (128)
* Dropout (0.5)
* Softmax Output Layer

Performance:

* Validation Accuracy: **87.4%**

---

### Proposed Model: EfficientNet-B0

To improve performance, EfficientNet-B0 was used through transfer learning.

Architecture:

Input Image (224×224×3)

↓

Data Augmentation

↓

EfficientNet-B0 Backbone

↓

Global Average Pooling

↓

Dense Layer (256)

↓

Dropout (0.4)

↓

Softmax Classifier

↓

Disease Prediction

Performance:

* Validation Accuracy: **95.1%**
* Macro F1 Score: **95%**
* Precision: **95%**
* Recall: **95%**

---

## 🔥 Explainable AI Using Grad-CAM

The project integrates Gradient-weighted Class Activation Mapping (Grad-CAM) to visualize model attention.

Grad-CAM highlights image regions that contributed most to the prediction.

Benefits:

* Increased model transparency
* Better interpretability
* Improved trustworthiness
* Easier validation of model decisions

---

## 🍅 Supported Classes

1. Tomato Bacterial Spot
2. Tomato Early Blight
3. Tomato Late Blight
4. Tomato Leaf Mold
5. Tomato Septoria Leaf Spot
6. Tomato Spider Mites
7. Tomato Target Spot
8. Tomato Yellow Leaf Curl Virus
9. Tomato Mosaic Virus
10. Healthy Tomato Leaf

---

## 📊 Dataset

Dataset Used:

**PlantVillage Tomato Disease Dataset**

Classes:

* 10 Categories

Training Images:

* 10,000

Validation Images:

* 1,000

Image Size:

* 224 × 224

Dataset Distribution:

* Balanced across classes

---

## 🏗️ System Architecture

Frontend (React + Vite)

↓

FastAPI Backend

↓

EfficientNet-B0 Model

↓

Disease Prediction

↓

Grad-CAM Generation

↓

Results Returned to User

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Framer Motion
* React Dropzone

### Backend

* FastAPI
* TensorFlow
* OpenCV
* NumPy
* Pillow
* Uvicorn

### Deep Learning

* TensorFlow / Keras
* EfficientNet-B0
* Transfer Learning
* Grad-CAM

### Deployment

* Vercel (Frontend)
* Hugging Face Spaces (Backend)

---

## 📂 Project Structure

```text
tomato-leaf-disease-detection/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   │   └── best_tomato_efficientnet_model.keras
│   └── uploads/
│
└── README.md
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/tomato-leaf-disease-detection.git

cd tomato-leaf-disease-detection
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

### Backend Setup

```bash
cd backend

python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn app:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

## 📈 Results

| Model           | Validation Accuracy |
| --------------- | ------------------- |
| Custom CNN      | 87.4%               |
| EfficientNet-B0 | 95.1%               |

Performance Improvement:

* Accuracy Increase: 7.7%
* Better Generalization
* Improved Feature Extraction

---

## 🎯 Future Improvements

* Mobile Application
* Multi-crop Disease Detection
* Severity Estimation
* Real-time Camera Detection
* Cloud-based Inference
* Farmer Advisory System

---

## 🎓 Academic Information

**Course:** Digital Image Processing

**Program:** BS Computer Science

**Department:** Department of Computer Science

**School:** School of Systems and Technology

**University:** University of Management and Technology (UMT)

**Instructor:** Dr. Abdul Jamil

**Student:** Muhammad Asif

**Student ID:** F2022266062

---

## 📧 Contact

Muhammad Asif

Email: [asifdhillon25@gmail.com](mailto:asifdhillon25@gmail.com)

GitHub: https://github.com/asifdhillon25

LinkedIn: https://linkedin.com/in/asifdhillon25

---

## 📜 License

This project was developed for academic and educational purposes as part of the Digital Image Processing course at the University of Management and Technology.
