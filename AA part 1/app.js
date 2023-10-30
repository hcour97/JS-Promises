let baseURL = "http://numbersapi.com";
let favNumber = 2;

// 1. Favorite number fact
async function part1() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
} 
part1()

// 2. Facts on multiple numbers in a single request
let favNumbers = [2,3,18];
async function part2() {
    let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    console.log(data)
}
part2()

// 3. Four Facts on favorite number and add to HTML
async function part3() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => {
            return $.getJSON(`${baseURL}/${favNumber}?json`);
        })
    )
    facts.forEach(data => $("body").append(`<ul>${data.text}</ul>`));
}
part3()
  