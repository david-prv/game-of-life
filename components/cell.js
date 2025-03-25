class Cell {
    constructor(
        x,                      // The x coordinate
        y,                      // The y coordinate
        alive = false,          // Initial live state
        ctx = null,             // Reference to rendering context
        grid = null,            // Reference to the cell grid
        width = CELL_WIDTH,     // The cell width in pixels
        height = CELL_HEIGHT,   // The cell height in pixels
        colorAlive = "black",   // Color of a live cell
        colorDead = "white",    // Color of a dead cell
        colorGrid = "gray"      // Color of the grid lines
    ) { 
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.grid = grid;
        this.width = width;
        this.height = height;
        this.colorAlive = colorAlive;
        this.colorDead = colorDead;
        this.colorGrid = colorGrid;

        this.state = alive;
        this.nextState = false;
    }

    tick() {
        this.state = this.nextState;
    }

    update() {
        let neighbors = this.grid.neighbors(this.y, this.x);
        let aliveNeighbors = neighbors.filter(cell => cell.state).length;
    
        if (this.state) {
            this.nextState = !(aliveNeighbors < 2 || aliveNeighbors > 3);
        } else {
            this.nextState = aliveNeighbors === 3;
        }
    }

    draw() {
        this.ctx.fillStyle = this.state ? this.colorAlive : this.colorDead;
        this.ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        
        this.ctx.strokeStyle = this.colorGrid;
        this.ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}