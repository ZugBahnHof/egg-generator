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

    document.addEventListener("resize", () => {
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

    ctx.fillStyle = '#FEA47F';
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

    ctx.fillStyle = 'white';
    for ({x, y, radius} of data) {
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