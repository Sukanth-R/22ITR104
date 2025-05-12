const BASE_URL = "/evaluation-service/stocks";

// Replace this with the actual token you were given by the server
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDI3NDA1LCJpYXQiOjE3NDcwMjcxMDUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE5NDBiMzkxLTBlMjAtNGRjOC05ODQyLWNlMjEzMTg4MTI4OCIsInN1YiI6InN1a2FudGhyLjIyaXRAa29uZ3UuZWR1In0sImVtYWlsIjoic3VrYW50aHIuMjJpdEBrb25ndS5lZHUiLCJuYW1lIjoic3VrYW50aCByIiwicm9sbE5vIjoiMjJpdHIxMDQiLCJhY2Nlc3NDb2RlIjoiam1wWmFGIiwiY2xpZW50SUQiOiJhOTQwYjM5MS0wZTIwLTRkYzgtOTg0Mi1jZTIxMzE4ODEyODgiLCJjbGllZW50U2VjcmV0IjoiS0RVYUVERU1IYW1XUVVuY0ZJbn0.PcnV4ic5_Js6_WCQh4OZ4jXqMCWafu-c4CmgpuURDE0";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

export async function getStocks() {
  const res = await fetch(BASE_URL, { headers });
  if (!res.ok) throw new Error("Failed to fetch stocks");
  return res.json();
}

export async function getStockHistory(ticker, minutes) {
  const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch history for ${ticker}`);
  return res.json();
}
