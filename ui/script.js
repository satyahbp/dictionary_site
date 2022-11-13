const xhttp = new XMLHttpRequest();

function capture_word(){
    let input = document.getElementById("search").value;
    sessionStorage.setItem("currentWord", input);
    window.open("word_page.html", "_self");
}

function present_word(){

    let the_word = sessionStorage.getItem("currentWord");
    let received_json = undefined;
    // sending request
    xhttp.open("GET", "http://localhost:2001/search/" + the_word);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            received_json = JSON.parse(this.responseText);   
            process_word(the_word, received_json);
        }
    }
}

function process_word(the_word, received_json){
    let word_array = undefined;
    let word_heading = document.getElementById("word_for_explanation");
    let word_description = document.getElementById("word_description");
    let word_list_point = document.getElementById("exp_ul");
    let li = undefined;
    let word_meaning = undefined;

    if (received_json.hasOwnProperty("status") && (received_json["status"] == "success")){

        word_array = [received_json["meaning"]];
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

function continuous_word(){
    let input = document.getElementById("search").value;

    // sending request
    if (input != ""){
        xhttp.open("GET", "http://localhost:2001/continuous_search/" + input, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                received_list = JSON.parse(this.responseText);   
                show_word_recommendation(received_list);
            }
        }
    }
    else{
        show_word_recommendation([]);
        rec_list = document.getElementById("recommendation_list");
        rec_list.style.display = "none";
    }
    
}

function show_word_recommendation(received_list){
    // console.log(received_list);
    let recommendation_list = document.getElementById("recommendation_list");
    recommendation_list.style.display = "block";
    recommendation_list.innerHTML = "";
    let list_element = undefined;
    received_list.forEach(function(element, i) {
        list_element = document.createElement("li");
        list_element.classList.add("rec_li");
        list_element.setAttribute("id", "rec_" + String(i));
        list_element.innerHTML = element;
        list_element.onclick = function(){capture_recommendation(this.id)};
        recommendation_list.appendChild(list_element);
    })
}

function capture_recommendation(id){
    // console.log(id);
    let word = document.getElementById(id).innerHTML;
    sessionStorage.setItem("currentWord", word);
    window.open("word_page.html", "_self");
}