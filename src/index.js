import './css/styles.css';
import _ from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
countryList.style.listStyle = "none";

const DEBOUNCE_DELAY = 300;


function onInputText(e) {
  if (e.target.value.length === 0) {
    return countryList.innerHTML = '';
  }

  API.fetchCountries(e.target.value.trim())
    .then(countries => renderCountriesList(countries))
    .catch(error => console.log(error));
}


function renderCountriesList(countries) {
  countryList.innerHTML = "";
  if (countries.length > 10) {
    return Notiflix.Notify.info(
      `"Too many matches found. Please enter a more specific name."`
    );
  }
  const markup = countries
    .map(country => {
        return `<li>
        <div style="display:flex"><div style="display:block"><img src="${country.flags.svg}" alt="flag" width = 40></div>
        <h1 style="font-size:20px", "line-height:1.5">${country.name.official}</h1></divstyle=>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);

  const markupInfo = countries.map(country => {
    if (countries.length === 1) {
       return `<li>
        <p>Capital: ${country.capital}</p>
      </li>
      <li>
        <p>Population: ${country.population}</p>
      </li>
      <li>
        <p>Languages: ${Object.values(country.languages)}</p>
      </li>`;
    }
  }).join('');
   countryInfo.insertAdjacentHTML('beforeend', markupInfo);
}

input.addEventListener('input', _(onInputText, DEBOUNCE_DELAY));