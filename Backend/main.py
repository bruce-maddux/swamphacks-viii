import base64
import json
from lib2to3.pgen2 import driver
import os 
from google.cloud import storage
from google.cloud import vision
# def hello_gcs(event, context):
#     print('Event ID: {}'.format(context.event_id))
#     print('Event type: {}'.format(context.event_type))
#     print('Bucket: {}'.format(event['bucket']))
#     print('File: {}'.format(event['name']))
#     print('Metageneration: {}'.format(event['metageneration']))
#     print('Created: {}'.format(event['timeCreated']))
#     print('Updated: {}'.format(event['updated']))

vision_client = vision.ImageAnnotatorClient()
storage_client = storage.Client()
import sqlalchemy

db_user = os.environ["DB_USER"]
db_pass = os.environ["DB_PASS"]
db_name = os.environ["DB_NAME"]
db_socket_dir = os.environ.get("DB_SOCKET_DIR", "/cloudsql/")
instance_connection_name = os.environ["INSTANCE_CONNECTION_NAME"]



db_config = {
        "pool_size": 5,
        "max_overflow": 2,
        "pool_timeout": 30, 
        "pool_recycle": 1800,  
    }

db = sqlalchemy.create_engine(
        # Equivalent URL:
        # mysql+pymysql://<db_user>:<db_pass>@/<db_name>?unix_socket=<socket_path>/<cloud_sql_instance_name>
        sqlalchemy.engine.url.URL.create(
            drivername="mysql+pymysql",
            username="root",
            password="admin",
            database="db",
            query={
                "unix_socket": "/cloudsql/vernal-bonfire-303320:us-central1:prices"
            }
        ),
        **db_config
    )

project_id = os.environ["GCP_PROJECT"]

#Used to clean up data
common_groceries_name = ["milk", "potato", "potatoes", "pizza", "onion", 'onions red', "red onions", "sweet onions", 
        "sweet onion", "red onion", "bananas", "butter", "gelato", "doritos"]

def process_image(file, context):
    bucket = file["bucket"]
    name = file["name"]

    detect_text(bucket, name)

    print(f"File {file['name']} processed.")

def detect_text(bucket, filename):
    print("Looking for text in image {}".format(filename))

    futures = []

    image = vision.Image(
        source = vision.ImageSource(gcs_image_uri=f"gs://{bucket}/{filename}")
    )
    text_detection_response = vision_client.text_detection(image=image)
    annotations = text_detection_response.text_annotations

    if len(annotations) > 0:
        text = annotations[0].description
    else:
        text = ""
    print("Extracted text {} from image ({} chars).".format(text, len(text)))
    
    words = text.split('\n')

    # Assumes that the first token will always be the first element
    # Check if that is not true:
    if any(char.isdigit() for char in words[0]) and not any(char.isalpha() for char in words[0]):
        words.pop(0)
    
    groceries = []
    prices = []

     
    for token in words:
        if '@' in token: # 1 @ 3
            continue 

        numLetters = 0
        numDigits = 0
        for char in token:
            if char.isalpha():
                numLetters += 1
            elif char.isdigit():
                numDigits += 1
        
        if numDigits < 2 and len(token) > 0: # A word
            if token[0].isdigit():
                continue
            in_common_list = False
            for grocery in common_groceries_name: 
                if grocery in token.lower():
                    groceries.append(grocery)
                    in_common_list = True
                    break

            if not in_common_list:
                groceries.append(token.lower())

        elif numLetters < 2 and len(token) > 0: # A number (Example Publix : 4.99 F)
            priceSplit = token.split(' ')
            prices.append(priceSplit[0]) 

    #Clean up data (Remove brand names)

    # For storing in a bucket:
    bucket_name = "new-bucket-for-text"
    result_filename = filename + ".txt"
    result_bucket = storage_client.get_bucket(bucket_name)
    blob = result_bucket.blob(result_filename)

    result_string = result_filename + '\n' + str(groceries) + "\n" + str(prices)

    blob.upload_from_string(result_string)

    try:
        with db.connect() as conn:
            print("CONNECTED SUCCESSFULLY")
            minLength = min(len(groceries), len(prices))
            for index in range(minLength):
                sqlStatement = sqlalchemy.text(f"select * from pricetable where item like \"%{groceries[index]}%\"")
                results = conn.execute(sqlStatement)
                print(f"RESULTS: {results}")
                for row in results:
                    if float(prices[index]) < float(row.price):
                        print(f"UPDATING VALUE: ")
                        sqlQuery = f"update pricetable set price = {float(prices[index])} where item = \"{groceries[index]}\""
                        sqlStatement = sqlalchemy.text(sqlQuery)
                        conn.execute(sqlStatement)
                    
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")



