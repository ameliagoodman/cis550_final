txtfile = open('locations.txt', 'r')

results = ""
for line in txtfile:
    changeline = line.rstrip()
    year_city = changeline.split(',')
    city = "\"" + year_city[1] + "\""
    newline = "(" + year_city[0] + "," + city + "),"
    results += newline

print results
