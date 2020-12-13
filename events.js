//CLICK, SCROLL, PAGE RESIZING 
//ATTACH A EVENT LISTENER

const h1 = document.querySelector("h1");

h1.addEventListener('keydown', function(event){
    if(event.keyCode === 81){
        h1.classList.add("big-size");
    }
})
