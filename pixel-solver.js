import * as PIXI from 'pixi.js'


const SIZE = 300

/**
@Usage:
PixelSolver.init()
const pixel = PixelSolver.solve(sprite, xline, yline)
*/
class PixelSolver {

    static renderer = null
    static threshold = 50

    constructor() {
        if (!PixelSolver.renderer) {
            PixelSolver.init()
        }
    }

    static async init() {
        PixelSolver.renderer = await PIXI.autoDetectRenderer({
            width: SIZE,
            height: SIZE,
            backgroundAlpha: 0,
            antialias: true,
            preserveDrawingBuffer: true
        })
    }

    static solve(sprite, x, y) {
        const { pixels } = PixelSolver.renderer.extract.pixels(sprite)
        const idx = (y * sprite.width + x) * 4
        if (idx >= pixels.length) {
            console.warn(`PixelSolver: pixel index ${idx} is out of range ${pixels.length}!`)
        }
        else {
            return pixels[idx]
        }
    }

}

export default PixelSolver
