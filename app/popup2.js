// function saveFormData(event) {
//     event.preventDefault();
//     const endpoint = "http://localhost:3000/saveData";
//     var userInput = document.getElementById('userInput').value;
//     document.getElementById('userInput').value = '';

// fetch(endpoint, {
//     method: "POST",
//     headers: { "Content-Type": "application/json",},
//     body: JSON.stringify({ dat: userInput }),
// })
//     .then(response => {
//         if (response.ok) {
//             console.log('Form data saved successfully');
//             alert('Success! Your report has been submitted.');
//         } else {
//             console.error('Failed to save form data');
//         }
//     })
//     .catch(error => {
//         console.error('Error saving form data:', error);
//         // Optionally, display an error message or perform other actions
//     });
// }
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input field
    // Perform form submission via AJAX (or fetch)
    fetch(event.target.action, {
        method: event.target.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: userInput })
    })
    .then(response => {
        if (response.ok) {
            showAlert('Success! Your report has been submitted.');
        } else {
            console.error('Failed to save form data');
        }
    })
    .catch(error => {
        console.error('Error saving form data:', error);
    });
}

function showAlert(message) {
    // Create an alert element
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert');
    alertElement.textContent = message;

    // Append the alert element to the document body
    document.body.appendChild(alertElement);

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 3000);
}
