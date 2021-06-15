const btnStart = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colorCircle = ['#ff4081','#e74c3c','#3949ab','#18ffff', '#8e44ad', '#ffee58','#3498db', '#e67e22', '#2ecc71']
let time = 0
let score = 0


btnStart.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {

    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRundomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRundomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `
<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRundomCircle() {
    const circle = document.createElement('div')
    const size = getRundomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRundomNumber(0, width - size)
    const y = getRundomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${colorCircle[Math.round(Math.random() * colorCircle.length - 1)]}`
    board.append(circle)
}

function getRundomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
