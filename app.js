class Animator{
  constructor(selector){
    this.selector = document.querySelector(selector);
  }

  fadeOut(time){
    if(this.selector.classList.contains('active')){
      this.selector.style.opacity = 1;
      this.selector.classList.remove('active');
    }else{
      this.selector.style.transition = `all ${time}s ease-in`;
      this.selector.style.opacity = 0;
      this.selector.classList.add('active');
    }
  }
}

const intro = new Animator('h1');
const button = document.querySelector('button');

button.addEventListener('click', () =>{
  intro.fadeOut(0.5);
});
