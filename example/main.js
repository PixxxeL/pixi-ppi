import { Application, Assets, Container, Sprite } from 'pixi.js'
import PixelSolver from 'pixi-ppi'
import dbg from './debugger'


const onContainerDown = (e) => {
    const objects = e.target
    const { x, y } = e.getLocalPosition(objects)
    let finded = objects.children.filter((s) => {
        // This is because anchor point is on cebter
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
            dbg(s, xline, yline)
            return pixel > PixelSolver.threshold
        }
    })
}

const App = async () => {
    // Important step!
    PixelSolver.init()

    // Creating application
    const app = new Application()
    await app.init({
        background: 0x1f1f1f,
        resizeTo: window,
        resolution: window.devicePixelRatio || 1
    })
    document.body.appendChild(app.canvas)

    // Background
    const spaceTexture = await Assets.load('assets/space.jpg')
    const space = new Sprite(spaceTexture)
    space.anchor.set(.5)
    space.x = app.screen.width * .5
    space.y = app.screen.height * .5
    app.stage.addChild(space)

    // Interactive container. Also important
    // Not use event on sprite, only on comprising container
    const container = new Container()
    container.eventMode = 'static'
    container.on('pointerdown', onContainerDown)
    app.stage.addChild(container)

    // Tested sprite
    const starshipTexture = await Assets.load('assets/starship.png')
    let ship = new Sprite(starshipTexture)
    ship.label = 'ship'
    ship.anchor.set(.5)
    ship.x = app.screen.width * .5
    ship.y = app.screen.height * .5
    container.addChild(ship)
}

App()
