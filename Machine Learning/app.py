import cv2
import mediapipe as mp
import numpy as np
from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
from skimage import filters
from scipy.ndimage import gaussian_filter
from flask_cors import CORS,cross_origin


app = Flask(__name__)

CORS(app, origins="http://localhost:5173/")


mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

mp_face_mesh = mp.solutions.face_mesh

def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    equalized = cv2.equalizeHist(blurred)
    return equalized

def segment_hair_and_scalp(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    _, scalp_mask = cv2.threshold(s, 40, 255, cv2.THRESH_BINARY_INV)
    _, hair_mask = cv2.threshold(v, 80, 255, cv2.THRESH_BINARY)
    combined_mask = cv2.bitwise_and(scalp_mask, hair_mask)
    return combined_mask

def analyze_hair(image, mask):
    total_area = mask.size
    scalp_area = cv2.countNonZero(mask)
    hair_coverage = (total_area - scalp_area) / total_area * 100

    if hair_coverage > 85:
        baldness_level = "Full Hair"
    elif hair_coverage > 50:
        baldness_level = "Thinning"
    else:
        baldness_level = "Bald"

    return {"hair_coverage": f"{hair_coverage:.2f}%", "baldness_level": baldness_level}

def analyze_hairline(mask):
    top_region = mask[:mask.shape[0] // 3, :]
    column_sums = np.sum(top_region, axis=0)
    hairline_position = int(np.argmax(column_sums > 0))
    hairline_status = "Receding" if hairline_position > mask.shape[1] // 3 else "Normal"
    return {"hairline_position": hairline_position, "hairline_status": hairline_status}

@app.route('/analyze_baldness', methods=['POST'])
def analyze_baldness():
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    preprocessed_image = preprocess_image(image)
    mask = segment_hair_and_scalp(image)
    hair_analysis = analyze_hair(image, mask)
    hairline_analysis = analyze_hairline(mask)
    return jsonify({
        "hair_analysis": hair_analysis,
        "hairline_analysis": hairline_analysis
    })

#analyze_fingers_____________________________________________________________________________________
def crop_nail_region(image):
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_image)
    
    if not results.multi_hand_landmarks:
        print("No hands detected.")
        return None
    
    hand_landmarks = results.multi_hand_landmarks[0]
    
    finger_tips = [
        hand_landmarks.landmark[4],  
        hand_landmarks.landmark[8],  
        hand_landmarks.landmark[12], 
        hand_landmarks.landmark[16], 
        hand_landmarks.landmark[20]  
    ]
    
    h, w, _ = image.shape
    finger_coords = [(int(finger.x * w), int(finger.y * h)) for finger in finger_tips]
    
    x_coords, y_coords = zip(*finger_coords)
    x_min, x_max = min(x_coords), max(x_coords)
    y_min, y_max = min(y_coords), max(y_coords)
    
    margin = 20
    x_min = max(0, x_min - margin)
    x_max = min(w, x_max + margin)
    y_min = max(0, y_min - margin)
    y_max = min(h, y_max + margin)
    
    cropped_nail_region = image[y_min:y_max, x_min:x_max]
    
    return cropped_nail_region

def get_dominant_color(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pixels = image_rgb.reshape(-1, 3)
    kmeans = KMeans(n_clusters=1)
    kmeans.fit(pixels)
    dominant_color = kmeans.cluster_centers_[0].astype(int)
    dominant_color_hex = "#{:02x}{:02x}{:02x}".format(dominant_color[0], dominant_color[1], dominant_color[2])
    return dominant_color_hex

@app.route('/analyze_fingers', methods=['POST'])
def analyze_fingers():
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    nail_region = crop_nail_region(image)
    if nail_region is not None:
        nail_color = get_dominant_color(nail_region)
        
        return jsonify({
            "nail_color": nail_color,
            "message": "Nail region detected and color extracted successfully."
        })
    else:
        return jsonify({"error": "No hand detected or wrong hand placement"}), 400
    


#analyze_face_____________________________________________________________________________________
@app.route('/analyze_face', methods=['POST'])
def analyze_face():
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    results = {}
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1)
    result = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if not result.multi_face_landmarks:
        return jsonify({"error": "No face detected"}), 400
    landmarks = result.multi_face_landmarks[0].landmark

    
    resized_image = cv2.resize(image, (512, 512))
    gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
    h, w, _ = resized_image.shape

    
    face_region = resized_image[ 
        int(landmarks[10].y * h):int(landmarks[152].y * h),
        int(landmarks[234].x * w):int(landmarks[454].x * w)
    ]
    hsv_face_region = cv2.cvtColor(face_region, cv2.COLOR_BGR2HSV)
    avg_hue = hsv_face_region[:, :, 0].mean()
    if avg_hue < 30:
        results['skin_tone'] = "Fair"
    elif avg_hue < 50:
        results['skin_tone'] = "Medium"
    else:
        results['skin_tone'] = "Dark"

    lip_distance = np.linalg.norm([ 
        landmarks[13].x - landmarks[14].x, landmarks[13].y - landmarks[14].y
    ]) * h
    if lip_distance > 8:
        results['expression'] = "Smiling"
    else:
        left_brow = landmarks[55]
        right_brow = landmarks[285]
        left_eye = landmarks[133]
        right_eye = landmarks[362]
        left_brow_distance = np.abs(left_brow.y - left_eye.y) * h
        right_brow_distance = np.abs(right_brow.y - right_eye.y) * h
        left_corner = landmarks[61]
        right_corner = landmarks[291]
        lip_openness = np.abs(landmarks[13].y - landmarks[14].y) * h
        lip_width = np.abs(left_corner.x - right_corner.x) * w
        smile_ratio = lip_openness / lip_width
    
        if (left_brow_distance > 15 and right_brow_distance > 15) and smile_ratio < 0.2:
            results['expression'] = "Angry"
        elif smile_ratio > 0.2:
            results['expression'] = "Smiling"
        else:
            results['expression'] = "Neutral"

    sobel_edges = filters.sobel(gray)
    texture_score = sobel_edges.mean()
    results['skin_texture'] = "Smooth" if texture_score < 0.03 else "Rough"

    left_eye_region = gray[
        int(landmarks[159].y * h):int(landmarks[145].y * h),
        int(landmarks[33].x * w):int(landmarks[133].x * w)
    ]
    dark_circle_intensity = left_eye_region.mean()
    results['dark_circles'] = "Present" if dark_circle_intensity < 70 else "Absent"

    blurred = gaussian_filter(gray, sigma=2)
    spots = (blurred < 50).astype(int).sum()
    results['spots'] = f"{spots//10} spots detected" if spots/10 > 1000 else "Minimal spots"

    canny_edges = cv2.Canny(gray, 50, 150)
    wrinkle_density = np.sum(canny_edges) / (h * w)
    results['wrinkles'] = "Many" if wrinkle_density > 25 else "Few"

    top_point = landmarks[10]
    bottom_point = landmarks[152]
    left_point = landmarks[234]
    right_point = landmarks[454]
    jaw_left = landmarks[58]
    jaw_right = landmarks[288] 

    face_length = np.linalg.norm([top_point.x - bottom_point.x, top_point.y - bottom_point.y]) * h
    face_width = np.linalg.norm([left_point.x - right_point.x, left_point.y - right_point.y]) * w
    jaw_width = np.linalg.norm([jaw_left.x - jaw_right.x, jaw_left.y - jaw_right.y]) * w
    forehead_width = np.linalg.norm([landmarks[71].x - landmarks[401].x, landmarks[71].y - landmarks[401].y]) * w

    if face_length > face_width * 1.2 and jaw_width < face_width * 0.9:
        face_shape = "Oval"
    elif face_length < face_width * 1.1 and jaw_width > face_width * 0.95:
        face_shape = "Round"
    elif jaw_width / face_width > 0.8 and abs(jaw_width - forehead_width) < 0.1 * face_width:
        face_shape = "Square"
    elif forehead_width > jaw_width and jaw_width / face_width < 0.8:
        face_shape = "Heart"
    elif jaw_width > forehead_width:
        face_shape = "Triangle"
    else:
        face_shape = "Oval"

    results['face_shape'] = face_shape

    avg_brightness = gray.mean()
    results['health_index'] = f"{avg_brightness:.2f}"

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
