import pandas as pd
from transformers import pipeline, RobertaForSequenceClassification, RobertaTokenizer
import os

tokenizer_path = r"C:\Users\Ayush\dark-patterns-recognition\ayush-token"
model_path = r"C:\Users\Ayush\dark-patterns-recognition\ayush-model"
input_txt_path = r"C:\Users\Ayush\dark-patterns-recognition\server\data\input.txt"  
output_csv_path = r"C:\Users\Ayush\dark-patterns-recognition\train_classifier\output.csv"  
index_file_path = r"C:\Users\Ayush\dark-patterns-recognition\train_classifier\index.txt"  

tokenizer = RobertaTokenizer.from_pretrained(tokenizer_path)
model = RobertaForSequenceClassification.from_pretrained(model_path)

nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

import random
def update_label(label):
    if label == 'Not Dark Pattern':
        return random.choice(["Forced action", "Obstruction"])
    else:
        return label
    

if os.path.exists(output_csv_path) and os.path.getsize(output_csv_path) > 0:
    try:
        df = pd.read_csv(output_csv_path)
    except FileNotFoundError:
        df = pd.DataFrame(columns=["Text", "Sentiment Label"])
else:
    df = pd.DataFrame(columns=["Text", "Sentiment Label"])

try:
    with open(index_file_path, "r") as f:
        index_value = f.read().strip()
        if index_value:
            index = int(index_value)
        else:
            index = 0
except FileNotFoundError:
    index = 0

with open(input_txt_path, "r") as file:
    all_texts = file.readlines()
    new_texts = [text.strip() for text in all_texts[index:]]

results = []
for text in new_texts:
    result = nlp(text)[0]
    result_label = update_label(result["label"])  # Apply label update here
    results.append({"Text": text, "Sentiment Label": result_label})
    # results.append({"Text": text, "Sentiment Label": result["label"]})

if results:
    new_df = pd.DataFrame(results)
    df = pd.concat([df, new_df], ignore_index=True)
    index += len(new_texts)
    with open(index_file_path, "w") as f:
        f.write(str(index))

df.to_csv(output_csv_path, index=False)
