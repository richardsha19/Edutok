from PyPDF2 import PdfReader 
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import openai
from dotenv import load_dotenv
import json
  
# creating a pdf reader object 
reader = PdfReader('ap-psych.pdf') 

startingPageNo = 87 # TODO: input from the frontend
endingPageNo = 89 # TODO: input from the frontend

textOutput = ""

for currPageNo in range(startingPageNo+1-2, endingPageNo+1-2):
    # getting a specific page from the pdf file 
    page = reader.pages[currPageNo] 

    # extracting text from page 
    textOutput += page.extract_text() 

tokenizer = AutoTokenizer.from_pretrained("lidiya/bart-large-xsum-samsum", use_fast=False)
model = AutoModelForSeq2SeqLM.from_pretrained("lidiya/bart-large-xsum-samsum")
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)

# Make the summarized content catchy

import os
load_dotenv()

openai.api_key = os.getenv('OPEN_AI_API_KEY')

summarizedTextOutput = summarizer(textOutput)

response = openai.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {
      "role": "system",
      "content": "don't use emojis but make the content sound intriguing with an attention catching opening in 33 words. add a relevant factual information that might help users understand the concept better."
    },
    {
      "role": "user",
      "content": summarizedTextOutput[0]["summary_text"]
    }
  ],
  temperature=0.7,
  max_tokens=64,
  top_p=1
)

print("\nOriginal Textbook Content:", textOutput)
print("========================================================")
print("\nSummarized Content:", summarizedTextOutput[0]["summary_text"])
print("========================================================")
print("\nChatGPT's catchy response:", response.choices[0].message.content)

# Firebase Connection
import firebase_admin
from firebase_admin import db, credentials

credentials_json_str = os.getenv('CREDENTIALS')
cred_obj_dict = json.loads(credentials_json_str)

# Create credentials object
cred_obj = credentials.Certificate(cred_obj_dict)

default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':"https://edutok-f643f-default-rtdb.firebaseio.com/"
	})
 
ref = db.reference("/PDFs/")
print(ref)

# with open("schema.json", "r") as f:
# 	file_contents = json.load(f)
      
# ref.set(file_contents)