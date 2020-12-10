function guessGame(){
    let randomNum = Math.ceil(Math.random()*10);
    let guessNum;
    let numberOfTry = 0;
    do{ 
        numberOfTry ++;
        guessNum = prompt('guess random number');
        if(guessNum != randomNum) alert('you are wrong');
    }while(guessNum != randomNum)

    alert(`you won by ${numberOfTry}`);
}

guessGame();