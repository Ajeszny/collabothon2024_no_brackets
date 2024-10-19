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



def generate_mail_data(n_mails=5):
    subjects = ['Unauthorized access detected', 'Password reset', 'Security update', 'Account statement', 'Newsletter']
    senders = ['security@bank.com', 'admin@bank.com', 'support@bank.com']
    categories = ['Alert', 'Warning', 'Info']  # Mail categories

    data = []
    for _ in range(n_mails):
        date = datetime.now() - timedelta(days=random.randint(1, 30))
        sender = random.choice(senders)
        subject = random.choice(subjects)
        category = random.choices(categories, weights=[0.1, 0.2, 0.7], k=1)[0]  # More chances for "Info" mails

        data.append({
            'Date': date.strftime('%Y-%m-%d'),
            'Sender': sender,
            'Subject': subject,
            'Category': category
        })

    return pd.DataFrame(data)


def simulate_stock_prices(stocks, start_date, end_date):
    date_range = pd.date_range(start=start_date, end=end_date, freq='D')
    stock_data = {}

    for stock in stocks:
        # Simulate stock prices with random fluctuations
        np.random.seed(42)  # For reproducibility
        prices = np.random.normal(loc=150, scale=20, size=len(date_range))  # Simulated price trend
        prices = np.abs(prices)  # Stock prices cannot be negative

        stock_data[stock] = pd.DataFrame({
            'date': date_range,
            'price': prices
        })

    return stock_data

