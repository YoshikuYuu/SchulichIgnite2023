// Specify the path to your JSON file
const jsonFilePath = 'chinese_influence_by_rof.json';

// Fetch the JSON file
fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then(jsonData => {
        // Access the JSON data
        console.log(jsonData);

        // You can use jsonData as a JavaScript object here
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
