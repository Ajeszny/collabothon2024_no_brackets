from datetime import datetime, timedelta
import pandas as pd
import requests
import json
import random

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

def create_synthetic_card_data(n_cards=5, n_transactions=20):
    card_names = [f"Card {i}" for i in range(1, n_cards + 1)]
    starting_balances = [random.uniform(500, 5000) for _ in range(n_cards)]  # Initial balance for each card

    # Create a DataFrame to store the cards and their balances
    card_data = pd.DataFrame({'Card': card_names, 'Starting_Balance': starting_balances})

    # Transaction types
    transaction_types = ['Investment', 'Saving', 'Simple Transaction', 'Purchase', 'Refund']

    # Generate transactions for each card
    transactions = []
    for card in card_names:
        # Create a random list of transaction amounts (positive = deposit, negative = withdrawal)
        transaction_amounts = [random.uniform(-500, 1000) for _ in range(n_transactions)]

        # Generate a list of dates for these transactions (within the last 30 days)
        transaction_dates = [datetime.now() - timedelta(days=random.randint(1, 30)) for _ in range(n_transactions)]
        transaction_dates.sort()  # Sort the dates chronologically

        # Randomly assign transaction types
        transaction_type = [random.choice(transaction_types) for _ in range(n_transactions)]

        # Combine into a DataFrame
        card_transactions = pd.DataFrame({
            'Card': card,
            'Transaction_Amount': transaction_amounts,
            'Date': transaction_dates,
            'Transaction_Type': transaction_type  # Add transaction type
        })
        transactions.append(card_transactions)

    # Combine all card transactions into one DataFrame
    transactions_df = pd.concat(transactions, ignore_index=True)

    return card_data, transactions_df