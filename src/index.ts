import './scss/style.scss'

const playgroundState = {
    mouseOnNice: false,
    controlled: false
}

const controlledElement = document.createElement('div')
controlledElement.setAttribute('id', 'nice')
document.getElementById('app').append(controlledElement)

controlledElement.addEventListener('mouseenter', () => {
    playgroundState.mouseOnNice = true
    console.log('mouseOnNice: ', playgroundState.mouseOnNice)
});

controlledElement.addEventListener('mouseleave', () => {
    playgroundState.mouseOnNice = false
    console.log('mouseOnNice: ', playgroundState.mouseOnNice)
});

controlledElement.addEventListener('mousedown', () => {
    if (playgroundState.mouseOnNice) {
        playgroundState.controlled = true
    }
    console.log('Controlled: ', playgroundState.controlled)
});

controlledElement.addEventListener('mouseup', () => {
    if (playgroundState.mouseOnNice) {
        playgroundState.controlled = false
    }
    console.log('Controlled: ', playgroundState.controlled)
});

onmousemove = (event) => { 
    if (playgroundState.controlled) {
        console.log(controlledElement.style, controlledElement.style.left)
        //controlledElement.offsetTop += event.offsetY
        //controlledElement.offsetLeft += event.offsetX
    } else {
        console.log ('mouse move')
        return 0
    }
};