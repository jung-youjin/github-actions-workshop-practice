import requests
import sys

joke_url = "https://geek-jokes.sameerkumar.website/api?format=json"
get_joke = requests.get(joke_url)
joke_obj = get_joke.json()

joke_text = joke_obj["text"]

print(joke_text)
print(f"::set-output name=joke::{joke_text}")