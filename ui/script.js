let words_dict = {
    "dictionary": ["a book to take words from"],
    "home": ["the place where I find peace", "a house"]
}

function capture_word(){
    
    let input = document.getElementById("search").value;
    sessionStorage.setItem("currentWord", input);
    window.open("word_page.html", "_self");
}

function present_word(){

    let the_word = sessionStorage.getItem("currentWord");
    let word_array = undefined;
    let word_heading = document.getElementById("word_for_explanation");
    let word_description = document.getElementById("word_description");
    let word_list_point = document.getElementById("exp_ul");
    let li = undefined;
    let word_meaning = undefined
    if (words_dict.hasOwnProperty(the_word)){

        word_array = words_dict[the_word];
        word_heading.innerHTML = the_word;

        word_list_point.innerHTML = ""
        word_array.forEach(element => {
            li = document.createElement("li")
            li.classList.add("desc_point");
            word_meaning = document.createTextNode(element);
            word_list_point.appendChild(li);
            li.appendChild(word_meaning);
        });
    }
    else{
        word_heading.innerHTML = "The word '" + the_word +"' doesn't exist";
        word_list_point.innerHTML = "";
        not_exist_message = document.createElement("div");
        not_exist_message.setAttribute("id", "not_exist_message");
        word_description.appendChild(not_exist_message);
        word_meaning = document.createTextNode("The word that you are searching for does not exist in our records. Sorry for the inconvenience.")
        not_exist_message.appendChild(word_meaning);
    }
}