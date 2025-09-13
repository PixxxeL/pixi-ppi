# pixi-ppi

Pixel perfect sprite interactive for [Pixi.js framework](https://pixijs.com).

For example usage see in `example` subdirectory. Example running is:

```shell
cd example
npm i
npx vite
```

## Installation

```shell
npm i -D pixi-ppi
```

## Usage

Somewhere in initialize method:

```javascript
PixelSolver.init()
```

And for interactive sprites create container:

```javascript
const container = new Container()
container.eventMode = 'static'
container.on('pointerdown', onContainerDown)
app.stage.addChild(container)
```

Pointer event handler:

```javascript
const onContainerDown = (e) => {
    const objects = e.target
    const { x, y } = e.getLocalPosition(objects)
    objects.children.forEach((s) => {
        // This is because anchor point of sprites is on cebter
        const hw = s.width * .5
        const hh = s.height * .5
        const h = x > (s.x - hw) && x < (s.x - hw) + s.width
        const v = y > (s.y - hh) && y < (s.y - hh) + s.height
        if (h && v) {
            const pos = e.getLocalPosition(s)
            const xline = Math.floor(pos.x + hw)
            const yline = Math.floor(pos.y + hh)
            // Main invoking
            const pixel = PixelSolver.solve(s, xline, yline)
            // Optional. This for debug draw in top-right corner
            //dbg(s, xline, yline)
            return pixel > PixelSolver.threshold
        }
    })
}
```
