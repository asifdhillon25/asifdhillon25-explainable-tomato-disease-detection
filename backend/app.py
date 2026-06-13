import base64
import io
import os

import cv2
import numpy as np
import tensorflow as tf

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI(title="Tomato Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "models/best_tomato_efficientnet_model.keras"
IMG_SIZE = 224

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = [
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

TREATMENTS = {
    "Tomato___Bacterial_spot": "Remove infected leaves, avoid overhead watering, and apply copper-based bactericide if needed.",
    "Tomato___Early_blight": "Remove affected leaves, improve air circulation, rotate crops, and use fungicide if infection spreads.",
    "Tomato___Late_blight": "Destroy infected plants, avoid wet foliage, and apply recommended fungicide immediately.",
    "Tomato___Leaf_Mold": "Improve ventilation, reduce humidity, remove infected leaves, and use fungicide if required.",
    "Tomato___Septoria_leaf_spot": "Remove diseased leaves, avoid watering leaves directly, and apply protective fungicide.",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Spray leaves with water, use insecticidal soap or neem oil, and reduce dry dusty conditions.",
    "Tomato___Target_Spot": "Remove infected debris, improve spacing, and use suitable fungicide for severe infection.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Control whiteflies, remove infected plants, and use resistant tomato varieties.",
    "Tomato___Tomato_mosaic_virus": "Remove infected plants, disinfect tools, avoid tobacco contamination, and use resistant varieties.",
    "Tomato___healthy": "The leaf appears healthy. Maintain proper watering, sunlight, and regular monitoring.",
}


@app.get("/")
def root():
    return {"message": "Tomato Disease Detection API is running"}


def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array, np.array(img)


def find_last_conv_layer(model):
    for layer in reversed(model.layers):
        try:
            if len(layer.output.shape) == 4:
                return layer.name
        except Exception:
            continue
    return None


def make_gradcam_heatmap(img_array, model, pred_index):
    last_conv_layer_name = find_last_conv_layer(model)

    if last_conv_layer_name is None:
        return None

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[
            model.get_layer(last_conv_layer_name).output,
            model.output,
        ],
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        class_channel = predictions[:, pred_index]

    grads = tape.gradient(class_channel, conv_outputs)

    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    max_value = tf.reduce_max(heatmap)

    if max_value == 0:
        return None

    heatmap = tf.maximum(heatmap, 0) / max_value
    return heatmap.numpy()


def overlay_gradcam(original_img, heatmap):
    original_img = cv2.resize(original_img, (IMG_SIZE, IMG_SIZE))
    original_img_bgr = cv2.cvtColor(original_img, cv2.COLOR_RGB2BGR)

    heatmap = cv2.resize(heatmap, (IMG_SIZE, IMG_SIZE))
    heatmap = np.uint8(255 * heatmap)

    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    superimposed_img = cv2.addWeighted(
        original_img_bgr,
        0.6,
        heatmap_color,
        0.4,
        0,
    )

    superimposed_rgb = cv2.cvtColor(superimposed_img, cv2.COLOR_BGR2RGB)

    pil_img = Image.fromarray(superimposed_rgb)
    buffer = io.BytesIO()
    pil_img.save(buffer, format="PNG")

    return base64.b64encode(buffer.getvalue()).decode("utf-8")


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    img_array, original_img = preprocess_image(image_bytes)

    predictions = model.predict(img_array)
    pred_index = int(np.argmax(predictions[0]))
    confidence = float(predictions[0][pred_index] * 100)

    predicted_class = CLASS_NAMES[pred_index]

    heatmap = make_gradcam_heatmap(img_array, model, pred_index)

    gradcam_image = None
    if heatmap is not None:
        gradcam_image = overlay_gradcam(original_img, heatmap)

    return {
        "predicted_class": predicted_class,
        "confidence": round(confidence, 2),
        "treatment": TREATMENTS.get(predicted_class, "No treatment suggestion available."),
        "gradcam_image": gradcam_image,
    }