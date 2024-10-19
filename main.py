from backend.Analyzer import FinancialAdvisor

if __name__ == '__main__':

    # Initialize advisor
    advisor = FinancialAdvisor()

    # Generate synthetic data
    card_data, transactions_df = advisor.create_synthetic_card_data()

    # Generate recommendations
    recommendations = advisor.generate_investment_recommendations(card_data, transactions_df)

    # Print recommendations in a formatted way
    print("\nFinancial Analysis and Recommendations")
    print("=====================================")

    print("\nFinancial Summary:")
    for key, value in recommendations['financial_summary'].items():
        print(f"{key.replace('_', ' ').title()}: ${value:,.2f}")

    print("\nInvestment Recommendations:")
    if isinstance(recommendations['recommendations']['investment_allocation'], dict):
        if 'message' in recommendations['recommendations']['investment_allocation']:
            print(recommendations['recommendations']['investment_allocation']['message'])
        else:
            for asset, details in recommendations['recommendations']['investment_allocation'].items():
                print(f"\n{asset.title()}:")
                print(f"  Percentage: {details['percentage']}%")
                print(f"  Amount: ${details['amount']:,.2f}")
                print(f"  Strategy: {details['description']}")

    print("\nTop Stock Picks:")
    for stock in recommendations['recommendations']['top_stock_picks']:
        print(f"Symbol: {stock['symbol']}")
        print(f"Monthly Return: {stock['monthly_return']:.2f}%")
        print(f"Risk Score: {stock['risk_score']:.2f}")
        print()

    print("Savings Tips:")
    for tip in recommendations['savings_tips']:
        print(f"- {tip}")

    print(f"\nRisk Profile Assessment:")
    print(recommendations['risk_assessment'])



# BASIC DATA ABOUT CARDS
# card_data, transactions_df = create_synthetic_card_data()
    #
    # # Calculate balance and summary for each card
    # balance_summary = calculate_card_balance_and_transaction_type_summary(card_data, transactions_df)
    #
    # # Display the results
    # for card_info in balance_summary:
    #     print(f"Card: {card_info['Card']}")
    #     print(f"Starting Balance: {card_info['Starting_Balance']:.2f}")
    #     print(f"Current Balance: {card_info['Current_Balance']:.2f}")
    #     print("Transaction Summary by Type:")
    #     print(card_info['Transaction_Summary'])
    #     print("\n")

# Synthetic top investment ROI
# stocks = ['NVIDIA', 'Apple', 'Microsoft']
#     end_date = datetime.now()
#     start_date = end_date - timedelta(days=90)  # Last 3 months
#
#     # Simulate stock prices
#     stock_prices = simulate_stock_prices(stocks, start_date, end_date)
#
#     # Calculate ROI for each stock
#     roi_df = calculate_roi(stock_prices)
#
#     # Rank stocks by ROI for each month
#     roi_df['rank'] = roi_df.groupby('month')['roi'].rank(ascending=False)
#
#     # Display the ROI DataFrame
#     print(roi_df)
#
#     # Save to CSV file
#     roi_df.to_csv('investment_roi.csv', index=False)
#     print("ROI data saved to 'investment_roi.csv'")



# STOCKS HISTORY
# stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']
# stock_data = get_historical_data_multiple(stocks, 30)
# print(stock_data.head())
# stock_data.to_csv("stock_data_30days.csv")


# CURRENCIES
# base_currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'BRL']
#
#     # Get historical data
#     historical_data = get_historical_data_fmp(base_currencies)
#
#     # Save the DataFrame to a CSV file
#     if not historical_data.empty:
#         output_file = "data/currency_exchange_30_days.csv"
#         historical_data.to_csv(output_file, index=False)
#         print(f"Data successfully saved to {output_file}")
#     else:
#         print("No data available for the requested currencies.")
