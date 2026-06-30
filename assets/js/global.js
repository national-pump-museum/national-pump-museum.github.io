'use strict';

document.getQueryParameters = () => location.search.slice(1)
    .split('&')
    .map(currentValue => currentValue.split('='))
    .reduce((accumulator, currentValue) => {
  const [ key, value ] = currentValue;
  accumulator[key] = value || key;
  return accumulator;
}, {});
