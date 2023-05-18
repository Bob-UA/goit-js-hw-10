import './css/styles.css';
import _ from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
countryList.style.listStyle = 'none';
countryList.style.paddingLeft = '0';


const countryInfo = document.querySelector('.country-info');
countryInfo.style.listStyle = 'none';

const DEBOUNCE_DELAY = 300;


function onInputText(e) {
  if (!e.target.value.trim()) {
    return (countryListReset());
  }

  API.fetchCountries(e.target.value.trim())
    .then(countries => renderCountriesList(countries))
    .catch(error => console.log(error), countryListReset());
}
function countryListReset() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountriesList(countries) {
  countryListReset();
  
  if (countries.length > 10) {
    return Notiflix.Notify.info(
      `"Too many matches found. Please enter a more specific name."`
    );
  }
  const markup = countries
    .map(country => {
        return `<li>
        <div style="display:flex; align-items:center"><div style="display:inline-flex; align-items:center"><img src="${country.flags.svg}" alt="flag" width = 40></div>
        <h1 class="title"; style="font-size:20px; padding-left:10px", "line-height:1.5">${country.name.official}</h1></divstyle=>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);

  const markupInfo = countries.map(country => {
    if (countries.length === 1) {
      const title = document.querySelector('.title');
      title.style.fontSize = '40px';
       return `<li>
        <p><b>Capital:</b> ${country.capital}</p>
      </li>
      <li>
        <p><b>Population:</b> ${country.population}</p>
      </li>
      <li>
        <p><b>Languages:</b> ${Object.values(country.languages)}</p>
      </li>`;
    }
  }).join('');
   countryInfo.insertAdjacentHTML('beforeend', markupInfo);
}

input.addEventListener('input', _(onInputText, DEBOUNCE_DELAY));