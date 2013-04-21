#from bs4 import BeautifulSoup
from BeautifulSoup import BeautifulSoup

import urllib2


def get_urls(q, pages):
    ## Fetch the results
    query = q
    pageStart = pages  # The number of the result to start at
    url = "http://www.bing.com/search?q={0}&first={1}".format(query, pageStart)
    page = urllib2.urlopen(url)

    ## Parse results
    soup = BeautifulSoup(page.read())

    ## Find usable results, in sa_wr class list items
    results = soup.findAll('li', attrs={'class': 'sa_wr'})

    resultList = []
    ## Return dictionaries of results
    for r in results:
        header = r.find('h3').find('a')
        link = header['href']
        title = header.text
        content = r.find('p').text
        resultList.append({'url': link, 'title': title, 'content': content})

    return resultList
