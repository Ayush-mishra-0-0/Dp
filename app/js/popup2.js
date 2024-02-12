document.addEventListener("DOMContentLoaded", function() {
    // Get the popup element
    var popup = document.getElementById("popup2");

    // Calculate the position to center the popup
    var topPosition = (window.innerHeight - popup.offsetHeight) / 2;
    var leftPosition = (window.innerWidth - popup.offsetWidth) / 2;

    // Set the position of the popup
    popup.style.top = topPosition + "px";
    popup.style.left = leftPosition + "px";
});
