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


def calculate_roi(stock_data):
    roi_data = []

    for stock, df in stock_data.items():
        # Group data by month
        df['month'] = df['date'].dt.to_period('M')
        monthly_data = df.groupby('month').agg({
            'price': ['first', 'last']
        }).reset_index()

        monthly_data.columns = ['month', 'start_price', 'end_price']
        monthly_data['roi'] = (monthly_data['end_price'] - monthly_data['start_price']) / monthly_data[
            'start_price'] * 100

        for _, row in monthly_data.iterrows():
            roi_data.append({
                'stock': stock,
                'month': str(row['month']),
                'start_price': row['start_price'],
                'end_price': row['end_price'],
                'roi': row['roi']
            })

    return pd.DataFrame(roi_data)


def calculate_card_balance_and_transaction_type_summary(card_data, transactions_df):
    # Create an empty list to store the results
    result = []

    # Loop through each card
    for card in card_data['Card']:
        # Filter transactions for the current card
        card_transactions = transactions_df[transactions_df['Card'] == card]

        # Calculate total balance by summing up the transactions
        total_balance = card_data[card_data['Card'] == card]['Starting_Balance'].values[0] + card_transactions['Transaction_Amount'].sum()

        # Group the transactions by type and calculate sums for money spent (negative) and earned (positive)
        transaction_summary = card_transactions.groupby('Transaction_Type')['Transaction_Amount'].agg(
            total_spent=lambda x: x[x < 0].sum(),  # Sum of negative values (money spent)
            total_earned=lambda x: x[x > 0].sum()  # Sum of positive values (money earned)
        ).reset_index()

        # Fill NaN values with 0 (in case there were no positive or negative transactions for some types)
        transaction_summary['total_spent'].fillna(0, inplace=True)
        transaction_summary['total_earned'].fillna(0, inplace=True)

        # Add the card and balance information
        summary = {
            'Card': card,
            'Starting_Balance': card_data[card_data['Card'] == card]['Starting_Balance'].values[0],
            'Current_Balance': total_balance,
            'Transaction_Summary': transaction_summary
        }
        result.append(summary)

    return result


