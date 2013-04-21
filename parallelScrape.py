import json
from utils import bingscraper

def search(query):
  urls = bingscraper.get_urls(query, 1)
  results = []
  for index, url in enumerate(urls):
    result = {}
    result['title'] = url['title']
    result['url'] = url['url']
    result['rank'] = index
    result['content'] = htmlparser.strip_tags(url['url'])
    if result['content'] != "":
      results.append(result)

  return json.dumps(results)

if __name__ == '__main__':
  query = "bear"
  search(query)
