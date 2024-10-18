import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px


def visualize_data(df):
    # Convert 'date' column to datetime
    df['date'] = pd.to_datetime(df['date'])

    # Seaborn Line Plot (Closing Price and Moving Average)
    sns.set(style='whitegrid')
    plt.figure(figsize=(10, 6))
    sns.lineplot(x='date', y='close', data=df, label='Closing Price')
    sns.lineplot(x='date', y='SMA_3', data=df, label='3-Day SMA', color='orange')
    plt.title('Stock Price with 3-Day Moving Average', fontsize=16)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Price (USD)', fontsize=12)
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.show()

    # Plotly Interactive Line Plot
    fig = px.line(df, x='date', y=['close', 'SMA_3'],
                  labels={'value': 'Price (USD)', 'variable': 'Legend'},
                  title='Stock Price with 3-Day Moving Average')
    fig.update_layout(legend_title_text='Price vs Moving Average')
    fig.show()
