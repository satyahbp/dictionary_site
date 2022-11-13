import meilisearch
import json

client = meilisearch.Client("http://127.0.0.1:10001")

movie = client.index("dictionary").search("qua",{"limit": 200})

print(movie)