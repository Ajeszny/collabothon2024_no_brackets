import json
import os
from datetime import datetime
import requests
from api_keys import API_KEY_CURRENCY_EXCHANGE_RATE, API_KEY_FMP
import freecurrencyapi

client = freecurrencyapi.Client(API_KEY_CURRENCY_EXCHANGE_RATE)


def get_exchange_rates(base_currency: str = 'USD'):
    result = client.latest(base_currency=base_currency)
    file_path = os.path.join('data/currency_exchange', f'exchange_rates{base_currency}.json')

    with open(file_path, 'w') as file:
        json.dump(result, file, indent=4)

    print(f"Exchange rates data saved successfully to {file_path}")
    return result


# Function to fetch stock performance data
def get_top_performers(n_of_performers: int = 5, filename='stock_data.json'):
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
        if not os.path.exists('data'):
            os.makedirs('data')

        # Save the data to the specified file in the 'data' directory
        file_path = os.path.join('data', filename)
        with open(file_path, 'w') as file:
            json.dump(top_performers, file, indent=4)

        print(f"Top {n_of_performers} performers saved to {file_path}")

        return top_performers

    except Exception as e:
        print(f"Error fetching most popular stocks: {e}")
        return []


def get_biggest_companies():
    BASE_URL = "https://financialmodelingprep.com/api/v3/"
    try:
        url = f"{BASE_URL}stock_market/market-capitalization?apikey={API_KEY_FMP}"
        response = requests.get(url)
        data = response.json()

        # Extract the top 5 companies by market capitalization
        biggest_companies = []
        for company in data[:5]:  # Get the top 5 companies
            biggest_companies.append({
                'symbol': company['symbol'],
                'company_name': company['name'],
                'market_cap': company['marketCap']
            })
        return biggest_companies

    except Exception as e:
        print(f"Error fetching biggest companies: {e}")
        return []


# Function to save data to a JSON file
def save_to_file(data, filename=f"stock_data{datetime.now()}.json"):
    if not os.path.exists('data'):
        os.makedirs('data')

    file_path = os.path.join('data', filename)

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

    print(f"Data successfully saved to {file_path}")
