## Table of Contents:
### Introduction
### Usage
### Technologies
### Authors

# Introduction

Do you want to find the cheapest option for groceries nearby? This application uses crowd-sourced data from user photos pulled using Google's Vision AI. With this data, we can store the instance with the lowest price, and return the information from the database when queried. This allows shoppers to see the store with each of the cheapest options in the chosen area. 
# Usage
When you first open the app you will be prompted to login, if you do not already have an account you can create one just click on "Not a User?". Once you are into the app there are four pages, map, lists, account information, and receipt submission. Using the map page you can see the grocery stores within a user set radius from your current location. 
The list page allows you to create shopping lists that will then check the database for the item's lowest price and corresponding store. The account information page allows you to edit your information including your username, password, and profile picture. The fourth and final page on the app is the receipt submission page, using this page users can submit pictures of receipts from listed stores. With these photos using Google's Vision AI price information can be pulled and used to update the Google SQL database of prices.
## Technologies

###[Google Cloud SQL](https://cloud.google.com/sql)
###[Google Cloud Storage](https://cloud.google.com/storage)
###[Google Firebase Storage](https://firebase.google.com/docs/storage)
###[Google Vision AI](https://cloud.google.com/vision)
###[Google Cloud Functions](https://cloud.google.com/functions)
###[Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
###[React Native](https://reactnative.dev/)


## Authors

### Edwin Lora
### Bruce Maddux
### Connor Syron
### Samir Ziad
