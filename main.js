const SIZE_FACTOR = 0.5;

document.addEventListener('DOMContentLoaded', function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // set the canvas size to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    // On click, draw an egg
    canvas.addEventListener('click', drawer(ctx));

    // On right click, clear the canvas
    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // On double click, draw pepper noise
    canvas.addEventListener('dblclick', pepperDrawer(ctx));

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomHexColorBasedOnHue(hue, delta = 20) {
    let h = hue + randInt(-delta, delta);
    let s = randInt(80, 100);
    let l = randInt(50, 70);

    return `hsl(${h}, ${s}%, ${l}%)`;

}

const drawer = (ctx) => ((event) => {
    event.preventDefault();
    console.log("draw");
    console.log(event.clientX, event.clientY);
    console.log(event);

    const numCircles = randInt(3, 10);

    let data = Array.from(
        {length: numCircles},
        () => ({
            x: event.clientX + randInt(-40 * SIZE_FACTOR, 40 * SIZE_FACTOR),
            y: event.clientY + randInt(-40 * SIZE_FACTOR, 40 * SIZE_FACTOR),
            radius: randInt(30 * SIZE_FACTOR, 75 * SIZE_FACTOR)
        }),
    );

    ctx.fillStyle = '#b5651d';
    const add = randInt(0.1 * SIZE_FACTOR, 2 * SIZE_FACTOR);
    for ({x, y, radius} of data) {
        ctx.beginPath();

        ctx.arc(
            x + randInt(-2 * SIZE_FACTOR, 2 * SIZE_FACTOR),
            y + randInt(-2 * SIZE_FACTOR, 2 * SIZE_FACTOR),
            radius + add,
            0,
            2 * Math.PI,
        );
        ctx.fill();
    }

    for ({x, y, radius} of data) {
        ctx.fillStyle = Math.random() < 0.85 ? '#ffffef' : "#ffffea";
        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            2 * Math.PI,
        );
        ctx.fill();
    }

    ctx.fillStyle = randomHexColorBasedOnHue(37, 7);
    ctx.beginPath();
    ctx.arc(
        event.clientX,
        event.clientY,
        22 * SIZE_FACTOR,
        0,
        2 * Math.PI,
    );
    ctx.fill();

    // ctx.stroke();

});

function generateRandomPoint(x, y, minDistance, maxDistance) {
    // Generate a random angle between 0 and 2π radians
    const angle = Math.random() * 2 * Math.PI;

    // Generate a random distance between minDistance and maxDistance
    const distance = minDistance + Math.random() * (maxDistance - minDistance);

    // Calculate the new point's coordinates
    const newX = x + distance * Math.cos(angle);
    const newY = y + distance * Math.sin(angle);

    return { x: newX, y: newY };
}

const pepperDrawer = (context) => (event) => drawPepper(context, event.clientX, event.clientY, 75 * SIZE_FACTOR);

function drawPepper(ctx, x, y, size) {
    // Draws random pepper noise in a circle of radius size at (x, y)
    const numPeppers = randInt(10, 75);
    const pepperSize = Math.random() * 0.5 + 1.25;
    const pepperColor = 'black';
    const saltColor = 'white';

    for (let i = 0; i < numPeppers; i++) {
        ctx.fillStyle = Math.random() > 0.75 ? pepperColor : saltColor;

        let {x: newX, y: newY} = generateRandomPoint(x, y, 0, size * (0.5 + Math.random()));

        ctx.fillRect(
            newX,
            newY,
            pepperSize,
            pepperSize
        );
    }
}
