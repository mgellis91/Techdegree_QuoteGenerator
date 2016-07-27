// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotes = [
  {
    quote:"Don't cry because it's over, smile because it happened.",
    source:"Dr. Seuss"
  },
  {
    quote:"I have not failed. I've just found 10,000 ways that won't work.",
    source:"Thomas A. Edison"
  },
  {
    quote:"Never put off till tomorrow what may be done day after tomorrow just as well.",
    source:"Mark Twain"
  },
  {
    quote:"If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
    source:"Haruki Murakami",
    citation:"Norwegian Wood",
    year:"1987"
  },
  {
    quote:"The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
    source:"Terry Pratchett",
    citation:"Diggers",
    year:"1990"
  },
  {
    quote:"Anyone who has never made a mistake has never tried anything new",
    source:"Albert Einstein"
  },
  {
    quote:"A mind needs books as a sword needs a whetstone, if it is to keep its edge.",
    source:"George R.R. Martin",
    citation:"A Game of Thrones (A Song of Fire and Ice)",
    year:"1996"
  },
]

var usedQuotes = [];
var randomQuote = {};

var currentColor = "";
var newColor = "";
var colors = ["#3498db","#e74c3c","#2c3e50","#1abc9c","#9b59b6"];

//choses a random number from 0 to the last index of the passed in array and returns the element at that random index
function getRandomItem(arr){
  var randomIndex = Math.floor(Math.random() * quotes.length);
  return arr[randomIndex];
}

function printQuote(){
  randomQuote = getRandomItem(quotes);

  //keep choosing a random quote until one that hasn't been used yet has been chosen
  while( usedQuotes.indexOf(randomQuote.quote) > -1 ){
    randomQuote = getRandomItem(quotes);
  }

  usedQuotes.push(randomQuote.quote);

  //if all of the quotes have been used reset the array keeping track of which ones have already been used
  if(usedQuotes.length >= quotes.length){
    usedQuotes = [];
  }

  newColor = getRandomItem(colors);

  //keep choosing a new color until a different one from the previous color has been chosen
  while(newColor === currentColor){
    newColor = getRandomItem(colors);
  }

  document.getElementById("loadQuote").style.background = newColor;
  document.body.style.background = newColor;

  currentColor = newColor;

  var quoteHTML = '<p class="quote"> ' + randomQuote.quote + '</p> <p class="source"> ' + randomQuote.source;

  //if the quote has citation property append the HTML to display the citation and year to the HTML for the quote
  if(randomQuote.hasOwnProperty("citation")){
    quoteHTML += '<span class="citation">' + randomQuote.citation + '</span> <span class="year">' + randomQuote.year + '</span> </p>';
  }

  document.getElementById('quote-box').innerHTML = quoteHTML;

  //rest the quote interval after a new quote has been printed
  clearInterval(quoteInterval);
}

//change to a new quote every 30 seconds if a new one hasnt been printed yet
var quoteInterval = setInterval(printQuote,30000);
