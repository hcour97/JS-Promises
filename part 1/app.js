let url = "http://numbersapi.com";
let favNumber = 2;

// 1. Favorite number fact
$.getJSON(`${url}/${favNumber}?json`)
    .then(data => {console.log(data);
});

// 2. Facts on multiple numbers in a single request
let favNumbers = [2,3,18];
$.getJSON(`${url}/${favNumbers}?json`)
    .then(data => {console.log(data);
});

// 3. Four Facts on favorite number and add to HTML
Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${url}/${favNumber}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("body").append(`<ul>${data.text}</ul>`));
  });
  