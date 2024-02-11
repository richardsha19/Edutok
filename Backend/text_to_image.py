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

    prompt = "A painting depicting the signing of the Declaration of Independence."
    prompt2 = "A visualization of the French Revolution."
    prompt3 = "A painting capturing the Black Death in medieval Europe."

    time.sleep(2)

    print("1")
    a = datetime.datetime.now()
    print("The time is now: = %s:%s:%s" % (a.hour, a.minute, a.second))
    image = pipe(prompt).images[0]

    print("2")
    b = datetime.datetime.now()
    print("The time is now: = %s:%s:%s" % (b.hour, b.minute, b.second))
    image1 = pipe(prompt2).images[0]

    print("3")
    c = datetime.datetime.now()
    print("The time is now: = %s:%s:%s" % (c.hour, c.minute, c.second))
    image2 = pipe(prompt3).images[0]

    print("4")
    d = datetime.datetime.now()
    print("The time is now: = %s:%s:%s" % (d.hour, d.minute, d.second))

    image.save("declaration_independence.png")
    image1.save("french_revolution.png")
    image2.save("black_death.png")


e = datetime.datetime.now()
print ("The time is now: = %s:%s:%s" % (e.hour, e.minute, e.second))
text_to_image("tmp")
