# pixi-ppi

Pixel perfect sprite interactive for [Pixi.js framework](https://pixijs.com).

For usage example see in `example` subdirectory. Example running is:

```shell
cd example
npm i # first time only
npx vite
```

See example online on https://pixi-ppi.pixel-tyumen.ru

## Installation

```shell
npm i -D pixi-ppi
```

## Usage

Somewhere in initialize of Pixi application method:

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
    let finded = objects.children.filter((s) => {
        // This evaluations because anchor point is on cebter
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
            s.store = {
                pointer: { xline, yline, pixel }
            }
            return pixel > PixelSolver.threshold
        }
    })
    finded = finded.sort((a, b) => a.zIndex < b.zIndex)[0]
    if (finded) {
        // Optional debug, but make payload here
        const { xline, yline } = finded.store.pointer
        dbg(finded, xline, yline)
    }
}
```

You may change `PixelSolver.threshold` member value from 0 to 255 for sensitivity of opaque.
