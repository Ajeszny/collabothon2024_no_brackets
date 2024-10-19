import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go

def plot_stock_prices(analyzed_data):
    sns.set(style='whitegrid')
    for symbol, df in analyzed_data.items():
        plt.figure(figsize=(10, 6))
        sns.lineplot(x='date', y='close', data=df, label='Closing Price')
        sns.lineplot(x='date', y='SMA_5', data=df, label='5-Day SMA', color='orange')
        sns.lineplot(x='date', y='SMA_20', data=df, label='20-Day SMA', color='green')
        plt.title(f'{symbol} Stock Price with 5-Day and 20-Day Moving Averages', fontsize=16)
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Price (USD)', fontsize=12)
        plt.xticks(rotation=45)
        plt.legend()
        plt.tight_layout()
        plt.show()


def plot_correlation_heatmap(correlation_matrix):
    fig = px.imshow(correlation_matrix, labels=dict(color="Correlation"),
                    x=correlation_matrix.columns, y=correlation_matrix.index,
                    color_continuous_scale='RdBu_r', zmin=-1, zmax=1,
                    title="Correlation Heatmap of Stock Daily Returns")
    fig.update_layout(xaxis_title="Stocks", yaxis_title="Stocks")
    fig.show()


# Plotly volatility plot
def plot_volatility(analyzed_data):
    plot_data = pd.concat(
        [df[['date', 'volatility']].assign(stock=symbol) for symbol, df in analyzed_data.items()],
        axis=0
    )
    fig = px.line(plot_data, x='date', y='volatility', color='stock',
                  title='Stock Volatility (Rolling 5-Day Standard Deviation)',
                  labels={'volatility': 'Volatility (Std Dev)', 'date': 'Date'})
    fig.update_layout(legend_title_text='Stock')
    fig.show()


def plot_balance_history(df):
    plt.figure(figsize=(10, 6))
    sns.set(style='whitegrid')

    # Plot the area chart with color based on whether balance is positive or negative
    df['positive'] = df['Balance'] >= 0
    sns.lineplot(x='Date', y='Balance', data=df, color='blue', label='Balance')
    plt.fill_between(df['Date'], df['Balance'], color='blue', alpha=0.3, where=df['positive'])
    plt.fill_between(df['Date'], df['Balance'], color='red', alpha=0.3, where=~df['positive'])

    plt.title('Balance History', fontsize=16)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Balance (EUR)', fontsize=12)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()


def plot_donut_chart_plotly(card_data):
    fig = go.Figure()

    # Add donut chart
    fig.add_trace(go.Pie(
        labels=card_data['Card'],
        values=card_data['Final_Balance'],
        hole=0.5,  # This makes it a donut chart
        textinfo='label+percent',
        hoverinfo='label+value+percent',
        marker=dict(line=dict(color='#000000', width=2))
    ))

    # Add total balance at the center
    total_balance = card_data['Final_Balance'].sum()
    fig.update_layout(
        title_text="Card Balances Donut Chart",
        annotations=[dict(text=f"Total<br>€{total_balance:,.2f}", x=0.5, y=0.5, font_size=20, showarrow=False)]
    )

    fig.show()


# Plot transaction history for each card as a time series
def plot_transaction_history_plotly(transactions_data):
    # Add cumulative balance for each card
    transactions_data['Cumulative_Balance'] = transactions_data.groupby('Card')['Transaction_Amount'].cumsum()

    # Create time series plot
    fig = px.line(transactions_data, x='Date', y='Cumulative_Balance', color='Card', title="Card Transaction History",
                  labels={'Cumulative_Balance': 'Cumulative Balance (€)', 'Date': 'Transaction Date'})

    fig.update_layout(xaxis_title='Date', yaxis_title='Balance (€)', hovermode='x unified')
    fig.show()

def plot_transactions_table(transactions_df):
    fig = go.Figure(data=[go.Table(
        header=dict(values=list(transactions_df.columns),
                    fill_color='paleturquoise',
                    align='left'),
        cells=dict(values=[transactions_df[col] for col in transactions_df.columns],
                   fill_color=[['lightgray'] * len(transactions_df['Date'])],
                   font=dict(color=[['green' if float(x.split()[0]) > 0 else 'red' for x in transactions_df['Amount']]]))
    )])

    fig.update_layout(title_text="Transactions Table")
    fig.show()


def plot_mail_table(mail_df):
    # Map colors based on category
    category_colors = {'Alert': 'red', 'Warning': 'orange', 'Info': 'green'}

    fig = go.Figure(data=[go.Table(
        header=dict(values=list(mail_df.columns),
                    fill_color='lightblue',
                    align='left'),
        cells=dict(values=[mail_df[col] for col in mail_df.columns],
                   fill_color=[['lightgray'] * len(mail_df['Date'])],
                   font=dict(color=[category_colors.get(cat, 'black') for cat in mail_df['Category']])
        )
    )])

    fig.update_layout(title_text="Email Notifications Table")
    fig.show()