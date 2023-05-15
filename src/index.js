import './css/styles.css';
import _ from 'lodash.debounce';

const input = document.querySelector('#search-box');
console.log(input.value);

const DEBOUNCE_DELAY = 300;
function fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name`
    );
}


function onInputText(e) {
    fetchCountries(e.target.value).then(c => c.json()).then(console.log)
}

input.addEventListener('input', _(onInputText, DEBOUNCE_DELAY));