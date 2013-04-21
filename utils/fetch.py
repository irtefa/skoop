import sys
from pygoogle import pygoogle

# gets query in string format
query = sys.argv[1]
# number of pages worth of result
num_pages = int(sys.argv[2])

g = pygoogle(query)
g.pages = num_pages

# retrieve urls related to our query
results = g.get_urls()

for result in results:
    print result
