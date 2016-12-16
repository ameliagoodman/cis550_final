txtfile = open('countries.csv', 'r')

results = ""
for line in txtfile:
    changeline = line.rstrip()
    cpis = changeline.split(',')
    country = cpis[0]
    if cpis[1]=="":
        y1995 = "null"
    else:
        y1995 = cpis[1]
    if cpis[2]=="":
        y1996 = "null"
    else:
        y1996 = cpis[2]
    if cpis[3]=="":
        y2000 = "null"
    else:
        y2000 = cpis[3]
    if cpis[4] =="":
        y2004 = "null"
    else:
        y2004 = cpis[4]
    if cpis[5] =="":
        y2008 = "null"
    else:
        y2008 = cpis[5]
    if cpis[6] =="":
        y2015 = "null"
    else:
        y2015 = cpis[6]

    newline = "(\"" + country + "\",1995," + y1995+ " ), "
    results += newline
    newline = "(\"" +country + "\",1996," + y1996+ " ), "
    results += newline
    newline = "(\"" +country + "\",2000," + y2000+ " ), "
    results += newline
    newline = "(\"" +country + "\",2004," + y2004+ " ), "
    results += newline
    newline = "(\"" +country + "\",2008," + y2008+ " ), "
    results += newline
    newline = "(\"" +country + "\",2015," + y2015 + " ), "

print results
