import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_image(image_path):
    if not image_path:
        # No image path provided, use default image
        return 'default.jpg'

    if os.path.isfile(image_path):
        # Image path exists, copy it to the uploads folder
        filename = secure_filename(os.path.basename(image_path))
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        os.rename(image_path, file_path)
        return file_path
    else:
        # Invalid image path, use default image
        return 'default.jpg'
