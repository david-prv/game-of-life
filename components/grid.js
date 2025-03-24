class Grid extends Array {
    neighbors(row, col) {
        const deltas = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],  [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
    
        const neighbors = [];
        for (const [dx, dy] of deltas) {
            const nextRow = row + dy;
            const nextCol = col + dx;
    
            if (nextRow >= 0 && nextRow < this.length && nextCol >= 0 && nextCol < this[0].length) {
                neighbors.push(this[nextRow][nextCol]);
            }
        }
    
        return neighbors;
    };
}