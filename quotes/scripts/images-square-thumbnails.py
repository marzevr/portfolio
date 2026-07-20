from PIL import Image
import os

# Settings
image_folder = '.'
thumb_folder = 'tn'
thumb_size = 500  # Final square thumbnail size (e.g. 500x500)

# Create tn folder if it doesn't exist
if not os.path.exists(thumb_folder):
    os.makedirs(thumb_folder)

# Get all .jpg or .jpeg files (case-insensitive)
image_filenames = [
    f for f in os.listdir(image_folder)
    if f.lower().endswith(('.jpg', '.jpeg')) and os.path.isfile(f)
]

# Function to center-crop to square
def crop_center_square(img):
    width, height = img.size
    min_edge = min(width, height)
    left = (width - min_edge) // 2
    top = (height - min_edge) // 2
    right = left + min_edge
    bottom = top + min_edge
    return img.crop((left, top, right, bottom))

# Generate thumbnails
for filename in image_filenames:
    input_path = os.path.join(image_folder, filename)
    output_path = os.path.join(thumb_folder, filename)

    try:
        with Image.open(input_path) as img:
            img = crop_center_square(img)
            img = img.resize((thumb_size, thumb_size), Image.LANCZOS)
            img.save(output_path, "JPEG")
            print(f"✅ Square thumbnail saved: {output_path}")
    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")
