txtfile = open('medallists.txt', 'r')

results = []
for line in txtfile:
    changeline = line.rstrip()
    entries = changeline.split('\t')
    newLine = {}
    newLine['game_location'] = "\"" + entries[0] + "\""
    newLine['year'] = entries[1]
    newLine['sport'] = "\"" + entries[2] + "\""
    newLine['discipline'] = "\"" + entries[3] + "\""
    newLine['name'] = "\"" + entries[4] + "\""
    newLine['country'] = "\"" + entries[5] + "\""
    newLine['gender'] = "\"" + entries[6] + "\""
    newLine['event'] = "\"" + entries[7] + "\""
    newLine['medal'] = "\"" + entries[8] + "\""

    results.append(newLine)

print results
