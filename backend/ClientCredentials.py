class ClientCredentials:
    client_id = ""
    client_secret = ""

    def __init__(self, client_id, client_secret):
        self.client_secret = client_secret
        self.client_id = client_id

    def getClientId(self):
        return str(self.client_id)

    def getClientSecret(self):
        return str(self.client_secret)
