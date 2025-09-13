# pixi-ppi

Pixel perfect sprite interactive for Pixi.js framework.

## Installation

```shell
npm i -D pixi-ppi
```

## Usage

```javascript
// somewhere in initialize method
PixelSolver.init()
// somewhere in pointer event handler
const item = e.target
const pos = e.getLocalPosition(item)
// if anchor point in the center of sprite, for example
xline = Math.floor(pos.x + item.width * .5)
yline = Math.floor(pos.y + item.height * .5)
pixel = PixelSolver.solve(item, xline, yline)
if (pixel < PixelSolver.threshold) {
    // interrupt event handler
    return
}
// continue event handler if the pixel is transparent
```
