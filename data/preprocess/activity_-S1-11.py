import json
import time
data = {'species': {}}

f = open('S1-11_filtered.csv', 'r')
line = f.readline()
while True:
    line = f.readline()
    if not line:
        break
    parts = line.split(',')
    key = parts[6].lower()
    if key not in data['species']:
        data['species'][key] = []
    try:
        # ctime = time.strftime('%T', time.strptime(parts[3], '%I:%M:%S %p'))
        ctime = time.strptime(parts[3], '%I:%M:%S %p').tm_hour
        data['species'][key].append(ctime)
    except ValueError:
        pass
#for species in data['species']:
    #data['species'][species] = [time.strftime('%T', t) for t in sorted(data['species'][species])]

f.close()
f = open('../S1-11_filtered.json', 'w')
json.dump(data, f)
f.close()
