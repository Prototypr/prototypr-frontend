export default async function fetchJson(
    input,
    init
  ) {
    const response = await fetch(input, init)
  
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json()
  
    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      return data
    }

    throw response.statusText;
  
  }