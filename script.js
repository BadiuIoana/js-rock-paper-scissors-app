const rulesBtn = document.getElementById("btn-rules");
const rulesModal = document.querySelector(".grey-overlay");
const elements = {
  scissors: 1,
  paper: 2,
  rock: 3,
};
const gamePlayground = document.querySelector(".choose-element-container");

let scoreNr = localStorage.getItem('score') !== undefined ?  localStorage.getItem('score') : 0;
const scoreDOM = document.getElementById('score-number')
scoreDOM.innerHTML = scoreNr;
console.log(localStorage.getItem('score') !== undefined);

function winner(player1, player2) {
  if (player1 == player2) {
    return `
    <div class="message">
      <p class="result-text">Tie!</p>
      <button class="btn-play-again">Play Again</button>
    </div>`;
  } else  if (
    (player1 == 1 && player2 == 2) ||
    (player1 == 2 && player2 == 3) ||
    (player1 == 3 && player2 == 1)
  ) {
    scoreNr++;
    return ` <div class="message"><p class="result-text">You won!</p> <button class="btn-play-again">Play Again</button>
    </div>`;
  } else {
    scoreNr--;
    return  `<div class="message"><p class="result-text">You lose!</p>  <button class="btn-play-again">Play Again</button> </div>`;
  }

}

function fakeTimeout(selectedClass, time) {
  setTimeout(() => {
    document.querySelector(selectedClass).classList.add("show");
  }, time);
}

rulesBtn.addEventListener("click", () => {
  rulesModal.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("grey-overlay") ||
    e.target.classList.contains("close")
  ) {
    rulesModal.classList.toggle("show");
  }
});

window.addEventListener("click", (e) => {
  let choosenElement = 0;

  if (e.target.classList.contains("element")) {
    choosenElement = e.target.getAttribute("id");
  }

  if (e.target.parentNode.classList.contains("element")) {
    choosenElement = e.target.parentNode.getAttribute("id");
  }

  if (choosenElement !== null && choosenElement !== 0) {
    let randomElement = Math.floor(Math.random() * 3) + 1;
    choosedElementName = Object.keys(elements).find(
      (key) => elements[key] === randomElement
    );

    gamePlayground.classList.add("battle");
    gamePlayground.innerHTML = `
      <div class="your-choice">
        <div class="${choosenElement} element">
          <p class="battle-text">You picked </p>   
          <img src="/images/icon-${choosenElement}.svg" alt="">
        </div>
      </div>
      ${winner(elements[choosenElement], randomElement)}
      
      <div class="opponent">
        <p class="battle-text">The house picked</p>
        <div class="${choosedElementName} element">
          <img src="/images/icon-${choosedElementName}.svg" alt="" class= srcset="">
        </div>
      </div>

      `;

      fakeTimeout(".opponent .battle-text", 500);
      fakeTimeout(".opponent .element", 1000);
      fakeTimeout(".message", 1500);

     
      setTimeout(() => {
        localStorage.setItem('score', scoreNr);
        scoreDOM.innerHTML = localStorage.getItem('score')
      }, 2000);

      const playAgain = document.querySelector(".btn-play-again");
      playAgain.addEventListener("click", () => {
        gamePlayground.innerHTML = `
          <div class="paper element" id="paper">
            <img src="./images/icon-paper.svg" alt="">
          </div>
          <div class="scissors element" id="scissors">
            <img src="/images/icon-scissors.svg" alt="" srcset="">
          </div>
          <div class="rock element" id="rock">
            <img src="/images/icon-rock.svg" alt="" srcset="">
          </div>
          <img src="images/bg-triangle.svg" class="artisanal-triangle" alt="">
        `;
      });
  }
});