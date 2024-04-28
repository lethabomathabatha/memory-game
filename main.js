const tilesContainer = document.querySelector('.tiles');
const colours = [
    "purple",
    "aquamarine",
    "crimson",
    "blue",
    "dodgerblue",
    "gold",
    "greenyellow",
    "teal"
];

const coloursPickList = [...colours, ...colours];
const tileCount = coloursPickList.length;

// Game state:
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

/* This code snippet defines a function buildTile that creates a new div element, 
    adds a CSS class of 'tile' to it, sets a custom attribute 'data-colour' with 
    the specified color, and then returns this element.
*/
function buildTile(colour) {
    const element = document.createElement('div');
    element.classList.add('tile');
    element.setAttribute('data-colour', colour);
    element.setAttribute('data-revealed', 'false');

    element.addEventListener('click', () => {
        const revealed = element.getAttribute('data-revealed');

        if (awaitingEndOfMove || revealed === 'true' || element === activeTile) {
            return
        }

        element.style.backgroundColor = colour;

        if (!activeTile) {
            activeTile = element;

            return;
        }

        // check for a match
        const colourToMatch = activeTile.getAttribute('data-colour');
        if (colourToMatch === colour) {
            activeTile.setAttribute('data-revealed', 'true');
            element.setAttribute('data-revealed', 'true');

            awaitingEndOfMove = false;
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                // wait for last tile to be revealed before alerting
                setTimeout(() => {
                  alert('YOU WIN! Refresh to play again.');  
                } , 900);
                
            }

            return;
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    })

    return element;
}

// build up tiles
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * coloursPickList.length);
    const colour = coloursPickList[randomIndex];
    const tile = buildTile(colour);

    coloursPickList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);

    // console.log("The random colour is " + colour);
}    
