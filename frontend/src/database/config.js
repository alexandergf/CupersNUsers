export const instance = {
  baseURL: "https://cupersnusers.vestidosaraya.com/api",
  timeout: 3000,
  headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer "+sessionStorage.getItem('token')
    },
    crossDomain: true 
};