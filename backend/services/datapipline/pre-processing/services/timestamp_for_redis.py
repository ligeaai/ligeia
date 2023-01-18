import time
import datetime

s = "23/01/2021 03:03:03"
print(type(s))
a = int(time.mktime(datetime.datetime.strptime(s, "%d/%m/%Y %H:%M:%S").timetuple()))
print(a)
