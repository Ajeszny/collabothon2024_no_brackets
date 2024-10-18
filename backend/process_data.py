import pandas as pd


def analyze_stock_data_multiple(stock_data: dict):
    analyzed_data = {}

    for symbol, df in stock_data.items():
        df['daily_return'] = df['close'].pct_change()
        df['SMA_5'] = df['close'].rolling(window=5).mean()
        df['SMA_20'] = df['close'].rolling(window=20).mean()
        df['volatility'] = df['daily_return'].rolling(window=5).std()
        analyzed_data[symbol] = df

    return analyzed_data


def process_balance_history(balance_history):
    transactions = balance_history['transactions']
    dates = [tx['bookingDate'] for tx in transactions]
    balances = [tx['balanceAfterTransaction'] for tx in transactions]

    # Create a DataFrame
    df = pd.DataFrame({'Date': pd.to_datetime(dates), 'Balance': balances})
    df = df.sort_values(by='Date')  # Sort by date
    return df


# Example recommendation function based on stock trend
def recommend_investment(balance_df, analyzed_stock_data):
    # Simple logic: Recommend stocks with positive trends when balance is positive
    latest_balance = balance_df.iloc[-1]['Balance']  # Get the latest balance
    if latest_balance < 0:
        print("No investments recommended. Negative balance detected.")
        return

    # Calculate stock performance trends (we can use SMA or daily return trends)
    recommendations = []
    for symbol, df in analyzed_stock_data.items():
        trend = df['SMA_5'].iloc[-1] - df['SMA_20'].iloc[-1]  # Check short-term trend

        if trend > 0:  # Recommend stocks with positive short-term trends
            recommendations.append({
                'symbol': symbol,
                'trend': 'positive',
                'current_price': df['close'].iloc[-1]
            })

    if recommendations:
        print("Investment recommendations:")
        for rec in recommendations:
            print(f"Stock: {rec['symbol']}, Current Price: {rec['current_price']} EUR, Trend: {rec['trend']}")
    else:
        print("No positive trends in stocks found.")


# Step 2: Calculate final balances based on transactions
def calculate_final_balances(card_data, transactions_data):
    # Group the transactions by card and sum them to get the total transactions for each card
    transaction_totals = transactions_data.groupby('Card')['Transaction_Amount'].sum().reset_index()

    # Merge with the original card data to calculate the final balance
    card_data = card_data.merge(transaction_totals, on='Card', how='left')

    # Calculate the final balance: Starting_Balance + Total_Transactions
    card_data['Final_Balance'] = card_data['Starting_Balance'] + card_data['Transaction_Amount']

    return card_data




