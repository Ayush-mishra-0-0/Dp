# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from joblib import load

# presence_classifier = load('presence_classifier.joblib')
# presence_vect = load('presence_vectorizer.joblib')
# category_classifier = load('category_classifier.joblib')
# category_vect = load('category_vectorizer.joblib')

# app = Flask(__name__)
# CORS(app)

# @app.route('/', methods=['POST'])
# def main():
#     if request.method == 'POST':
#         output = []
#         data = request.get_json().get('tokens')

#         for token in data:
#             result = presence_classifier.predict(presence_vect.transform([token]))
#             if result == 'Dark':
#                 cat = category_classifier.predict(category_vect.transform([token]))
#                 output.append(cat[0])
#             else:
#                 output.append(result[0])

#         dark = [data[i] for i in range(len(output)) if output[i] == 'Dark']
#         for d in dark:
#             print(d)
#         print()
#         print(len(dark))

#         message = '{ \'result\': ' + str(output) + ' }'
#         print(message)

#         json = jsonify(message)

#         return json

# if __name__ == '__main__':
#     app.run(threaded=True, debug=True)

import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import load
from flask_sqlalchemy import SQLAlchemy

presence_classifier = load('presence_classifier.joblib')
presence_vect = load('presence_vectorizer.joblib')
category_classifier = load('category_classifier.joblib')
category_vect = load('category_vectorizer.joblib')

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///results.db'  
db = SQLAlchemy(app)

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(100))
    classification = db.Column(db.String(50))

@app.route('/', methods=['POST'])
def main():
    if request.method == 'POST':
        output = []
        data = request.get_json().get('tokens')
        for token in data:
            result = presence_classifier.predict(presence_vect.transform([token]))
            if result == 'Dark':
                cat = category_classifier.predict(category_vect.transform([token]))
                output.append(cat[0])
            else:
                output.append(result[0])
            
            # Log the token and classification
            # for i in output:
            #    if(i != 'Not Dark'):
            #       logging.info(f"Token: {token}, Classification: {i}")

            # Save token and classification to the database
            if(result[0] == 'Dark'): 
                result_entry = Result(token=token, classification=output[0])
                db.session.add(result_entry)
                db.session.commit()

        message = '{ \'result\': ' + str(output) + ' }'
        # print(message)
        return jsonify(message)

if __name__ == '__main__':
    with app.app_context():
        # logging.basicConfig(level=logging.INFO)
        db.create_all()
    app.run(threaded=True, debug=True)
