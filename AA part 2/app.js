let baseURL = "https://deckofcardsapi.com/api/deck"

// 1. draw a card, print value and suit
async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value} of ${suit}`);
}
part1()

// 2.  draw a card, once you have the card, draw another from the same deck
async function part2() {
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`)
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);


    [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value} of ${suit}`)
    });
}
part2()

// 3. New deck when page loads, button that lets you draw from the pile
async function setUp() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`)
    $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
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
};
setUp();
