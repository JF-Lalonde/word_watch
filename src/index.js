const $ = require('jquery')

document.addEventListener("DOMContentLoaded", () => {
  topWord()
  $("button").on("click", sendEachWord)
})

function topWord(){
  $.get("https://wordwatch-api.herokuapp.com/api/v1/top_word", function(data) {
    let word = Object.keys(data.word)
    let count = Object.values(data.word)
    $("h3").append(`${word} (${count})`)
  })
}

function sendEachWord() {
  let wordsToCount = $("textarea").val().split(" ")
  let wordCount = {}
  countOccurences(wordsToCount, wordCount)
  wordsToCount.forEach(function(individualWord) {
    $.ajax({
      type: "POST",
      url: "https://wordwatch-api.herokuapp.com/api/v1/words",
      data: {word: { value: individualWord}},
    })
      .done(function(data) {
        addSizedWord(individualWord, wordCount)
        console.log(data)
      })
      .fail(function() {
        alert("problem!")
      })
  })

}

function countOccurences(wordsToCount, wordCount) {
  for (let i = 0, len = wordsToCount.length; i < len; i++) {
    wordCount[wordsToCount[i]] = ( wordCount[wordsToCount[i]] || 0) + 1
  }
}

function addSizedWord(unsizedWord, wordCount) {
  console.log(wordCount[unsizedWord])
  $("article.word-count").append(`<span style="font-size:${wordCount[unsizedWord]}px">${unsizedWord}</span>`)
}
