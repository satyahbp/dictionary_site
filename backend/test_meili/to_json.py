import json

with open("TextFile.txt", "r") as f:
    lines = f.readlines()

print(lines)

words_list = list()
for each_line in lines:
    each_line = each_line.strip()
    elements = each_line.split(" ")
    word = elements[0]

    meaning = " ".join(elements[2:])

    temp_dict = {
        "word": word,
        "meaning": meaning
    }
    words_list.append(temp_dict)

words_json_str = json.dumps(words_list)

with open("words_json.json", "w") as files:
    files.write(words_json_str)

print(" ")