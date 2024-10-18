import requests
import json

def get_auth_token():
    url = "https://api-sandbox.commerzbank.com/auth/realms/sandbox/protocol/openid-connect/token"
    CLIENT_ID = "5636b3de-9a29-4d79-bd1c-8962e61a2c5c" # Later should be changed to environment variable
    CLIENT_SECRET = "51bf1de9-a88f-42ba-8b72-dca755adddfe"
    payload = ("grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET)

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    token = json.loads(response.text)['access_token']
    return token

def make_a_call(token):
    url = "https://api-sandbox.commerzbank.com/accounts-api/21/v2/accounts"
    headers = {
        'Authorization': 'Bearer ' + token
    }
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 401:
        return response.reason
    return json.loads(response.text)