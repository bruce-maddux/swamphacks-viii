from flask import escape 
from flask import jsonify
import functions_framework
import sqlalchemy



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


@functions_framework.http
def retrieve_prices(request):
    
    if request.method == 'GET':
        return ('GET METHOD CALLED', 200, {
        'Access-Control-Allow-Origin': '*'
        })
    
    elif request.method == 'POST':
        request_json = request.get_json(silent=True)
        
        print(request_json)
        groceryList = request_json["groceryList"]
        
        prices = []
        stores = []
        try:
            with db.connect() as conn:
                print("CONNECTED SUCCESSFULLY")
                for grocery in groceryList:
                    sqlStatement = sqlalchemy.text(f"select * from pricetable where item =\"{grocery}\";")
                    results = conn.execute(sqlStatement)
                    empty = True
                    for row in results:
                        empty = False
                        prices.append(row.price)
                        stores.append(row.store)

                    if empty:
                        prices.append(0.00)
                        stores.append('N/A')
        
        except Exception as e:
            print(f"CONNECTION ERROR: {e}")
        
        priceList = {
            "groceryList" : groceryList,
            "prices" : prices,
            "stores" : stores
        }
        

        return(jsonify(priceList), 200, {
            'Access-Control-Allow-Origin': '*'
        })


    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return ('Hello World!', 200, headers)