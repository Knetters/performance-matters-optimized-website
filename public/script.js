// Tijd aftellen
const timerContainer = document.getElementById("time-box-container")

if(timerContainer) {
    var countDownDate = new Date().getTime() + 40*60*1000
    var x = setInterval(function() {

        var now = new Date().getTime()
        var distance = countDownDate - now

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        // Zet de minuten en seconden in de html
        document.getElementById("timer").innerHTML = minutes + ":" + seconds

        if (distance <= 0) {
            clearInterval(x)
            document.getElementById("timer").innerHTML = "0:00"
        }

    }, 1000)
}

// Quote panel toggelen
const quoteBlock = document.getElementById("quote-block")
const plusButton = document.getElementById("plus-button")

// Min knop function
if(quoteBlock) {
    document.getElementById("min-button").addEventListener("click", toggleBlockOff);

    function toggleBlockOff() {
        quoteBlock.classList.toggle("d-none")
        plusButton.classList.toggle("d-block")
    }

    document.getElementById("plus-button").addEventListener("click", toggleBlockOn);

    // Plus knop function
    function toggleBlockOn() {
        quoteBlock.classList.toggle("d-none")
    }
}

// menu in en uitklappen
const menuToggle = document.querySelector('.menu-toggle-button')
const sidebarToggle = document.querySelector('aside')
const mainToggle = document.querySelector('main')
const removeButtonText = document.querySelectorAll('.menu-button-text')
const biggerIcons1 = document.querySelector('.menu-icon1')
const biggerIcons2 = document.querySelector('.menu-icon2')
const biggerIcons3 = document.querySelector('.menu-icon3')
const ultiLogo = document.querySelector('.logo')




menuToggle.addEventListener ('click', toggleMenu)

function toggleMenu() {
    sidebarToggle.classList.toggle ('toggle-sidebar')
    mainToggle.classList.toggle ('toggle-sidebar-main')
    removeButtonText.forEach((removeButtonText) => {
        removeButtonText.classList.toggle ('remove-button-text')
    });
    biggerIcons1.classList.toggle ('bigger-icons')
    biggerIcons2.classList.toggle ('bigger-icons')
    biggerIcons3.classList.toggle ('bigger-icons')
    ultiLogo.classList.toggle ('remove-logo')
    menuToggle.classList.toggle ('rotate-button')
}

// Add player
const addPlayerButton = document.getElementById("add-player-button")
const closePlayerButton = document.getElementById("close-player-button")
const teamPlayers = document.getElementById("teamPlayers")
const playerForm = document.getElementById("playerForm")

addPlayerButton.addEventListener ("click", toggleForm)
closePlayerButton.addEventListener ("click", toggleForm)

function toggleForm() {
    teamPlayers.classList.toggle("d-none")
    playerForm.classList.toggle("active")
}

// Show player data when selected