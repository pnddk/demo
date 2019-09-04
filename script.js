let front = document.querySelector('.front p');
let back = document.querySelector('.back p');
let card = document.querySelector('.card');

document.querySelector('#btnPrev').addEventListener('click', prevCard);
document.querySelector('#btnFlip').addEventListener('click', flipCard);
document.querySelector('#btnNext').addEventListener('click', nextCard);


/* Note that in js, you only define and call the function, unlike C or java, where you can 
prototype, then define and call*/

let quiz = [];
getData(); //calling the function

let currentCard = -1;

/* the following function joins both the backend with the frontend by integrating firebase data from 
server (backend) to the frontend html, js, and css. you fetch an array to put into getData function, once it's filled,
then we can move to the then statements to see what it does next */

function getData() {        //defining the function
    fetch('https://us-central1-quiz-api-56708.cloudfunctions.net/getData')
    .then( resp => resp.json() ) /* pull out resp.json b/c it provides more info than required. */
    .then( respJson => {        /* respJson == data as seen in Les' tutorial in person. */
        quiz = respJson;
    })
    .catch(err => {            /* catching any errors that may occur, good coding practice */ 
        console.error(err);     /* can also use console.log, console.error shows error at bottom of ... if applicable*/
    });
}

function prevCard() {
    card.classList.remove('flipped');
    setTimeout(() => {
        currentCard = currentCard - 1 < 0 ? currentCard : currentCard - 1;
        if( currentCard < 0) {
            currentCard = 0;
        }
        front.textContent = quiz[currentCard].question;
        back.textContent = quiz[currentCard].answer;
    }, 500);
    
}
/* we do this b/c a part of the previous card shows up when we hit next, we set a timeout so that
when we hit next that it flips back to ex (q2 or q3 and not stay on a2 or a3 when we are currently on a1.) */

function nextCard() {
    card.classList.remove('flipped');
    setTimeout(()=>{
        currentCard = currentCard + 1 >= quiz.length ? currentCard : currentCard + 1;
        if( currentCard < 0) {
            currentCard = 0;
        }
        front.textContent = quiz[currentCard].question;
        back.textContent = quiz[currentCard].answer;        
    }, 500);
    
}

function flipCard() {
    card.classList.toggle('flipped');
}

function nextCard() {
    card.classList.remove('flipped');
    setTimeout(()=>{
        currentCard = currentCard + 1;
        if( currentCard >= quiz.length - 1 ) {
            currentCard =  quiz.length - 1;
        }
        front.textContent = quiz[currentCard].question;
        back.textContent = quiz[currentCard].answer; 
    }, 500);
}