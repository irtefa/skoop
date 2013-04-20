import sys
from pygoogle import pygoogle

query = sys.argv[1]
num_pages = sys.argv[2]

g = pygoogle(query)
g.pages = int(num_pages)

results = g.get_urls()

for result in results:
    print result
