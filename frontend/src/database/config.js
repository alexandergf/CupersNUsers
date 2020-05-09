export const instance = {
  baseURL: "https://cupersnusers.vestidosaraya.com/api",
  timeout: 1000,
  headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-type': 'application/json',
      'Server': 'Apache',
      'X-Powered-By': 'PHP/7.3.17',
      'Cache-Control': 'no-cache, private',
      'X-RateLimit-Limit': '60',
      'X-RateLimit-Remaining': '59',
      'Authorization': "Bearer "+sessionStorage.getItem('token')
    },
    crossDomain: true 
};