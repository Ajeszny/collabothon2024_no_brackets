import json
import os
from datetime import datetime, timedelta
import pandas as pd
import requests
from backend.ClientCredentials import ClientCredentials
from backend.api_keys import API_KEY_CURRENCY_EXCHANGE_RATE, API_KEY_FMP
import freecurrencyapi
from backend.callAPISbx import callApiSbx
from backend.getTknSndx import getTokenSbxClientCredentials

client = freecurrencyapi.Client(API_KEY_CURRENCY_EXCHANGE_RATE)


def get_historical_data_fmp(base_currencies: list, target_currency='USD', days: int = 30, interval='4hour'):
    BASE_URL = "https://financialmodelingprep.com/api/v3/historical-chart/"
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

    all_data = []  # List to store all currency exchange rate data

    for base_currency in base_currencies:
        if base_currency != target_currency:  # Avoid redundant API calls for identical base/target currencies
            # Construct the URL for the FMP API request
            url = f"{BASE_URL}{interval}/{base_currency}{target_currency}?from={start_date}&to={end_date}&apikey={API_KEY_FMP}"
            print(f"Fetching data from {url}")
            response = requests.get(url)
            data = response.json()

            if isinstance(data, list) and data:
                # Convert the JSON data to a pandas DataFrame
                df = pd.DataFrame(data)
                df['base_currency'] = base_currency
                df['target_currency'] = target_currency
                df['date'] = pd.to_datetime(df['date'])  # Convert date to datetime format
                all_data.append(df)
            else:
                print(f"No data found for {base_currency}/{target_currency}")

    # Concatenate all DataFrames
    if all_data:
        final_df = pd.concat(all_data, ignore_index=True)
        return final_df
    else:
        return pd.DataFrame()


        # Function to fetch stock performance data
def get_top_performers(n_of_performers: int = 5, filename='stock_data_top_performance.json'):
    BASE_URL = "https://financialmodelingprep.com/api/v3/"
    try:
        url = f"{BASE_URL}stock_market/gainers?apikey={API_KEY_FMP}"
        response = requests.get(url)
        data = response.json()

        # Extract the top 5 gainers
        top_performers = []
        for stock in data[:n_of_performers]:  # Get the top 5 stocks
            top_performers.append({
                'symbol': stock['symbol'],
                'company_name': stock['name'],
                'price': stock['price'],
                'changes_percentage': stock['changesPercentage']
            })

        # Create 'data' directory if it doesn't exist
        if not os.path.exists('../data'):
            os.makedirs('../data')

        # Save the data to the specified file in the 'data' directory
        file_path = os.path.join('../data', filename)
        with open(file_path, 'w') as file:
            json.dump(top_performers, file, indent=4)

        print(f"Top {n_of_performers} performers saved to {file_path}")

        return top_performers

    except Exception as e:
        print(f"Error fetching most popular stocks: {e}")
        return []


# Function to save data to a JSON file
def save_to_file(data, filename=f"stock_data{datetime.now()}.json"):
    if not os.path.exists('../data'):
        os.makedirs('../data')

    file_path = os.path.join('../data', filename)

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

    print(f"Data successfully saved to {file_path}")


def get_historical_data_multiple(stocks: list, days: int = 30):
    BASE_URL = "https://financialmodelingprep.com/api/v3/"
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

    all_data = []  # List to hold data for all stocks

    for symbol in stocks:
        url = f"{BASE_URL}historical-price-full/{symbol}?from={start_date}&to={end_date}&apikey={API_KEY_FMP}"
        response = requests.get(url)
        data = response.json()

        if 'historical' in data:
            df = pd.DataFrame(data['historical'])
            df['symbol'] = symbol  # Add a column for the stock symbol
            all_data.append(df)
        else:
            print(f"No historical data found for {symbol}")

    # Concatenate all the DataFrames into a single DataFrame
    if all_data:
        final_df = pd.concat(all_data, ignore_index=True)
        return final_df
    else:
        return pd.DataFrame()


def get_balance_history(client_id,client_secret,account_id="130471100000EUR"):
    cc = ClientCredentials(client_id, client_secret)
    token = getTokenSbxClientCredentials(cc)

    basepath = "/accounts-api/21/v1"

    # GET /accounts/{accountID}/transactions to get the transaction history for a balance trend
    response = callApiSbx(basepath, f"/accounts/{account_id}/transactions", token)

    if response.status_code == 200:
        data = json.loads(response.text)
        return data
    else:
        print(f"Error fetching balance history: {response.status_code}")
        return None