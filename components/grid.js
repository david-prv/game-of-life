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

    update() {
        this.forEach(row => row.forEach(cell => cell.update()));
        this.forEach(row => row.forEach(cell => cell.tick()));
    }

    draw() {
        this.forEach(row => row.forEach(cell => cell.draw()));
    }
}