//on start
loaderContainer = document.querySelector('.loader-container');
function load(){
    loaderContainer.style.display = "flex";
}
function unload(){
    loaderContainer.style.display = "none";
}

function launch(){
  var speechSynthesis = window.speechSynthesis;
  var speechMessage2 = new SpeechSynthesisUtterance("Welcome To railguru");
  // speechSynthesis.speak(speechMessage2);
    var win = document.querySelector(".onStart");
    win.style.display = "flex";
    
    setTimeout(function(){

        win.style.display = "none";
        document.querySelector(".content").style.display = "block";
    },4000)
}
window.onload = launch()
 
//dropdown
var drop = document.querySelector(".dropdown");
var barElement = document.querySelector(".bar")
barElement.addEventListener("click",function(){
    // Get the current icon element
    const iconElement = barElement.querySelector('i');

    // Check the current icon class and toggle it to 'fa-xmark' if it's 'fa-bars'
    if (iconElement.classList.contains('fa-bars')) {
        iconElement.classList.remove('fa-bars');
        iconElement.classList.add('fa-xmark');
        drop.style.top = '3.5rem';
    } else {
        // Toggle it back to 'fa-bars' if it's 'fa-xmark'
        iconElement.classList.remove('fa-xmark');
        iconElement.classList.add('fa-bars');
        drop.style.top = '-9rem';
    }
})

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
  }
document.querySelector(".tablinks").click()
let slideIndex = 0;

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds (2000 milliseconds)
}

showSlides();
