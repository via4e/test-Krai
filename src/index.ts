import './scss/style.scss'
import { playground, sprite } from './types'

const stateApp: playground = {
    x: undefined,
    y: undefined,
    bottomY: undefined,
    rightX: undefined,
}

const stateSprite: sprite = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    bottomY: undefined,
    rightX: undefined,
    mouseOn: false,
    controlled: false
}

// debug info to console
const printState = (msg: string) => {
    const isMouse = msg.slice(0, 5) === 'mouse'
    if (isMouse) {
        console.log('\x1b[36m%s\x1b[0m', msg)
    }
    console.log('\x1b[36m%s\x1b[0m', isMouse ? '' : msg, '  App ::> x:', Math.trunc(stateApp.x), ' y:', Math.trunc(stateApp.y), ' bottomY:', Math.trunc(stateApp.bottomY), ' rightX', Math.trunc(stateApp.rightX))
    console.log('Sprite ::> x:', Math.trunc(stateSprite.x), ' y:', Math.trunc(stateSprite.y), ' bottomY:', Math.trunc(stateSprite.bottomY), ' rightX', Math.trunc(stateSprite.rightX), 'mouseOn / control: ', stateSprite.mouseOn, ' / ', stateSprite.controlled)

}

const reCalculate = () => {
    // #app - init coordinates playground block
    const appCoords = App.getBoundingClientRect()
    stateApp.x = appCoords.x
    stateApp.y = appCoords.y
    stateApp.rightX = appCoords.right
    stateApp.bottomY = appCoords.bottom

    // #sprite - init coordinates playground block
    const spriteCoords = Sprite.getBoundingClientRect()
    stateSprite.x = spriteCoords.x
    stateSprite.y = spriteCoords.y
    stateSprite.width = spriteCoords.width
    stateSprite.height = spriteCoords.height
    stateSprite.rightX = spriteCoords.right
    stateSprite.bottomY = spriteCoords.bottom

    // #sprite - init coordinates controlled element
    printState('reCalculate')
}

// sprite - border crossing check
const boundaryCheck = (x: number, y: number): boolean => {
    if (x <= stateApp.x || x >= stateApp.rightX - stateSprite.width) return false
    if (y <= stateApp.y || y >= stateApp.bottomY - stateSprite.width) return false
    return true
}

//Create playground
const App = document.getElementById('app')
window.addEventListener("resize", reCalculate, false)

// Create controlled sprite
const Sprite = document.createElement('div')
Sprite.setAttribute('id', 'sprite')
Sprite.style.left = '100px'
Sprite.style.top = '100px'
App.append(Sprite)

//fix actual coordinates
reCalculate()

//Set listners on mouse actions
Sprite.addEventListener('mouseenter', () => {
    stateSprite.mouseOn = true
}, false);

Sprite.addEventListener('mouseleave', () => {
    stateSprite.mouseOn = false
}, false);

Sprite.addEventListener('mousedown', (event) => {
    if (stateSprite.mouseOn) {
        stateSprite.controlled = true
    }
    printState('mousedown x,y:' + event.x + ', ' + event.y + ',  offset x,y:' + event.offsetX + ', ' + event.offsetY)
}, false)

App.addEventListener('mouseup', (event) => {
    stateSprite.controlled = false
    printState('mouseup x,y:' + event.x + ', ' + event.y + ',  offset x,y:' + event.offsetX + ', ' + event.offsetY)
}, false)

onmousemove = (event) => {
    if (stateSprite.controlled) {
        printState('mouse move x,y:' + event.x + ', ' + event.y + ',  offset x,y:' + event.offsetX + ', ' + event.offsetY)

        const { x, y, offsetX, offsetY } = event  // mouse coords

        if (stateSprite.controlled) {

            const newX = stateSprite.mouseOn ? x - offsetX : x 
            const newY = stateSprite.mouseOn ? y - offsetY : y 

            if (boundaryCheck(newX, newY)) {
                Sprite.style.left = newX - stateApp.x + 'px'
                Sprite.style.top = newY - stateApp.y + 'px'
            }
        }
    }
}

