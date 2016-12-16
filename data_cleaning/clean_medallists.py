txtfile = open('medalists.txt', 'r')

results = ""
for line in txtfile:
    changeline = line.rstrip()
    newline = "(" + changeline + "), "
    results += newline

print results
