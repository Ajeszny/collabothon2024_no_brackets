def analyze_stock_data(df):
    # Calculate daily returns
    df['daily_return'] = df['close'].pct_change()

    # Calculate 3-day simple moving average (SMA)
    df['SMA_3'] = df['close'].rolling(window=3).mean()

    return df