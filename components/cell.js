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
        colorGrid = "gray",     // Color of the grid lines
        debug = false           // Debugging flag
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
        this.debug = debug;

        this.state = alive;
        this.nextState = false;

        this.repOk();
    }

    repOk() {
        if (!this.debug) return;
        console.assert(Number.isInteger(this.x),                        "X must be a number.");
        console.assert(Number.isInteger(this.y),                        "Y must be a number.");
        console.assert(this.x >= 0,                                     "X must be greater or equal to 0.");
        console.assert(this.y >= 0,                                     "Y must be greater or equal to 0.");
        console.assert(this.x < WIDTH,                                  "X must be less than WIDTH.");
        console.assert(this.y < HEIGHT,                                 "Y must be less than HEIGHT.");
        console.assert(this.ctx,                                        "CanvasRenderingContext2D is required.");
        console.assert(this.ctx instanceof CanvasRenderingContext2D,    "ctx must be a CanvasRenderingContext2D.");
        console.assert(this.grid,                                       "Grid is required.");
        console.assert(this.grid instanceof Grid,                       "Grid must be a Grid.");
        console.assert(this.width > 0,                                  "Width must be greater than 0.");
        console.assert(this.height > 0,                                 "Height must be greater than 0."); 
        console.assert(Number.isInteger(this.width),                    "Width must be an integer.");
        console.assert(Number.isInteger(this.height),                   "Height must be an integer.");
        console.assert(this.colorAlive,                                 "Color for alive cells is required.");
        console.assert(typeof this.colorAlive == "string",              "Color for alive cells must be a string.");
        console.assert(this.colorDead,                                  "Color for dead cells is required.");
        console.assert(typeof this.colorDead == "string",               "Color for dead cells must be a string.");
        console.assert(this.colorGrid,                                  "Color for grid is required.");
        console.assert(typeof this.colorGrid == "string",               "Color for grid must be a string.");
        console.assert(this.state !== undefined,                        "State must be defined.");
        console.assert(typeof this.state == "boolean",                  "State must be a boolean.");
        console.assert(this.nextState !== undefined,                    "Next state must be defined.");
        console.assert(typeof this.nextState == "boolean",              "Next state must be a boolean.");
    }

    tick() {
        this.repOk();

        this.state = this.nextState;
        
        this.repOk();
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