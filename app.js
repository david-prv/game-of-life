var grid = Grid.from({ length: HEIGHT }, () => []);
var generation = 1;
var running = false;
var game_loop = null, context = null;

function createContext() {
    let canvas = document.getElementById('gameCanvas');
    canvas.width = WIDTH * CELL_WIDTH;
    canvas.height = HEIGHT * CELL_HEIGHT;
    context = canvas.getContext('2d');
}

function createGrid() {
    let random = (seed) => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (grid[y] === undefined) grid[y] = [];
            let alive = random(RANDOM_SEED + y * WIDTH + x) < ALIVE_PROBABILITY;
            grid[y].push(new Cell(x, y, alive, context, grid));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createContext();
    createGrid();
    
    grid.draw();

    document.getElementById('seed').innerText = RANDOM_SEED;
});

document.getElementById('toggleButton').addEventListener('click', () => {
    if (running) {
        running = false;
        clearInterval(game_loop);
    } else {
        running = true;
        game_loop = setInterval(() => {
            grid.update();
            grid.draw();
            generation++;

            document.getElementById('generation').innerText = generation;
        }, UPDATE_INTERVAL);
    }
});
