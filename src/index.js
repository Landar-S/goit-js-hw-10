import './css/styles.css';
import countryInfoCard from './js/templates/country-info.hbs';
import countryList from './js/templates/country-list.hbs';
import API from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  const country = inputEl.value.trim();
  if (!country) {
    clearListEl();
    return;
  }

  API.fetchCountry(country)
    .then(response => {
      if (response.length > 10) {
        clearListEl();
        clearInfoEl();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        if (response.length >= 2 && response.length <= 10) {
          clearListEl();
          clearInfoEl();
          renderCountryList(response);
        } else {
          clearListEl();
          clearInfoEl();
          renderCountryCardInfo(response);
        }
      }
    })
    .catch(onFetchError);
}

function renderCountryList(country) {
  const markup = countryList(country);
  listEl.innerHTML = markup;
}

function renderCountryCardInfo(country) {
  const markup = countryInfoCard(country);
  infoEl.innerHTML = markup;
}

function onFetchError() {
  clearListEl();
  clearInfoEl();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function clearListEl() {
  listEl.innerHTML = '';
}

function clearInfoEl() {
  infoEl.innerHTML = '';
}
