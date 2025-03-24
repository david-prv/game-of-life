# Game of Life

A simple browser-based implementation of the famous conway's game of life

![](https://github.com/user-attachments/assets/6873cd4b-eacd-4a6a-91b8-60ca032491a4)

## Implementation

There are two main components: `Cell` which represents a single square on the canvas and `Grid` which is essentially an improved Array. The additional functionality of the grids allow us to easily observe the surrounding neighbors or a pixel, to calculate the new states for each cell dynamically and finally to shift the states per element to the new one. A cell can either be *alive* or *dead*. These states are calculated based on the surrounding neighbors (compare below).

`app.js` assembles these two components, whereas `createContext` initializes the canvas we want to draw on and `createGrid` creates a random start pattern that is filled into the grid.

The rules per generation are defined as follows (pseudo code):
```py
if cell.is_alive():
    if cell.number_of_live_neighbors() < 2:
        # Cell dies caused by underpopulation
        cell.die() 
        break
    
    if cell.number_of_live_neighbors() <= 3:
        # Cell lives on to the next generation
        cell.stay_alive()
        break

    if cell.number_of_live_neighbors() > 3:
        # Cell dies caused by overpopulation
        cell.die()
        break

if cell.is_dead():
    if cell.number_of_live_neighbors() == 3:
        # New cell is born due to reproduction
        cell.give_birth()
        break
```
<p align="center">
    Sources: <a href="https://rustwasm.github.io/book/game-of-life/rules.html">Rules of Conway's Game of Life</a>, <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia: Conway's Game of Life</a>
</p>

### Configuration

You can configure the Game of Life using the constants in `index.html`.

```js
const HEIGHT = 20;
const WIDTH = 20;
const CELL_HEIGHT = 30;
const CELL_WIDTH = 30;
const UPDATE_INTERVAL = 100;
const RANDOM_SEED = Math.round(Math.random() * (10 ** 10));
const ALIVE_PROBABILITY = .3;
```