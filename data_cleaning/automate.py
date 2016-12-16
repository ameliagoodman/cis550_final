import MySQLdb

txtfile = open('medallists.txt', 'r')

results = []
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
        newline+= ")"
    results.append(newline)

print results



db = MySQLdb.connect(host="cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com", user="welovedope", passwd="dope420420", db="cis550project")
cursor = db.cursor()

for result in results:
    cursor.execute("insert into medalist(game_location, year, sport, discipline, name, country, gender, event, medal) values " + result)

