from pymongo import MongoClient



try:
    client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
    # Connect to the database and count the number of documents in a collection
    db = client["test_database"]
    coll = db["test_collection"]
    count = coll.count_documents({})

    print("MongoDB health check: OK")

except Exception as e:
    print("Error: Could not connect to MongoDB:", str(e))

