import * as PIXI from 'pixi.js'
import PixelSolver from 'pixi-ppi'


export default async (sprite, x, y) => {
    let container = document.getElementById('debug-container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'debug-container'
        document.body.appendChild(container)
    }
    const width = container.clientWidth
    const height = container.clientHeight
    const img = await PixelSolver.renderer.extract.image({
        target: sprite,
        frame: new PIXI.Rectangle(x - sprite.width * .5, y - sprite.height * .5, width, height),
        antialias: true
    })
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
    container.appendChild(img)
}
