import os
import fitz

pdf_path = r"C:\Users\aryan kothari\Downloads\Shri Metro products catalogue.pdf"
output_dir = r"c:\Users\aryan kothari\OneDrive\Desktop\shri-metro-products\public\products"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Mapping of product style to xref
product_xrefs = {
    # Monobloc Chairs
    "alexa": 140,
    "spine": 145,
    "tip-top": 153,
    "powerstar": 154,
    "metallica": 168,
    "infinity": 162,
    "smarty": 171,
    "virat": 172,
    "tesla": 176,
    "heritage": 175,
    "jaguar": 179,
    "luxury": 180,
    "cosmo": 183,
    # Armless Chairs
    "samrat": 190,
    "dicor": 191,
    "platina": 194,
    "popular": 195,
    # Cafeteria Chairs
    "crystal": 201,
    "spykar": 199,
    "web": 209,
    # Relax Chairs
    "easy": 212,
    "holiday": 213,
    # Banquet Chairs
    "bahubali": 216,
    "hanuman": 218,
    "prabhu": 222,
    "shivji": 224,
    # Baby Chairs
    "baby-futura": 229,
    "kidzee": 230,
    "panda": 233,
    # Dining Tables
    "party-table-print": 242,
    "party-table": 243,
    "round-dt": 246,
    # Center Tables
    "sapphire": 251,
    "teapoy-print": 252,
    "teapoy-plain": 255,
    "teapoy-wheel": 256,
    # Stools
    "dabangg": 259,
    "magic": 260,
    "nawab": 263,
    "step-stool": 264,
    "tango": 267,
    # Patla
    "anchor": 274,
    "captain": 275
}

for name, xref in product_xrefs.items():
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    ext = base_image["ext"]
    filename = f"{name}.{ext}"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "wb") as f:
        f.write(image_bytes)
    print(f"Saved {filename} ({base_image['width']}x{base_image['height']})")

print(f"Total extracted: {len(product_xrefs)} products")
