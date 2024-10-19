import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
from Analyzer import FinancialAdvisor

# Page configuration
st.set_page_config(
    page_title="Financial Dashboard",
    page_icon="💰",
    layout="wide"
)

# Custom CSS
st.markdown("""
    <style>
    .stProgress > div > div > div > div {
        background-color: #4CAF50;
    }
    .big-font {
        font-size: 24px !important;
    }
    .medium-font {
        font-size: 18px !important;
    }
    </style>
    """, unsafe_allow_html=True)


class FinancialDashboard:
    def __init__(self):
        self.advisor = FinancialAdvisor()

    def run(self):
        st.title("💰 Interactive Financial Dashboard")

        # Sidebar controls
        with st.sidebar:
            st.header("Dashboard Settings")
            n_cards = st.slider("Number of Cards", 1, 10, 5)
            n_transactions = st.slider("Transactions per Card", 10, 50, 20)

            st.header("Visualization Settings")
            chart_theme = st.selectbox(
                "Chart Theme",
                ["plotly", "plotly_dark", "plotly_white", "ggplot2"]
            )

            if st.button("Generate New Data"):
                st.session_state.card_data, st.session_state.transactions_df = \
                    self.advisor.create_synthetic_card_data(n_cards, n_transactions)
                st.session_state.recommendations = \
                    self.advisor.generate_investment_recommendations(
                        st.session_state.card_data,
                        st.session_state.transactions_df
                    )

        # Initialize session state if needed
        if 'card_data' not in st.session_state:
            st.session_state.card_data, st.session_state.transactions_df = \
                self.advisor.create_synthetic_card_data(n_cards, n_transactions)
            st.session_state.recommendations = \
                self.advisor.generate_investment_recommendations(
                    st.session_state.card_data,
                    st.session_state.transactions_df
                )

        # Main dashboard layout
        col1, col2 = st.columns(2)

        with col1:
            self.display_financial_summary()

        with col2:
            self.display_investment_allocation()

        # Transactions Analysis
        st.header("📊 Transaction Analysis")
        tab1, tab2, tab3 = st.tabs(["Spending Patterns", "Transaction Timeline", "Card Analysis"])

        with tab1:
            self.display_spending_patterns()

        with tab2:
            self.display_transaction_timeline()

        with tab3:
            self.display_card_analysis()

        # Investment Recommendations
        st.header("💡 Investment Recommendations")
        self.display_investment_recommendations()

    def display_financial_summary(self):
        st.subheader("Financial Overview")
        summary = st.session_state.recommendations['financial_summary']

        cols = st.columns(3)
        with cols[0]:
            st.metric("Total Balance", f"${summary['total_balance']:,.2f}")
        with cols[1]:
            st.metric("Monthly Income", f"${summary['monthly_income']:,.2f}")
        with cols[2]:
            st.metric("Monthly Expenses", f"${summary['monthly_expenses']:,.2f}")

        # Emergency Fund Progress
        ef_ratio = min(summary['total_balance'] / summary['emergency_fund_needed'], 1)
        st.markdown("### Emergency Fund Progress")
        st.progress(ef_ratio)
        st.text(f"{ef_ratio:.1%} of target (${summary['emergency_fund_needed']:,.2f})")

    def display_investment_allocation(self):
        st.subheader("Recommended Investment Allocation")
        allocation = st.session_state.recommendations['recommendations']['investment_allocation']

        if isinstance(allocation, dict) and 'message' not in allocation:
            fig = go.Figure(data=[go.Pie(
                labels=list(allocation.keys()),
                values=[item['percentage'] for item in allocation.values()],
                hole=.3
            )])
            fig.update_layout(height=300)
            st.plotly_chart(fig, use_container_width=True)

    def display_spending_patterns(self):
        df = st.session_state.transactions_df

        # Transaction type distribution
        fig = px.bar(
            df.groupby('Transaction_Type')['Transaction_Amount'].sum().reset_index(),
            x='Transaction_Type',
            y='Transaction_Amount',
            title='Transaction Distribution by Type'
        )
        st.plotly_chart(fig, use_container_width=True)

    def display_transaction_timeline(self):
        df = st.session_state.transactions_df

        fig = px.scatter(
            df,
            x='Date',
            y='Transaction_Amount',
            color='Card',
            size=abs(df['Transaction_Amount']),
            title='Transaction Timeline'
        )
        st.plotly_chart(fig, use_container_width=True)

    def display_card_analysis(self):
        df = st.session_state.transactions_df
        selected_card = st.selectbox("Select Card", df['Card'].unique())

        card_data = df[df['Card'] == selected_card]

        fig = px.box(
            card_data,
            x='Transaction_Type',
            y='Transaction_Amount',
            title=f'Transaction Distribution for {selected_card}'
        )
        st.plotly_chart(fig, use_container_width=True)

    def display_investment_recommendations(self):
        recommendations = st.session_state.recommendations['recommendations']

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Top Stock Picks")
            st.dataframe(pd.DataFrame(recommendations['top_stock_picks']))

        with col2:
            st.subheader("Savings Tips")
            for tip in st.session_state.recommendations['savings_tips']:
                st.markdown(f"• {tip}")


dashboard = FinancialDashboard()
dashboard.run()
