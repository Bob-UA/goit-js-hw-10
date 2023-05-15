import './css/styles.css';
import _ from 'lodash.debounce';

const input = document.querySelector('#search-box');
console.log(input.value);

const DEBOUNCE_DELAY = 300;
function fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    );
}


function onInputText(e) {
  fetchCountries(e.target.value)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(console.log);
}

function renderCountriesList(countries) {
  const markup = countries.map((country) => {
  //  return `<li>
  //         <p><b>Name</b>: ${}</p>
  //         <p><b>Population</b>: ${}</p>
  //         <p><b>Flag</b>: ${}</p>
  //       </li>`;
})  
}

input.addEventListener('input', _(onInputText, DEBOUNCE_DELAY));