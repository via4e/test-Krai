import './scss/style.scss'
import { state } from './types'

const appCoords = () => {
    const cubeCoord = cube.getBoundingClientRect()
    appState.cubeX = cubeCoord.x
    appState.cubeY = cubeCoord.y
    appState.cubeWidth = cubeCoord.width
    appState.cubeHeight = cubeCoord.height

    const appCoord = App.getBoundingClientRect()
    appState.appX = appCoord.x
    appState.appY = appCoord.y
    appState.appWidth = appCoord.width
    appState.appHeight = appCoord.height

    appState.offsetX = appState.mouseX - appState.cubeX
    appState.offsetY = appState.mouseY - appState.cubeY
    console.warn('appCoords, new appState:', appState)
}

const boundaryCheck = (x: number, y: number) => {
    if (x <= appState.appX - appState.offsetX || x >= appState.appX + appState.appWidth - appState.cubeWidth) return false
    if (y <= appState.appY - appState.offsetY || y >= appState.appY + appState.appHeight - appState.cubeHeight) return false
    return true
}

const appState: state = {
    mouseOnNice: false,
    controlled: false,
    cubeX: undefined,
    cubeY: undefined,
    cubeWidth: undefined,
    cubeHeight: undefined,
    appX: undefined,
    appY: undefined,
    appWidth: undefined,
    appHeight: undefined,
    mouseX: undefined,
    mouseY: undefined,
    offsetX: undefined,
    offsetY: undefined,
    isInit: false
}

// Create controlled Element
const cube = document.createElement('div')
cube.setAttribute('id', 'nice')
cube.style.left = '100px'
cube.style.top = '100px'

// Get playground, add listner and controlled element into them
const App = document.getElementById('app')
window.addEventListener("resize", appCoords, false)
App.append(cube)
appCoords()

cube.addEventListener('mouseenter', () => {
    appState.mouseOnNice = true
}, false);

cube.addEventListener('mouseleave', () => {
    appState.mouseOnNice = false
}, false);

cube.addEventListener('mousedown', () => {
    if (appState.mouseOnNice) {
        appState.controlled = true
    }
}, false)

App.addEventListener('mouseup', () => {
    appState.controlled = false
}, false)

onmousemove = (event) => {
    if (appState.controlled) {
        appState.mouseX = event.x + appState.appX
        appState.mouseY = event.y + appState.appY
        if (!appState.isInit) {
            console.warn('Init')
            appCoords()
            appState.isInit = true
        }

        const newX = event.x - appState.offsetX
        const newY = event.y - appState.offsetY
        console.log(newX, newY, boundaryCheck(newX, newY))
        if (boundaryCheck(newX, newY)) {
            cube.style.left = newX + 'px'
            cube.style.top = newY + 'px'
        }
    } else {
        return 0
    }
}

