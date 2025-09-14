import { Application, Assets, Container, Sprite } from 'pixi.js'
import PixelSolver from 'pixi-ppi'
import dbg from './debugger'


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

(async () => {
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

    // Tested sprites
    const deathstarTexture = await Assets.load('assets/deathstar.png')
    let deathstar = new Sprite(deathstarTexture)
    deathstar.label = 'deathstar'
    deathstar.zIndex = 1
    deathstar.anchor.set(.5)
    deathstar.x = app.screen.width * .5 + 200
    deathstar.y = app.screen.height * .5 + 50
    container.addChild(deathstar)

    const starshipTexture = await Assets.load('assets/starship.png')
    let ship = new Sprite(starshipTexture)
    ship.label = 'ship'
    ship.zIndex = 2
    ship.anchor.set(.5)
    ship.x = app.screen.width * .5 - 100
    ship.y = app.screen.height * .5 + 100
    container.addChild(ship)
})()
