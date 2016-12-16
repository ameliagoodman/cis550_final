txtfile = open('medallists.txt', 'r')

results = ""
for line in txtfile:
    changeline = line.rstrip()
    entries = changeline.split('\t')
    newline = "("
    for entry in entries:
        if entry != entries[1]:
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
