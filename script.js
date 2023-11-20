const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const image = document.getElementById('map');
// Get the current height of the resized image
const currentHeight = image.offsetHeight;
const currentWidth = image.offsetWidth;

document.addEventListener('DOMContentLoaded', function () {
    console.log(rofData);

    const visualizationContainer = document.getElementById('visualization');

    Object.entries(coordinates).forEach(([country, coords]) => {
        const countryInfo = rofData[country];
        const radiusMultiplier = countryInfo["radius"];
        const radius = radiusMultiplier * 15;
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const originalWidth = `${radius * 2}px`;
        const originalHeight = `${radius * 2}px`;
        circle.style.width = originalWidth
        circle.style.height = originalHeight
        circle.style.left = `${(currentWidth / 610 * coords[0]) / currentWidth * 100}%`;
        circle.style.top = `${(currentHeight / 363 * coords[1]) / currentHeight * 100}%`;
        circle.title = `${country} - Coords: ${coords[0]}, ${coords[1]}`;

        circle.addEventListener('click', function () {
            togglePieGraph(true, country);
            // toggleZoom(circle, originalWidth, originalHeight);
        });

        visualizationContainer.appendChild(circle);
    });

    const canvas = document.getElementById('pieGraph');
    var context = canvas.getContext('2d');

    // Set canvas dimensions based on window size
    canvas.width = currentWidth;
    canvas.height = currentHeight - 20;

    canvas.addEventListener('click', function () {
      togglePieGraph(false);
      displayData(false, null, null)
    });
    ////////

    // Get the distance from the upper edge of the image to the top of the screen
    const distanceToTop = image.getBoundingClientRect().top;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    const centerX = (screenWidth - canvasWidth) / 2;
  
      // Set the position of the canvas
      canvas.style.left = centerX + 'px';
      canvas.style.top = distanceToTop + 'px';

      function togglePieGraph(isPieGraphVisible, country) {
        if(isPieGraphVisible) {
          drawPieGraph(country);
          canvas.removeAttribute('hidden');
        } else {
          canvas.setAttribute('hidden', 'true')
        }
      }

      function drawPieGraph(country) {
        const countryInfo = rofData[country];
        const owners = countryInfo["owners"];
        let count = [];
        let sum = 0;
        const parents = [];
        const totalFollows = countryInfo["followers"];
        Object.entries(owners).forEach(([owner, followers]) => {
          count.push(followers / countryInfo["followers"] * 180);
          sum += followers / countryInfo["followers"] * 180;
          let percentage = Math.round((followers / countryInfo["followers"] * 100) * 10) / 10;
          parents.push(owner + " (" +  percentage + "%)");
        });


        const centerX = currentWidth / 2;
        const centerY = (currentHeight - 20) / 2;
        const radius = Math.min(centerX, centerY);
        let startAngle = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const colours = [];

        count.forEach(value => {
          const sliceAngle = (value / 90) * Math.PI;
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
          const colour = getRandomColour();
          context.fillStyle = colour;
          colours.push(colour);
          context.fill();
          context.closePath();

          startAngle += sliceAngle;
        })

        displayData(true, parents, colours, country + " (Followers: " + totalFollows + ")");
      }

      function getRandomColour() {
        const letters = '0123456789ABCDEF';
        let colour = '#';
        for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
        }
        return colour;
      }

      const distanceFromBottom = image.getBoundingClientRect().bottom;
      
      function displayData(isDataVisible, parents, colours, country) {
        const container = document.getElementById('dataDisplay');
        const countryContainer = document.getElementById('countryNameDisplay');

        container.style.top = distanceFromBottom + 38 + "px";
        countryContainer.style.top = distanceFromBottom + 8 + "px";

        if (isDataVisible) {
            showRectangles(container, countryContainer, parents, colours, country);
        } else {
            // Clear the container to hide rectangles
            container.innerHTML = '';
            countryContainer.innerHTML = '';
        }
      }

      function showRectangles(container, countryContainer, parents, colours, country) {
        // Clear any existing rectangles
        container.innerHTML = '';

        const countryName = document.createTextNode(country);
        countryContainer.appendChild(countryName);

        let currentRow = null;

        // Create and append rectangles with country names
        for (let i = 0; i < colours.length; i++) {

          if (i % 4 === 0) {
            // Start a new row after every 5 countries
            currentRow = document.createElement('div');
            currentRow.classList.add('row');
            container.appendChild(currentRow);
          }

            const rectangle = document.createElement('div');
            rectangle.classList.add('rectangle');
            rectangle.style.backgroundColor = colours[i];

            const parentName = document.createTextNode(parents[i]);

            currentRow.appendChild(rectangle);
            currentRow.appendChild(parentName);
        }
    }
});