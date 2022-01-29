from flask import Flask, send_file
from selenium import webdriver
import chromedriver_binary

app = Flask(__name__)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("window-size=1024,768")
chrome_options.add_argument("--no-sandbox")


browser = webdriver.Chrome(chrome_options=chrome_options)


@app.route("/")
def hello_world():
    browser.get("https://dev.to/googlecloud/using-headless-chrome-with-cloud-run-3fdp")
    file_name = 'test.png'
    browser.save_screenshot(file_name)
    return send_file(file_name)