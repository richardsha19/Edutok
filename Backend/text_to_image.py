import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
import datetime
import time
#import intel_extension_for_pytorch as ipex
# diffusers is a library that includes pretrained diffusion models

model_id = "stabilityai/stable-diffusion-2-1"


def text_to_image(string_arr):
    # Use the DPMSolverMultistepScheduler (DPM-Solver++) scheduler here instead
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to("opencl")

    prompt = { PROMPT 1}

    time.sleep(2)

    a = datetime.datetime.now()
    image = pipe(prompt).images[0]

    d = datetime.datetime.now()

    image.save("declaration_independence.png")


e = datetime.datetime.now()
text_to_image("tmp")
