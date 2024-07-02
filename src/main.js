import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import $ from 'jquery';

import picture1 from '../assets/images/picture1.png';
import picture2 from '../assets/images/picture2.png'; 
import picture3 from '../assets/images/picture3.png';
import picture4 from '../assets/images/picture4.png';
import picture5 from '../assets/images/picture5.png';
import picture6 from '../assets/images/picture6.png';
import picture7 from '../assets/images/picture7.png';
import picture8 from '../assets/images/picture8.png';

let flippedCards = [];
let matchedPairs = 0;
const symbols = [picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8, picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8];

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
        flippedCards.push(this);
        this.style.backgroundColor = '#2ecc71';

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const gameContainer = document.getElementById('game-container');
    const button = document.getElementById("button");






    function showWinnersBackdrop() {
        const winnersBackdrop = document.getElementById('backdrop-cont');
        winnersBackdrop.style.display = 'block';
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const index1 = parseInt(card1.getAttribute('data-index'));
        const index2 = parseInt(card2.getAttribute('data-index'));

        if (symbols[index1] === symbols[index2]) {
            // Matched  
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedPairs++;

            if (matchedPairs === symbols.length / 2) {
                gameContainer.innerHTML = '';
                showWinnersBackdrop()
            }
        } else {
            // Not matched
            setTimeout(() => {
                // Close back the cards after a brief moment
                card1.style.backgroundColor = '#3498db';
                card2.style.backgroundColor = '#3498db';
                card1.querySelector('img').style.display = 'none';
                card2.querySelector('img').style.display = 'none';

                // Add back the click event listeners after closing
                card1.addEventListener('click', flipCard);
                card2.addEventListener('click', flipCard);
            }, 100); // Adjust the timeout duration as needed
        }

        flippedCards = [];
    }

    function gameInit() {
        // Shuffle the symbols
        symbols.sort(() => Math.random() - 0.5);

        // Create the cards and append them to the game container
        symbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-index', index);

            // Initially set the background color to blue
            card.style.backgroundColor = '#3498db';

            // Create an image element to display the card image
            const image = document.createElement('img');
            image.src = symbol;
            image.style.width = '100%'; // Set the image width to 100% of the card
            image.style.height = '100%'; // Set the image height to 100% of the card
            image.style.objectFit = 'cover'; // Ensure the image covers the entire card
            image.style.display = 'none'; // Initially hide the image
            card.appendChild(image);


            // Set the image to be visible when the card is clicked
            card.addEventListener('click', function () {
                if (!flippedCards.includes(this)) {
                    flippedCards.push(this);

                    // Hide the initial background color
                    this.style.backgroundColor = 'transparent';

                    // Show the image
                    image.style.display = 'block';

                    if (flippedCards.length === 2) {
                        setTimeout(checkMatch, 500);
                    }
                }
            });

            gameContainer.appendChild(card);
        });
    }

    // Function to check if the flipped cards match
    gameInit();

    button.addEventListener("click", function () {
        const winnersBackdrop = document.getElementById('backdrop-cont');
        winnersBackdrop.style.display = 'none';
        gameInit();
    });
});