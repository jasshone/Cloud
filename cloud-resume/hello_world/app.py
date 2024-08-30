import json
import boto3
from decimal import Decimal
from boto3.dynamodb.conditions import Key
client = boto3.client('dynamodb', region_name = "us-east-2")
dynamodb = boto3.resource("dynamodb", region_name = "us-east-2")
try:
    table = dynamodb.Table('VisitorCount')
    tableName = 'VisitorCount'
except:
    print("help")


def lambda_handler(event, context):
    #print(event)
    body = {}
    statusCode = 200
    headers = {
        "Content-Type": "application/json"
    }
    
    
    try:
        assert "routeKey" in event
        '''if event['httpMethod'] == "DELETE":
            table.delete_item(
                Key={'id': event['pathParameters']['id']})
            body = 'Deleted item ' + event['pathParameters']['id']'''
        
        if event['routeKey'] == "GET /item":
            '''body = table.scan()
            body = body["Items"]
            print("ITEMS----")
            print(body[0]["id"])'''
            
            body = table.get_item(
                Key={
                    "item": 'global',
                    "id": 'count'
                })
            #print(body)
            
            
            body = body["Item"]["value"]
            
            responseBody = [
                {'count': str(body)}]
            body = responseBody
            '''body = table.scan()
                body = body["Items"]
                print("ITEMS----")
                print(body)
                responseBody = []
                for items in body:
                    responseItems = [
                        {'id': items['id'], 'value': str(items['value'])}]
                    responseBody.append(responseItems)
                body = responseBody'''
            '''elif event['httpMethod'] == "GET/{id}":
                body = table.get_item(
                    Key={'id': event['pathParameters']['id']})
                body = body["Item"]
                responseBody = [
                    {'price': float(body['price']), 'id': body['id'], 'name': body['name']}]
                body = responseBody'''
        elif event['routeKey'] == "PUT /item":
            #print(event['body'])
            if 'body' in event and event['body']: requestJSON = json.loads(event['body'])
            #print("1")
            body = table.get_item(
                Key={
                    "item": 'global',
                    "id": 'count'
                })
            #print(body)
            
            body = int(body["Item"]["value"])
            response = table.update_item(
                Key={
                    "item": 'global',
                    "id": 'count'
                },
                UpdateExpression="set #value = :v",
                ExpressionAttributeNames={
                    "#value": "value",
                },
                ExpressionAttributeValues={
                    ":v": Decimal(body+1),
                },
                ReturnValues="UPDATED_NEW",)
            print(body)
            body = str(response["Attributes"]["value"])
            responseBody = [
                {'count': body}]
            body = responseBody
            #body = 'Put item ' + requestJSON['id']
    except KeyError:
        statusCode = 400
        body = 'Unsupported route: '+ event["routeKey"]
        #event['body']
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
            
        },
        "body": body
    }
    return res
    