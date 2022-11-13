import meilisearch
import json

client = meilisearch.Client("http://127.0.0.1:10001")

# json_file = open("words_json.json")
# dict_file = json.load(json_file)

# creating index
# resp = client.create_index("dictionary", {"primaryKey":"word"})
# print(resp)

# pushing documents
# resp = client.index("dictionary").add_documents(dict_file)
# print(resp)

# update documents
# client.index("dictionary").update_settings({
#     "sortableAttributes":[
#         "word"
#     ]
# })

client.index("dictionary").update_ranking_rules([
    "word",
    "meaning"
])
