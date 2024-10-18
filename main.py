from backend.data_api import *
from backend.plot_data import visualize_data
from backend.process_data import analyze_stock_data

if __name__ == '__main__':
    df_stock = get_historical_data('AAPL', 7)
    df_stock_analyzed = analyze_stock_data(df_stock)
    visualize_data(df_stock_analyzed)