import requests
from bs4 import BeautifulSoup

url = "https://www.instacart.com/store/publix/collections/produce"

data = requests.get(url)

sampleRequest = requests.get("https://www.instacart.com/v3/view/item_attributes/item_104561344,item_104561415,item_104561591,item_104561619,item_104562336,item_104562349,item_104562655,item_104563032,item_104565101,item_104566264,item_104567695,item_104570908,item_104632695,item_1451375260,item_561917727,item_807787227?source=web&cache_key=e8d0b2-4848-t-81b")

print(sampleRequest)