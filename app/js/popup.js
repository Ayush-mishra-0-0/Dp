// window.onload = function () {
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "popup_open" });
//   });

//   document.getElementsByClassName("analyze-button")[0].onclick = function () {
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
//     });
//   };

//   document.getElementsByClassName("link")[0].onclick = function () {
//     chrome.tabs.create({
//       url: document.getElementsByClassName("link")[0].getAttribute("href"),
//     });
//   };
// };

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "update_current_count") {
//     document.getElementsByClassName("number")[0].textContent = request.count;
//   }
// });
window.onload = function () {
  // Send message indicating popup is open
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "popup_open" });
  });

  // Wait for a short delay to allow the content script to initialize
  setTimeout(function () {
    // Simulate a click on the "ANALYZE SITE" button
    var analyzeButton = document.getElementsByClassName("analyze-button")[0];
    analyzeButton.click();
  }, 100);

  // Set the click event handler for the "ANALYZE SITE" button
  document.getElementsByClassName("analyze-button")[0].onclick = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
    });
  };
   // JavaScript for opening the popup
function openPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block"; // Display the popup
}

  // Set the click event handler for the "link" element
  document.getElementsByClassName("link")[0].onclick = function () {
    chrome.tabs.create({
      url: document.getElementsByClassName("link")[0].getAttribute("href"),
    });
  };
};

// Message listener for updating the current count
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "update_current_count") {
    document.getElementsByClassName("number")[0].textContent = request.count;
  }
 });
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "update_current_count") {
//     document.getElementsByClassName("number")[0].textContent = request.count;
//     function updatePatternCounts() {
//       // Get elements by class name
//       let urgencyElement = document.querySelector(".urgency-count");
//       let scarcityElement = document.querySelector(".scarcity-count");
//       let misdirectionElement = document.querySelector(".misdirection-count");
//       let socialProofElement = document.querySelector(".social-proof-count");
//       let obstructionElement = document.querySelector(".obstruction-count");
//       let forcedActionElement = document.querySelector(".forced-action-count");

//       // Update counts in HTML
//       urgencyElement.textContent = "Urgency: " + 18; // Assuming urgency is at index 2
//       scarcityElement.textContent = "Scarcity: " + 22; // Assuming scarcity is at index 1
//       misdirectionElement.textContent = "Misdirection: " + 38; // Assuming misdirection is at index 4
//       socialProofElement.textContent = "Social Proof: " + 5; // Assuming social proof is at index 3
//       obstructionElement.textContent = "Obstruction: " + 15; // Assuming obstruction is at index 7
//       forcedActionElement.textContent = "Forced Action: " + 16; // Assuming forced action is at index 6
//       // Add more lines for additional counts if needed
//     }

    // Call the function to update counts
  //   updatePatternCounts();
  // }
// });