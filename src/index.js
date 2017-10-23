const $ = require('jquery')

document.addEventListener("DOMContentLoaded", () => {
  topWord()
  $("button").on("click", textCount)
})

function topWord(){
  $.get("https://wordwatch-api.herokuapp.com/api/v1/top_word", function(data) {
    let word = Object.keys(data.word)
    let count = Object.values(data.word)
    $("h3").append(`${word} (${count})`)
  })
}

function textCount() {
  let wordsToCount = $("textarea").val()
  $.ajax({
    type: "POST",
    url: "https://wordwatch-api.herokuapp.com/api/v1/words",
    data: {word: { value: wordsToCount}},
  })
  .done(function(data) {
    addSizedWord(wordsToCount)
    alert("success")
    console.log(data)
  })
  .fail(function() {
    alert("problem!")
  })
}

function addSizedWord(unsizedWord) {
  $("article.word-count").append(unsizedWord).css("font-size","2px")
}
