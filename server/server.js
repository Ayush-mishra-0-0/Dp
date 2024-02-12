const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port =3000;
const filePath = __dirname + '/data/input.txt';

app.post('/saveData', (req, res) => {
//     const userInput = req.body.userInput;

        const inputData = req.body.userInput; // Assuming your form sends data as { data: 'user input' }
        // console.log(req.body);
        fs.appendFile(filePath,inputData+'\n', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving data.');
            } else {
                console.log('Data saved successfully.');
                res.status(200).send('Data saved successfully.');
            }
        });    
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

