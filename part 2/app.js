let url = "https://deckofcardsapi.com/api/deck";

////////////////////
// 1. draw a card, print the value and the suit i.e. "5 of spades" or "Queen of Diamonds"
$.getJSON(`${url}/new/draw/`).then(data => { 
    let { suit, value } = data.cards[0];
        console.log(`${value} of ${suit}`);
    });

///////////////////
// 2. draw a card, once you have the card, draw another card. Then return the value and suit of each card
let firstCard = null;
$.getJSON(`${url}/new/draw/`).then(data => { 
    // store the first card
    firstCard = data.cards[0];
    // save the deck_id to draw from the same deck
    let deckId = data.deck_id;
    // new call with the deck_id
    return $.getJSON(`${url}/${deckId}/draw/`);
})
// draw another card and save it as the second card
.then(data => {
    secondCard = data.cards[0];

// print the info of the first and second card
    [firstCard, secondCard].forEach(function(card) {
        console.log(`${card.value} of ${card.suit}`)
    });
});


///////////////
// 3. HTML PAGE - new deck when page loads, button that lets you draw from the same deck
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

// new deck when page loads
$.getJSON(`${url}/new/shuffle`).then(data => { 
    deckId = data.deck_id;
    $btn.show()
});

// draw a card when the button is clicked
$btn.on('click', function(){
    $.getJSON(`${url}/${deckId}/draw/`).then(data => {
        let cardSrc = data.cards[0].image; 
        let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
    );
if (data.remaining === 0) $btn.remove();
});
});

