from fastapi import FastAPI
from nltk import sent_tokenize, word_tokenize, WordNetLemmatizer
from openai import OpenAI

app = FastAPI()

@app.post("/recette")
async def recette(requete: str) -> dict:
  # Prétraitement de la requête
  tokens = word_tokenize(requete.lower())
  tokens = [token for token in tokens if token not in stopwords]
  tokens = [WordNetLemmatizer().lemmatize(token) for token in tokens]
  requete = "should be Tunisian recipe " + " ".join(tokens)

  # Appel à OpenAI
  response = await OpenAI.engine().create(engine="davinci", prompt=requete)

  # Traitement de la réponse
  response = json.loads(response)
  response = response["choices"][0]["text"]

  # Retour de la réponse
  return {"recette": response}