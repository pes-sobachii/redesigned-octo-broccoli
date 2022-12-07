const tilesCards = document.querySelectorAll('.card')
const startButton = document.querySelector('.start-button')
const startPage = document.querySelector('.start-page')
const finishPage = document.querySelector('.finish-page')
const finishResult = document.querySelector('.finish-result')
const remainingTime = document.querySelector('.remaining-time')

const photoPaths = ['levicka_v_chervonomu.jpg', 'photo_2022-12-07_13-04-37.jpg', 'Без названия (1).jpg', 'photo_2022-08-09_12-54-10.jpg', 'photo_2022-08-09_18-36-30.jpg', 'phot1.jpg', 'levicka_v_chervonomu.jpg', 'photo_2022-12-07_13-04-37.jpg', 'Без названия (1).jpg', 'photo_2022-08-09_12-54-10.jpg', 'photo_2022-08-09_18-36-30.jpg', 'phot1.jpg']
let chosenTileImg = null
let matchesCounter = 0
let time = 0



const tileClosing = (tile) => {
    tile.classList.remove('active')
    chosenTileImg.parentElement.parentElement.classList.remove('active')
    chosenTileImg = null
    document.querySelector('body').style.pointerEvents = 'all'
}

const tileClickHandler = (e) => {
    const tileImg = e.target.querySelector('img')
    console.log(e.target)
    if (!chosenTileImg){
        chosenTileImg = tileImg
        e.target.classList.add('active')
    } else if (chosenTileImg.attributes.src.nodeValue === tileImg.attributes.src.nodeValue){
        e.target.classList.add('active')
        e.target.style.opacity = '0'
        chosenTileImg.parentElement.parentElement.style.opacity = '0'
        e.target.style.pointerEvents = 'none'
        chosenTileImg.parentElement.parentElement.style.pointerEvents = 'none'
        chosenTileImg = null
        matchesCounter += 1
        if (matchesCounter === 6){
            setTimeout(() => {
                finishPage.style.zIndex = '2'
                finishResult.textContent = `You Won! Your Time: ${time}`
            }, 1000)
        }
    } else {
        document.querySelector('body').style.pointerEvents = 'none'
        e.target.classList.add('active')
        setTimeout(() => {tileClosing(e.target)}, 1000)
    }
}

const startButtonHandler = (e) => {
    startPage.style.display = 'none'
    tilesCards.forEach(elem => {
        const randomPhotoIndex = Math.floor((Math.random() * photoPaths.length))
        const randomPhoto = photoPaths.splice(randomPhotoIndex, 1)
        const tileBackImage = elem.querySelector('.tile img')
        tileBackImage.setAttribute('src', randomPhoto[0])
        elem.addEventListener('click', tileClickHandler)
        elem.classList.add('active')
    })
    const remainingTimeCounter = setInterval(() => {
        time += 1
        remainingTime.textContent = `Your Time: ${time}`
    }, 1000)
    setTimeout(() => {
        console.log('here')
        tilesCards.forEach(elem => {
            elem.classList.remove('active')
        })
    } ,2000)
}


startButton.addEventListener('click', startButtonHandler)
