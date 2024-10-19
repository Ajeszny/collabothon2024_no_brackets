import json

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from cockpit.commerzapi import create_synthetic_card_data
from cockpit.models import Email

emails = []


@api_view(['GET'])
def index(request):
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def financial_overwiew(request):
    return Response(status=status.HTTP_200_OK, data={'Username': 'praskouya'})


@api_view(['GET'])
def get_task_list(request):
    return Response(status=status.HTTP_200_OK,
                    data={'tasks': ["Eat the rich", "Eat the poor", "Eat oil", "Dunno what else google does"]})


@api_view(['GET'])
def get_emails(request):
    return Response(status=status.HTTP_200_OK, data={'emails': emails})


@api_view(['POST'])
def add_email(request):
    data = json.loads(request.body)
    emails.append(data)
    return Response(status=status.HTTP_200_OK)


transactions = [{"description": "kupno czegos tam", "account": "account: **** 1111",
                 "amount": "-7590.0", "currency": "eur", "positive": False},
                {"description": "sprzedaż wątroby kasie pietrzyk", "account": "account: **** 1111",
                 "amount": "+7590.0", "currency": "eur", "positive": True}
                ]


@api_view(['GET'])
def get_transactions(request):
    return Response(status=status.HTTP_200_OK, data=transactions)

@api_view(['POST'])
def add_transaction(request):
    data = json.loads(request.body)
    if (len(transactions) < 5):
        transactions.append(data)
    return Response(status=status.HTTP_200_OK)
