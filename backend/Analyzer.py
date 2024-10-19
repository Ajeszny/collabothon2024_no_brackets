import pandas as pd
import numpy as np
import yfinance as yf
from datetime import datetime, timedelta
import random
from typing import Tuple, List, Dict
import logging


class FinancialAdvisor:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        logging.basicConfig(level=logging.INFO)

    def create_synthetic_card_data(self, n_cards=5, n_transactions=20) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Generate synthetic credit card data"""
        card_names = [f"Card {i}" for i in range(1, n_cards + 1)]
        starting_balances = [random.uniform(500, 5000) for _ in range(n_cards)]

        card_data = pd.DataFrame({'Card': card_names, 'Starting_Balance': starting_balances})
        transaction_types = ['Investment', 'Saving', 'Simple Transaction', 'Purchase', 'Refund']

        transactions = []
        for card in card_names:
            transaction_amounts = [random.uniform(-500, 1000) for _ in range(n_transactions)]
            transaction_dates = [datetime.now() - timedelta(days=random.randint(1, 30))
                                 for _ in range(n_transactions)]
            transaction_dates.sort()
            transaction_type = [random.choice(transaction_types) for _ in range(n_transactions)]

            card_transactions = pd.DataFrame({
                'Card': card,
                'Transaction_Amount': transaction_amounts,
                'Date': transaction_dates,
                'Transaction_Type': transaction_type
            })
            transactions.append(card_transactions)

        transactions_df = pd.concat(transactions, ignore_index=True)
        return card_data, transactions_df

    def analyze_spending_patterns(self, transactions_df: pd.DataFrame) -> Dict:
        """Analyze spending patterns and savings potential"""
        spending_analysis = {
            'total_transactions': len(transactions_df),
            'avg_transaction': transactions_df['Transaction_Amount'].mean(),
            'monthly_spending': transactions_df[transactions_df['Transaction_Amount'] < 0][
                                    'Transaction_Amount'].sum() * -1,
            'monthly_income': transactions_df[transactions_df['Transaction_Amount'] > 0]['Transaction_Amount'].sum(),
            'transaction_types': transactions_df.groupby('Transaction_Type')['Transaction_Amount'].agg(
                ['count', 'sum']),
            'savings_ratio': 0.0
        }

        if spending_analysis['monthly_income'] != 0:
            spending_analysis['savings_ratio'] = (
                    (spending_analysis['monthly_income'] + spending_analysis['monthly_spending'])
                    / spending_analysis['monthly_income']
            )

        return spending_analysis

    def get_stock_recommendations(self, available_funds: float) -> pd.DataFrame:
        """Get stock recommendations based on performance metrics"""
        # List of popular stocks to analyze
        symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSM', 'V', 'WMT', 'JPM']

        stock_data = []
        for symbol in symbols:
            try:
                stock = yf.Ticker(symbol)
                hist = stock.history(period="1mo")

                # Calculate metrics
                returns = hist['Close'].pct_change()
                metrics = {
                    'symbol': symbol,
                    'current_price': hist['Close'].iloc[-1],
                    'monthly_return': ((hist['Close'].iloc[-1] / hist['Close'].iloc[0]) - 1) * 100,
                    'volatility': returns.std() * np.sqrt(252) * 100,  # Annualized volatility
                    'avg_volume': hist['Volume'].mean(),
                    'risk_score': 0  # Will be calculated below
                }

                # Calculate risk score (lower is better)
                metrics['risk_score'] = metrics['volatility'] / metrics['monthly_return'] if metrics[
                                                                                                 'monthly_return'] > 0 else 999

                stock_data.append(metrics)

            except Exception as e:
                self.logger.error(f"Error analyzing {symbol}: {str(e)}")

        stock_df = pd.DataFrame(stock_data)
        return stock_df.sort_values('risk_score')

    def generate_investment_recommendations(self, card_data: pd.DataFrame,
                                            transactions_df: pd.DataFrame) -> Dict:
        """Generate comprehensive investment recommendations"""
        # Analyze current financial state
        current_balances = {}
        for card in card_data['Card'].unique():
            card_transactions = transactions_df[transactions_df['Card'] == card]
            starting_balance = card_data[card_data['Card'] == card]['Starting_Balance'].iloc[0]
            current_balance = starting_balance + card_transactions['Transaction_Amount'].sum()
            current_balances[card] = current_balance

        total_balance = sum(current_balances.values())
        spending_patterns = self.analyze_spending_patterns(transactions_df)

        # Calculate investment capacity
        monthly_expenses = -transactions_df[transactions_df['Transaction_Amount'] < 0]['Transaction_Amount'].sum()
        monthly_income = transactions_df[transactions_df['Transaction_Amount'] > 0]['Transaction_Amount'].sum()

        # Emergency fund (3 months of expenses)
        emergency_fund = monthly_expenses * 3

        # Investment capacity
        investable_amount = max(0, total_balance - emergency_fund)

        # Get stock recommendations
        stock_recommendations = self.get_stock_recommendations(investable_amount)

        # Generate recommendations
        recommendations = {
            'financial_summary': {
                'total_balance': total_balance,
                'monthly_income': monthly_income,
                'monthly_expenses': monthly_expenses,
                'emergency_fund_needed': emergency_fund,
                'investable_amount': investable_amount
            },
            'recommendations': {
                'emergency_fund': f"Maintain ${emergency_fund:.2f} as emergency fund",
                'investment_allocation': self.calculate_investment_allocation(investable_amount),
                'top_stock_picks': stock_recommendations.head(3)[['symbol', 'monthly_return', 'risk_score']].to_dict(
                    'records')
            },
            'savings_tips': self.generate_savings_tips(spending_patterns),
            'risk_assessment': self.assess_risk_profile(transactions_df)
        }

        return recommendations

    def calculate_investment_allocation(self, investable_amount: float) -> Dict:
        """Calculate recommended investment allocation"""
        if investable_amount <= 0:
            return {"message": "Focus on building emergency fund first"}

        return {
            'stocks': {
                'percentage': 60,
                'amount': investable_amount * 0.6,
                'description': "Diversified across recommended stocks"
            },
            'bonds': {
                'percentage': 30,
                'amount': investable_amount * 0.3,
                'description': "Government and corporate bonds for stability"
            },
            'cash': {
                'percentage': 10,
                'amount': investable_amount * 0.1,
                'description': "Keep as cash for opportunities"
            }
        }

    def generate_savings_tips(self, spending_patterns: Dict) -> List[str]:
        """Generate personalized savings tips"""
        tips = []

        if spending_patterns['savings_ratio'] < 0.2:
            tips.append("Consider implementing the 50/30/20 budgeting rule")
            tips.append("Track daily expenses to identify potential savings")

        if spending_patterns['avg_transaction'] > 100:
            tips.append("Look for opportunities to bulk purchase common items")

        # Add general tips
        tips.extend([
            "Set up automatic transfers to savings on paydays",
            "Review and cancel unused subscriptions",
            "Consider cash-back credit cards for regular purchases"
        ])

        return tips

    def assess_risk_profile(self, transactions_df: pd.DataFrame) -> str:
        """Assess user's risk profile based on transaction patterns"""
        investment_transactions = transactions_df[
            transactions_df['Transaction_Type'] == 'Investment'
            ]['Transaction_Amount']

        if len(investment_transactions) == 0:
            return "Conservative - No investment history found"

        avg_investment = investment_transactions.mean()
        investment_frequency = len(investment_transactions)

        if avg_investment > 500 and investment_frequency > 5:
            return "Aggressive - Regular large investments"
        elif avg_investment > 200 or investment_frequency > 3:
            return "Moderate - Regular medium investments"
        else:
            return "Conservative - Infrequent small investments"




