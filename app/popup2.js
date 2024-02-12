function saveFormData(event) {
    event.preventDefault();
    const endpoint = "http://localhost:3000/saveData";
    var userInput = document.getElementById('userInput').value;

fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json",},
    body: JSON.stringify({ dat: userInput }),
})
    .then(response => {
        if (response.ok) {
            console.log('Form data saved successfully');
            // Optionally, display a success message or perform other actions
        } else {
            console.error('Failed to save form data');
            // Optionally, display an error message or perform other actions
        }
    })
    .catch(error => {
        console.error('Error saving form data:', error);
        // Optionally, display an error message or perform other actions
    });
}
