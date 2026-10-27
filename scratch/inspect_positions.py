import fitz

pdf_path = r"C:\Users\aryan kothari\Downloads\Shri Metro products catalogue.pdf"
doc = fitz.open(pdf_path)

for page_num in range(4, 28): # pages 5 to 28
    page = doc[page_num]
    text = page.get_text()
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    print(f"=== Page {page_num + 1} ===")
    print("Text lines:", lines)
    
    # get image rects
    for img_info in page.get_image_info(xrefs=True):
        xref = img_info['xref']
        bbox = img_info['bbox']
        width = img_info['width']
        height = img_info['height']
        if width > 100 and height > 100 and width != 1125: # filter out background
            print(f"  Image xref={xref}, bbox={bbox}, size={width}x{height}")
