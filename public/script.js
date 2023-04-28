// Tijd aftellen
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

// Quote panel toggelen
const quoteBlock = document.getElementById("quote-block")
const plusButton = document.getElementById("plus-button")

// Min knop function
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

// Edit player