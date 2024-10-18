from backend.plot_data import plot_donut_chart_plotly, plot_transaction_history_plotly
from backend.process_data import calculate_final_balances
from backend.synthetic_data import create_synthetic_card_data

if __name__ == '__main__':
    card_data, transactions_data = create_synthetic_card_data()
    print(card_data)
    print(transactions_data.head())
    updated_card_data = calculate_final_balances(card_data, transactions_data)
    print(updated_card_data)
    plot_donut_chart_plotly(updated_card_data)
    plot_transaction_history_plotly(transactions_data)
