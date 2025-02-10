/* Link to the hosted html on github demonstrating the fetching of data from mtcar.json::
 https://ezamamtironaldaustine.github.io/fetching-json.github.io/ */
// 1. Function to fetch data using Callbacks
function fetchWithCallbacks() {
    fetch('mtcars.json')
        .then(response => {
            // If the response is not OK, throw an error
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json(); // Convert the response to JSON format
        })
        .then(data => {
            // Call to handle and display the data
            processAndDisplayData(data, "Callback"); // Pass 'Callback' 
        })
        .catch(error => {
            // Catch any errors during the fetch process and display them
            console.error("Error fetching data:", error);
            displayError(error); //  show the error on the page
        });
}

// 2. Function to fetch data using Promises (.then & .catch)
function fetchWithPromises() {
    fetch('mtcars.json')
        .then(response => {
            // If the response is not OK, throw an error
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json(); // Convert the response to JSON format
        })
        .then(data => {
            // Call to handle and display the data
            processAndDisplayData(data, "Promise"); // Pass 'Promise' 
        })
        .catch(error => {
            // Catch any errors during the fetch process and display them
            console.error("Error fetching data:", error);
            displayError(error); // Call displayError() to show the error on the page
        });
}

// 3. Function to fetch data using Async/Await (try & catch)
async function fetchWithAsyncAwait() {
    try {
        // Await the fetch operation to get the response
        let response = await fetch('mtcars.json');
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        // Await the conversion of the response to JSON format
        let data = await response.json();
        // Call to handle and display the data
        processAndDisplayData(data, "Async/Await"); // Pass 'Async/Await' 
    } catch (error) {
        // Catch any errors during the fetch process and display them
        console.error("Error fetching data:", error);
        displayError(error); // Call displayError() to show the error on the page
    }
}


// Function to process data and display it in the HTML page
function processAndDisplayData(data, method) {
    // Filter out cars with MPG greater than 25
    let filteredCars = data.filter(car => car.mpg > 25);

    // Get the output div element from the HTML to display data
    let outputDiv = document.getElementById("output");
    //  method used to fetch the data (Callback, Promise, Async/Await)
    outputDiv.innerHTML = `<h2>Fetched using ${method}</h2>`;

    // If no cars with MPG > 25 are found, display a message
    if (filteredCars.length === 0) {
        outputDiv.innerHTML += "<p>No cars with MPG > 25 found.</p>";
        return;
    }

    //  HTML table to display the filtered car data
    let table = `<table>
                    <tr>
                        <th>Model</th>
                        <th>MPG</th>
                        <th>Cylinders</th>
                        <th>HP</th>
                    </tr>`;

    // Looping through the filtered cars and create table rows for each car
    filteredCars.forEach(car => {
        table += `<tr>
                    <td>${car.model}</td>
                    <td>${car.mpg}</td>
                    <td>${car.cyl}</td>
                    <td>${car.hp}</td>
                  </tr>`;
    });

    // Close the table tag and append the table to the output div
    table += "</table>";
    outputDiv.innerHTML += table; // Append the table to the output div
}

// Function to display errors in the HTML page
function displayError(error) {
    // Display error message on the page
    document.getElementById("output").innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}

