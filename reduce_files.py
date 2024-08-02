import os
from PIL import Image

def resize_images_in_directory(directory, width=135, height=228):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')):
                image_path = os.path.join(root, file)
                with Image.open(image_path) as img:
                    resized_img = img.resize((width, height))
                    resized_img.save(image_path)
                    print(f"Przeskalowano: {image_path}")

folder_path = "./packages/frontend/public/cards/"  # Zmień na ścieżkę do folderu z obrazami
resize_images_in_directory(folder_path)
