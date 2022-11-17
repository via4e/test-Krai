import './scss/style.scss'
import { state } from './types'


const appCoords = () => {
    const { x, y } = App.getBoundingClientRect()
    appState.offsetX = appState.mouseX - appState.cubeX
    appState.offsetY = appState.mouseY - appState.cubeY
    console.warn('App x,y:', x, y)
}

const resizer = () => {
    appCoords()
}

const appState: state = {
    mouseOnNice: false,
    controlled: false,
    cubeX: undefined,
    cubeY: undefined,
    mouseX: undefined,
    mouseY: undefined,
    offsetX: undefined,
    offsetY: undefined
}

// Create controlled Element
const cube = document.createElement('div')
cube.setAttribute('id', 'nice')
cube.style.left = '100px'
cube.style.top = '100px'

// Get playground, add listner and controlled element into them
const App = document.getElementById('app')
window.addEventListener("resize", resizer, false)
App.append(cube)
appCoords()

cube.addEventListener('mouseenter', () => {
    appState.mouseOnNice = true
    console.log('mouseOnNice: ', appState.mouseOnNice)
}, false);

cube.addEventListener('mouseleave', () => {
    appState.mouseOnNice = false
    console.log('mouseOnNice: ', appState.mouseOnNice)
}, false);

cube.addEventListener('mousedown', () => {
    if (appState.mouseOnNice) {
        appState.controlled = true
    }
    console.log('Controlled: ', appState.controlled)
}, false)

App.addEventListener('mouseup', () => {
    appState.controlled = false
    console.log('Controlled: ', appState.controlled)
}, false)

onmousemove = (event) => {
    console.log('mouse x:', event.x,
        'mouse y:', event.y,
        'cube x:', Number(cube.style.top.slice(0, -2)),
        'cube y:', Number(cube.style.left.slice(0, -2)),
        'offsetX: ', appState.offsetX,
        'offsetY: ', appState.offsetY,
    )

    appState.mouseX = event.x
    appState.mouseY = event.y

    if (appState.controlled) {
        //const { x, y } = cube.getBoundingClientRect()
        cube.style.left = event.x - appState.offsetX + 'px'
        cube.style.top = event.y - appState.offsetY + 'px'
    } else {
        console.log('mouse move')
        return 0
    }
}

