from io import open
import unicodedata

txtfile = open('dopes.txt', 'r')

results = ""
for line in txtfile:
    changeline = line.rstrip()
    entries = changeline.split('\t')
    newline = "("
    for entry in entries:
        entry = entry.replace('\"', '\'')
        if entry == entries[0]:
            entry = ''.join(c for c in unicodedata.normalize('NFD', entry)
                if unicodedata.category(c) != 'Mn')
        if entry != entries[8]:
            entry = entry.split('[')[0]
            newline += "\"" + entry + "\","
        else:
            newline += entry + ","
    if len(entries) == 10:
        newline +="\"\"),"
    else:
        newline = newline[:-1]
        newline+= "),"
    results += newline

print results
