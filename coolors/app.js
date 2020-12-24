//Global selections and variables
const colorDivs = document.querySelectorAll('.color');

const gerateBtn = document.querySelector('.generate');

const adjustBtns = document.querySelectorAll('.adjust');
const lockBtns = document.querySelectorAll('button.lock');
const closeAdjustmets = document.querySelectorAll('.close-adjustment');
const sliderContainers = document.querySelectorAll('.sliders');

const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;
let savedPalettes;

//Eventlistener
sliders.forEach(slider => {
    slider.addEventListener('input', hslControls);
})

colorDivs.forEach((div, index) => {
    div.addEventListener('change', ()=>{
        updateTextUI(index);
    });
})

currentHexes.forEach(hex => {
    hex.addEventListener('click', () => {
        copyToClipboard(hex);
    });
});

for(let i = 0; i<adjustBtns.length; i++){
    adjustBtns[i].addEventListener('click', ()=>{
        sliderContainers[i].classList.toggle('active');
    })
}

for(let i = 0; i<closeAdjustmets.length; i++){
    closeAdjustmets[i].addEventListener('click', ()=>{
        sliderContainers[i].classList.remove('active');
    })
}

gerateBtn.addEventListener('click', randomColors);

lockBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if(colorDivs[index].classList.contains('locked')){
            btn.innerHTML = '<i class = "fas fa-lock-open"></i>'
            colorDivs[index].classList.remove('locked');
        }else{
            btn.innerHTML = '<i class = "fas fa-lock"></i>'
            colorDivs[index].classList.add('locked');
        }
    })
})




//Function
function hslControls(e){
    const index = e.target.getAttribute('data-sat')|| e.target.getAttribute('data-hue') || e.target.getAttribute('data-bright');
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const currentColor = initialColors[index];

    let color = chroma(currentColor).set('hsl.s', saturation.value).set('hsl.l', brightness.value).set('hsl.h', hue.value);
    colorDivs[index].style.background = `${color}`;
    colorizeSliders(color, hue, brightness, saturation);
}

function generateHex(){
    const random = chroma.random();
    return random;
}

function randomColors(){
    initialColors = [];
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();
        if(div.classList.contains('locked')){
            initialColors.push(hexText.innerText);
            return;
        }else{
            initialColors.push(randomColor);
        }
        const icons = div.querySelectorAll('.controls button');

        checkTextContrast(randomColor, hexText);
        icons.forEach(icon => {
            checkTextContrast(randomColor, icon);
        })
        div.style.background=`${randomColor}`;
        hexText.innerText = `${randomColor}`;
        
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        
        const hue= sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];
        colorizeSliders(color, hue, brightness, saturation);
    });

    //Initialize color slider
    sliders.forEach(slider => {
        if(slider.name === 'hue'){
            slider.value = Math.floor(chroma(initialColors[slider.getAttribute('data-hue')]).hsl()[0]);
        }else if(slider.name === 'brightness'){
            slider.value = Math.floor(chroma(initialColors[slider.getAttribute('data-bright')]).hsl()[2]*100)/100;
        }else{
            slider.value = Math.floor(chroma(initialColors[slider.getAttribute('data-sat')]).hsl()[1]*100)/100;
        }
    })

}

function checkTextContrast(color, text){
    const luminance = chroma(color).luminance();
    if(luminance > 0.5){
        text.style.color = 'black';
    }else{
        text.style.color = 'white';
    }
}

function colorizeSliders(color, hue, brightness, saturation){
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);

    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(['black', midBright, 'white']);
    //Update input scale
    saturation.style.background = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
    brightness.style.background = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)},${scaleBright(1)})`;
    hue.style.background = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75 ), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
}

function updateTextUI(index){
    const activeDiv=  colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const hexText = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');

    hexText.innerText = color.hex();
    checkTextContrast(color, hexText);
    icons.forEach(icon =>{
        checkTextContrast(color, icon);
    })
}

function copyToClipboard(hex){
    const el = document.createElement('input');
    el.setAttribute('type', 'text');
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const popupContainer = document.querySelector('.copy-container');
    const popup =popupContainer.querySelector('.copy-popup');

    popupContainer.classList.add('active');
    popup.classList.add('active');

    popupContainer.addEventListener('transitionend', () => {
        popupContainer.classList.remove('active');
        popup.classList.remove('active');
    });
}

// Implement save stuff
const saveBtn = document.querySelector('.save');
const submitSave = document.querySelector('.submit-save');
const closeSaveBtn = document.querySelector('.close-save');
const saveContainer = document.querySelector('.save-container');
const saveInput = document.querySelector('.save-name');
const libraryContainer = document.querySelector('.library-container');
const libraryBtn = document.querySelector('.library');
const closeLibraryBtn = document.querySelector('.close-library');

saveBtn.addEventListener('click', openPalette);
closeSaveBtn.addEventListener('click', closePalette);
submitSave.addEventListener('click', function(){
    savePalette();
    closePalette();
});

function openPalette(e){
    const popup =  saveContainer.children[0];
    saveContainer.classList.add('active');
    popup.classList.add('active');
}

function closePalette(){
    const popup =  saveContainer.children[0];
    saveContainer.classList.remove('active');
    popup.classList.remove('active');
}

function savePalette(){
    const name = saveInput.value;
    saveInput.value = "";
    const colors= [];
    currentHexes.forEach(hex => {
        colors.push(hex.innerText);
    })
    savedPalettes = JSON.parse(localStorage.getItem('palettes'));
    if(savedPalettes === null){
        savedPalettes = [];
    }
    const nr = savedPalettes.length;
    const newPalette = {name, colors, nr};
    savedPalettes.push(newPalette);
    localStorage.setItem('palettes', JSON.stringify(savedPalettes));

    const palette = document.createElement('div');
    palette.classList.add('custom-palette');
    const title = document.createElement('h4');
    title.innerText = name;
    const preview = document.createElement('div');
    preview.classList.add('small-preview');
    preview.style.display = "flex";
    preview.style.flex = '1';

    colors.forEach(smallColor => {
        const smallDiv = document.createElement('div');
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);
    })

    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(nr);
    paleteeBtn.innerText = 'Select';
}

randomColors();
