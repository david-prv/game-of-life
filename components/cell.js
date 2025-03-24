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

        this.repOk();
    }

    repOk() {
        console.assert(this.ctx,        "CanvasRenderingContext2D is required.");
        console.assert(this.width > 0,  "Width must be greater than 0.");
        console.assert(this.height > 0, "Height must be greater than 0."); 
        console.assert(this.colorAlive, "Color for alive cells is required.");
        console.assert(this.colorDead,  "Color for dead cells is required.");
        console.assert(this.colorGrid,  "Color for grid is required.");
        console.assert(this.x >= 0,     "X must be greater or equal to 0.");
        console.assert(this.y >= 0,     "Y must be greater or equal to 0.");
        console.assert(this.x < WIDTH,  "X must be less than WIDTH.");
        console.assert(this.y < HEIGHT, "Y must be less than HEIGHT.");
    }

    update() {
        this.repOk();
    
        let neighbors = this.grid.neighbors(this.y, this.x);
        let aliveNeighbors = neighbors.filter(cell => cell.state).length;
    
        if (this.state) {
            this.nextState = !(aliveNeighbors < 2 || aliveNeighbors > 3);
        } else {
            this.nextState = aliveNeighbors === 3;
        }
    
        this.repOk();
    }

    draw() {
        this.ctx.fillStyle = this.state ? this.colorAlive : this.colorDead;
        this.ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        
        this.ctx.strokeStyle = this.colorGrid;
        this.ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}