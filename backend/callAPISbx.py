import requests


def callApiSbx(basepath, endpoint, token, method="GET", query="", CAIDRequired=False, CAID="", printBody=False):
    url = "https://api-sandbox.commerzbank.com" + basepath + endpoint
    if query != "":
        url = url + "/" + query
    print(url)
    headers = {
        'Authorization': 'Bearer ' + token
    }
    if CAIDRequired:
        headers.update({
            'Coba-ActivityID': CAID
        })
    response = requests.request(method, url, headers=headers)
    print('API request outcome: ' + str(response.status_code))
    if printBody:
        print(response.text)

    return response