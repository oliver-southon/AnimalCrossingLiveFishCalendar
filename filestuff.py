new_arr = []
with open('january.txt') as f:
    for line in f:
        line = line.split("\t")
        name = line[0]
        price = line[2]
        location = line[3]
        size = line[4]
        time = line[5]

        price = price.replace(',','')

        row = f"{name}, {price}, {location}, {size}, {time}"
        if row[-1] == '\n':
            row = row[:-1]
        new_arr.append(row)

with open('newdata.csv', 'w') as f:
    for line in new_arr:
        f.write(line +'\n')