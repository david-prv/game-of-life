class Grid extends Array {
    neighbors(row, col) {
        const deltas = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],  [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
    
        let neighbors = [];
        for (let [dx, dy] of deltas) {
            let nextRow = row + dy;
            let nextCol = col + dx;
    
            if (nextRow >= 0 && nextRow < this.length && nextCol >= 0 && nextCol < this[0].length) {
                neighbors.push(this[nextRow][nextCol]);
            }
        }
    
        return neighbors;
    };

    _nextState() {
        for (let y = 0; y < this.length; y++) {
            for (let x = 0; x < this[0].length; x++) {
                this[y][x].tick();
            }
        }
    }

    update() {
        for (let y = 0; y < this.length; y++) {
            for (let x = 0; x < this[0].length; x++) {
                this[y][x].update();
            }
        }

        this._nextState();
    }

    draw() {
        for (let y = 0; y < this.length; y++) {
            for (let x = 0; x < this[0].length; x++) {
                this[y][x].draw();
            }
        }
    }
}