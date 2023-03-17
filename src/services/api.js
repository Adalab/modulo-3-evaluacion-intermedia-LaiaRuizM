const getSentenceFromApi = () => {
  // We call the API
  return fetch(
    "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
  )
    .then((response) => response.json())
    .then((response) => {
      // When API responses we can clean the data
      return response;
    });
};

export default getSentenceFromApi;
