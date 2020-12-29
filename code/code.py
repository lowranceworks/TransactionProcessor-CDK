from __future__ import print_function

import uuid
import boto3
import urllib
import json
import datetime 

def process_purchase(event, context):
    date = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
    message = 'Hello from lambda land inside the process_purchase function'  
    customerID = str(uuid.uuid1())
    output = {"CustomerID": customerID, "Amount": 50, "TransactionType": "PURCHASE", "DateTime": date, "message": message}

    return output 

#new function to pass payload to receipt generator
def process_refund(event, context):
    date = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
    message = 'Hello from lambda land inside the process_refund function'  
    customerID = str(uuid.uuid1())
    output = {"CustomerID": customerID, "Amount": 50, "TransactionType": "REFUND", "DateTime": date, "message": message}

    return output 

## new function
def generate_purchase_receipt(event, context):
    data = event["Payload"] # works

    # 2. Read off the input arguments 
    customerID = data["CustomerID"]
    amount = data["Amount"]
    transactionType = data["TransactionType"]
    date = data["DateTime"]
    message = 'Hello from lambda land inside the generate_purchase_receipt function'  

    # 3. Generate a random id
    receiptID = str(uuid.uuid1())
    
    # format response
    output = {"CustomerID": customerID, "Amount": amount, "TransactionType": transactionType, "PurchaseDate": date, "Message": message, "ReceiptID": receiptID}

    return output 


def generate_refund_receipt(event, context):
    data = event["Payload"] # works

    # 2. Read off the input arguments 
    customerID = data["CustomerID"]
    amount = data["Amount"]
    transactionType = data["TransactionType"]
    date = data["DateTime"]
    message = 'Hello from lambda land inside the generate_refund_receipt function'  

    # 3. Generate a random id
    receiptID = str(uuid.uuid1())
    
    # format response
    output = {"CustomerID": customerID, "Amount": amount, "TransactionType": transactionType, "PurchaseDate": date, "Message": message, "ReceiptID": receiptID}

    return output 
