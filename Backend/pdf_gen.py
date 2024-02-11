from PyPDF2 import PdfReader
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import openai
from text_to_image_gpu import prompt_to_image


def split_string(input):
    '''
    Function: Parsing the json object we receive from firebase.
    Structure of json file: an array of key-value pairs, with keys being page numbers
    :return: array of strings
    '''

    # Test
    string_txt = { STRING }

    # parse json
    special_char = '*'

    str_arr = string_txt.split('*')
    return str_arr


def pdf_gen():
    # creating a pdf reader object
    reader = PdfReader('ap-psych.pdf')

    startingPageNo = 87  # TODO: input from the frontend
    endingPageNo = 89  # TODO: input from the frontend

    textOutput = ""

    for currPageNo in range(startingPageNo + 1 - 2, endingPageNo + 1 - 2):
        # getting a specific page from the pdf file
        page = reader.pages[currPageNo]

        # extracting text from page
        textOutput += page.extract_text()

    tokenizer = AutoTokenizer.from_pretrained("lidiya/bart-large-xsum-samsum", use_fast=False)
    model = AutoModelForSeq2SeqLM.from_pretrained("lidiya/bart-large-xsum-samsum")
    summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)

    # Make the summarized content catchy

    openai.api_key = "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"

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


    str_arr = split_string(response.choices[0].message.content)

    # Call the prompt_to_image()
    prompt_to_image(str_arr)


if __name__ == '__main__':
    pdf_gen()
