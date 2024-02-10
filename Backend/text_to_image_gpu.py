import os
import random
import time
import numpy as np
from Text2ImgModel import Text2ImgModel

model_cache = {}


def prompt_to_image(prompt_text):
    output_dir = "output"
    model_ids = [
        "stabilityai/stable-diffusion-2-1",
        "CompVis/stable-diffusion-v1-4",
    ]

    enhance_checkbox_value = True
    num_images = 1

    enhancements = [
        "dark",
        "purple light",
        "dreaming",
        "cyberpunk",
        "ancient" ", rustic",
        "gothic",
        "historical",
        "punchy",
        "photo" "vivid colors",
        "4k",
        "bright",
        "exquisite",
        "painting",
        "art",
        "fantasy [,/organic]",
        "detailed",
        "trending in artstation fantasy",
        "electric",
        "night",
        "whimsical",
        "surreal",
        "mystical",
        "nostalgic",
        "vibrant",
        "tranquil",
        "cinematic",
        "enchanted",
        "ethereal",
        "pastoral"
    ]

    if not prompt_text:
        prompt_text = " "

    if enhance_checkbox_value:
        prompt_text = prompt_text + " " + " ".join(random.sample(enhancements, 5))
        print(f"Using enhanced prompt: {prompt_text}")

    for model_id in model_ids:
        model_key = (model_id, "xpu") # Changed from xpu
        if model_key not in model_cache:
            model_cache[model_key] = Text2ImgModel(model_id, device="xpu") # Changed from xpu

        model = model_cache[model_key]

        try:
            start_time = time.time()
            model.generate_images(
                prompt_text,
                num_images=num_images,
                save_path="./output",
            )
            print(f"Complete generating {num_images} images in './output' in {time.time() - start_time:.2f} seconds.")
        except Exception as e:
            print(f"An error occurred: {e}")


if __name__ == "__main__":
    prompt = "Barack Obama giving his inauguration speech"
    prompt_to_image(prompt)
