from ClientCredentials import ClientCredentials
from callAPISbx import callApiSbx
from data_api import *
from api_keys import *
from getTknSndx import getTokenSbxClientCredentials

if __name__ == '__main__':
    cc = ClientCredentials(API_CLIENT_ID, API_CLIENT_SECRET)

    token = getTokenSbxClientCredentials(cc)
    print(token + "\n")

    # **************ACCOUNTS FOREIGN UNITS*******************

    basepath = "/accounts-api/21/v1"

    # GET /info
    callApiSbx(basepath, "/info", token)

    # GET /accounts/accountID
    response = callApiSbx(basepath, "/accounts", token, query="130471100000EUR")
    data = json.loads(response.text)
    print(data)

    # **************CORPORATE PAYMENTS*******************

    basepath = "/corporate-payments-api/1/v1/bulk-payments"

    # GET /heartbeat
    callApiSbx(basepath, "/heartbeat", token)

    # GET /messages
    callApiSbx(basepath, "/messages", token)

    # **************CUSTOMERS*******************

    basepath = "/customers-api/v2"

    # GET /heartbeat
    callApiSbx(basepath, "/healthcheck", token)

    # GET /messages
    callApiSbx(basepath, "/customers", token)
