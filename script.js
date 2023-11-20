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

    console.log(rofPopData);

    const visualizationContainer = document.getElementById('visualization');

    Object.entries(coordinates).forEach(([country, coords]) => {
        const radius = Math.sqrt(100);
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const originalWidth = `${radius * 2}px`;
        const originalHeight = `${radius * 2}px`;
        circle.style.width = originalWidth
        circle.style.height = originalHeight
        console.log(currentHeight)
        circle.style.left = `${(currentWidth / 610 * coords[0]) / currentWidth * 100}%`;
        circle.style.top = `${(currentHeight / 363 * coords[1]) / currentHeight * 100}%`;
        circle.title = `${country} - Coords: ${coords[0]}, ${coords[1]}`;

        circle.addEventListener('click', function () {
            showPopup();
            // toggleZoom(circle, originalWidth, originalHeight);
        });

        visualizationContainer.appendChild(circle);
    });

    function showPopup() {
      togglePieGraph(true);
    }

    const canvas = document.getElementById('pieGraph');
    var context = canvas.getContext('2d');

    // Set canvas dimensions based on window size
    canvas.width = currentWidth;
    canvas.height = currentHeight - 20;

    canvas.addEventListener('click', function () {
      togglePieGraph(false);
      // toggleZoom(circle, originalWidth, originalHeight);
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

      function togglePieGraph(isPieGraphVisible) {
        if(isPieGraphVisible) {
          drawPieGraph();
          canvas.removeAttribute('hidden');
        } else {
          canvas.setAttribute('hidden', 'true')
        }
      }

      function drawPieGraph() {
        const data = [30, 60, 90];
        const centerX = currentWidth / 2;
        const centerY = (currentHeight - 20) / 2;
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
        })
      }

      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
});