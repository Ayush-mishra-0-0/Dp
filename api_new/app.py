#flask server to run the ayush-model
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import RobertaTokenizer, RobertaForSequenceClassification, pipeline
from torch.nn.functional import softmax
import torch
from joblib import load

app = Flask(__name__)
CORS(app)

model= RobertaForSequenceClassification.from_pretrained(r'C:\Users\Ayush\dark-patterns-recognition\ayush-model')
tokenizer = RobertaTokenizer.from_pretrained(r'C:\Users\Ayush\dark-patterns-recognition\ayush-token')
nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@app.route('/', methods=['POST'])
def main():
    if request.method == 'POST':
        output = []
        data = request.get_json().get('tokens')
        for token in data:
            result = nlp(token)
            output.append(result[0])
        message = '{ \'result\': ' + str(output) + ' }'
        # print(message)
        json = jsonify(message)
        return json
    

if __name__ == '__main__':
    app.run(threaded=True, debug=True)