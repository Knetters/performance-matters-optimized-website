// Tijd aftellen
var countDownDate = new Date().getTime() + 40*60*1000
var x = setInterval(function() {

  var now = new Date().getTime()
  var distance = countDownDate - now

  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)

  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  document.getElementById("timer").innerHTML = minutes + ":" + seconds

  if (distance <= 0) {
    clearInterval(x)
    document.getElementById("timer").innerHTML = "0:00"
  }

}, 1000)

// Quote panel toggelen
const quoteBlock = document.getElementById("quote-block")
const quoteButton = document.getElementById("quote-button")

document.getElementById("min-button").addEventListener("click", toggleBlock);

function toggleBlock() {
  quoteBlock.classList.toggle("d-none")
}

document.getElementById("quote-button").addEventListener("click", toggleBlock);

function toggleBlock() {
  quoteBlock.classList.toggle("d-none")
}