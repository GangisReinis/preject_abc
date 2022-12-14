import requests
import json


def get_ticker_data(interval: str, ticker: str) -> list:
    URL = f"https://api.binance.com/api/v3/klines?symbol={ticker}&interval={interval}"
    try:
        response = requests.get(URL)

    except:
        # in case wrong ticker or interval used
        return False

    return json.loads(response.content)
