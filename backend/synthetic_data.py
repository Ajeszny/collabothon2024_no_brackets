import random
import pandas as pd
import numpy as np
from datetime import timedelta, datetime
import matplotlib.pyplot as plt


# Step 1: Create synthetic card data and transactions
def create_synthetic_card_data(n_cards=5, n_transactions=20):
    card_names = [f"Card {i}" for i in range(1, n_cards + 1)]
    starting_balances = [random.uniform(500, 5000) for _ in range(n_cards)]  # Initial balance for each card

    # Create a DataFrame to store the cards and their balances
    card_data = pd.DataFrame({'Card': card_names, 'Starting_Balance': starting_balances})

    # Generate transactions for each card
    transactions = []
    for card in card_names:
        # Create a random list of transaction amounts (positive = deposit, negative = withdrawal)
        transaction_amounts = [random.uniform(-500, 1000) for _ in range(n_transactions)]

        # Generate a list of dates for these transactions (within the last 30 days)
        transaction_dates = [datetime.now() - timedelta(days=random.randint(1, 30)) for _ in range(n_transactions)]
        transaction_dates.sort()  # Sort the dates chronologically

        # Combine into a DataFrame
        card_transactions = pd.DataFrame({
            'Card': card,
            'Transaction_Amount': transaction_amounts,
            'Date': transaction_dates
        })
        transactions.append(card_transactions)

    # Combine all card transactions into one DataFrame
    transactions_df = pd.concat(transactions, ignore_index=True)

    return card_data, transactions_df

