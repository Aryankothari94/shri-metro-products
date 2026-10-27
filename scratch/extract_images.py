import os
import fitz # PyMuPDF
import io
from PIL import Image

pdf_path = r"C:\Users\aryan kothari\Downloads\Shri Metro products catalogue.pdf"
output_dir = r"c:\Users\aryan kothari\OneDrive\Desktop\shri-metro-products\public\products"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

img_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num + 1} has {len(image_list)} images")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        width = base_image["width"]
        height = base_image["height"]
        print(f"  Img {img_idx}: xref={xref}, size={width}x{height}, ext={image_ext}, bytes={len(image_bytes)}")
