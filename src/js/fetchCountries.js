const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountry(country) {
  return fetch(
    `${BASE_URL}/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}

export default { fetchCountry };
