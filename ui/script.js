const xhttp = new XMLHttpRequest();

const media_700_min_width = window.matchMedia("(min-width: 701px)");
const media_700_601 = window.matchMedia("(max-width: 700px) and (min-width: 601px)");
const media_600_551 = window.matchMedia("(max-width: 600px) and (min-width: 551px)");
const media_550_501 = window.matchMedia("(max-width: 550px) and (min-width: 501px)");
const media_500_451 = window.matchMedia("(max-width: 500px) and (min-width: 451px)");
const media_450_401 = window.matchMedia("(max-width: 450px) and (min-width: 401px)");
const media_400_351 = window.matchMedia("(max-width: 400px) and (min-width: 351px)");
const media_350_301 = window.matchMedia("(max-width: 350px) and (min-width: 301px)");
const media_300_251 = window.matchMedia("(max-width: 300px) and (min-width: 251px)");
const media_251_max_width = window.matchMedia("(max-width: 251px)");


function capture_word(){
    let input = document.getElementById("search").value;
    sessionStorage.setItem("currentWord", input);
    window.open("word_page.html", "_self");
}

function present_word(){

    let the_word = sessionStorage.getItem("currentWord");
    let received_json = undefined;
    // sending request
    xhttp.open("GET", "https://"+ window.location.host + "/dict/search/" + the_word);
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
    let no_word = document.getElementById("no_word");

    if (received_json.hasOwnProperty("status") && (received_json["status"] == "success")){

        word_array = [received_json["meaning"]];
        
        word_heading.innerHTML = received_json["word"];

        if (the_word.toLowerCase() != received_json["word"].toLowerCase()){
            no_word.innerHTML = "There's no word as '" + the_word + "' with us. Do you mean to search for '" + received_json["word"] + "' ?";
        }
        else{
            no_word.innerHTML = "";
        }

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
        // xhttp.open("GET", "http://localhost:2001/continuous_search/" + input, true);
        xhttp.open("GET", "https://"+ window.location.host + "/dict/continuous_search/" + input, true);
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
    if (received_list.length > 0){
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

        if (recommendation_list.classList.contains("word_page_rc")){
            
            if (media_700_min_width.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "72px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "58px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "45px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "32px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "20px";
                }
            }
            else if (media_700_601.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "67px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "58px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "45px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "32px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "20px";
                }
            }
            else if (media_600_551.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "64px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "53px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "42px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "30px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "20px";
                }
            }
            else if (media_550_501.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "58px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "49px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "37px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "28px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "16px";
                }
            }
            else if (media_500_451.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "55px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "45px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "35px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "25px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "15px";
                }
            }
            else if (media_450_401.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "55px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "45px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "35px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "25px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "15px";
                }
            }
            else if (media_400_351.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "51px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "40px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "32px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "22px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "14px";
                }
            }
            else if (media_350_301.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "80px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "84px";
                }
            }
            else if (media_300_251.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "80px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "84px";
                }
            }
            else if (media_251_max_width.matches){
                if (received_list.length == 5){
                    recommendation_list.style.top = "80px";
                }
                else if (received_list.length == 4){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 3){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 2){
                    recommendation_list.style.top = "84px";
                }
                else if (received_list.length == 1){
                    recommendation_list.style.top = "82px";
                }
            }
        }
        else if (recommendation_list.classList.contains("word_page_main")){

        }
    }
    else{
        recommendation_list.style.display = "none";
    }
    
    
}

function capture_recommendation(id){
    // console.log(id);
    let word = document.getElementById(id).innerHTML;
    sessionStorage.setItem("currentWord", word);
    window.open("word_page.html", "_self");
}