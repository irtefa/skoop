###
#  Change this to 
#   from BeatifulSoup import BeautifulSoup
#  if you pip-installed bs
###
from bs4 import BeautifulSoup

import urllib2


## Fetch the results
query = "bear"
pageStart = 20  # The number of the result to start at
url = "http://www.bing.com/search?q={0}&first={1}".format(query, pageStart)
page = urllib2.urlopen(url)


## Parse results
soup = BeautifulSoup(page.read())

## Find usable results, in sa_wr class list items
results = soup.findAll('li', attrs={'class': 'sa_wr'})

## Return dictionaries of results
for r in results:
  header = r.find('h3').find('a')
  link = header['href']
  title = header.text
  content = r.find('p').text
  resultList.append({'url': link, 'title': title, 'content': content})




