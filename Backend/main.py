from flask import Flask, jsonify, send_file
from selenium import webdriver
import chromedriver_binary
import time 
from google.cloud import vision
app = Flask(__name__)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("window-size=1920,1080")
chrome_options.add_argument("--no-sandbox")



browser = webdriver.Chrome(chrome_options=chrome_options)



@app.route("/")
def hello_world():
    browser.get("https://dev.to/googlecloud/using-headless-chrome-with-cloud-run-3fdp")
    file_name = 'test.png'
    browser.save_screenshot(file_name)
    return send_file(file_name)

@app.route("/publix")
def publix_scraper():
    browser.get("https://www.instacart.com/store/publix/collections/produce")
    login_button = browser.find_element_by_xpath("//button[@class='css-s55bq']")
    print(login_button, flush=True)
    login_button.click()
    time.sleep(2)
    username_form = browser.find_element_by_xpath("//input[@type='email']")
    username_form.send_keys("edwin1lora@me.com")
    
    time.sleep(2)
    password_form = browser.find_element_by_xpath("//input[@type='password']")
    time.sleep(2)

    submit_button = browser.find_element_by_xpath("//button[@class='css-1i23zk9']")
    submit_button.click()
    time.sleep(2)

    file_name = 'test.png'
    browser.save_screenshot(file_name)
    return send_file(file_name)