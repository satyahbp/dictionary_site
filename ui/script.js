let words_dict = {
    "dictionary": "a book to take words from",
    "home": "the place where I find peace"
}

function capture_word(){
    
    // capturing the word
    let input = document.getElementById("search").value;

    // session storing the word
    sessionStorage.setItem("currentWord", input);

    // changing the page
    window.open("word_page.html", "_self");
}

function present_word(){
    let the_word = sessionStorage.getItem("currentWord");
    console.log(the_word);
}