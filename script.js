const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const image = document.getElementById('map');
// Get the current height of the resized image
const currentHeight = image.offsetHeight;
const currentWidth = image.offsetWidth;

document.addEventListener('DOMContentLoaded', function () {
    const data = {
        "Canada": { total: 100, cows: 42 },
        "China": { total: 500, cows: 42 },
        "England": { total: 500, cows: 42 }
    };

    const visualizationContainer = document.getElementById('visualization');

    Object.entries(data).forEach(([country, values]) => {
        const radius = Math.sqrt(values.total);
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const originalWidth = `${radius * 2}px`;
        const originalHeight = `${radius * 2}px`;
        circle.style.width = originalWidth
        circle.style.height = originalHeight
        circle.style.left = `${(currentWidth / 610 * 106) / currentWidth * 100}%`;
        circle.style.top = `${(currentHeight / 363 * 102) / currentHeight * 100}%`;
        console.log(currentHeight);
        console.log(610 / currentHeight * 102);
        circle.title = `${country} - Total: ${values.total}, Cows: ${values.cows}`;

        circle.addEventListener('click', function () {
            toggleZoom(circle, originalWidth, originalHeight);
        });

        visualizationContainer.appendChild(circle);
    });

    function toggleZoom(circle, originalWidth, originalHeight) {
        // Check if the circle is zoomed in
        const isZoomedIn = circle.style.width === `${currentHeight - 20}px`;

        var imageContainer = document.getElementById('image-container');
        // Get the dimensions of the image
        var imageWidth = imageContainer.clientWidth;    
        // Toggle between zooming in and zooming out
        if (isZoomedIn) {
          // Zoom out
          circle.style.width = originalWidth;
          circle.style.height = originalHeight;
          circle.style.left = `${(currentWidth / 610 * 106) / currentWidth * 100}%`;
          circle.style.top = `${(currentHeight / 363 * 102) / currentHeight * 100}%`;
        } else {
          // Zoom in
          circle.style.width = `${currentHeight - 20}px`;
          circle.style.height = `${currentHeight - 20}px`;
          circle.style.left = `${imageWidth /2 - ((currentHeight - 20)/2)}px`;
          circle.style.top = `5px`;
        }
      }

      ///////// pie graph
});

let isPieGraphVisible = false;
    const pieGraphContainer2 = document.getElementById('pieGraphContainer2');
    const canvas = document.getElementById('pieGraph');
    const context = canvas.getContext('2d');

    function togglePieGraph() {
        isPieGraphVisible = !isPieGraphVisible;

        if (isPieGraphVisible) {
        drawPieGraph();
        canvas.removeAttribute('hidden');
        } else {
        canvas.setAttribute('hidden', 'true');
        }
    }

    function drawPieGraph() {
        const data = [30, 60, 90]; // Example data for the pie chart
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY);
        let startAngle = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(value => {
        const sliceAngle = (value / 90) * Math.PI;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        context.fillStyle = getRandomColor();
        context.fill();
        context.closePath();

        startAngle += sliceAngle;
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }