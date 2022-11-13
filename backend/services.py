from fastapi import APIRouter, Request
import meilisearch

search_service = APIRouter()
meili_client = meilisearch.Client("http://127.0.0.1:10001")

@search_service.get("/search/{word}")
def search_item(word):
    resp_json = {
        "status": "failed"
    }
    word_meaning = meili_client.index("dictionary").search(word,{"limit": 2})
    if "hits" in word_meaning and word_meaning["hits"]:
        first_word = word_meaning["hits"][0]
        resp_json = first_word
        resp_json["status"] = "success"

    return resp_json

@search_service.get("/continuous_search/{word}")
def continuous_search(word):
    resp = list()

    words = meili_client.index("dictionary").search(word,{
        "limit": 5,
        "sort": ["word:asc"]
    })

    for each_word in words["hits"]:
        current_word = each_word["word"]
        if word.lower() in current_word.lower():
            resp.append(current_word)
    return resp
    