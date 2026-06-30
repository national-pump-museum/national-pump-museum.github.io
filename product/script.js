'use strict';

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded (event) {
  let {category = '', model = '', product = ''} = document.getQueryParameters();
  if (category) {
    category = decodeURIComponent(category);
    const th = document.querySelector('#product__table-header--category');
    const input = th.querySelector('input');
    input.value = category;
    const event = new Event('input', {
      bubbles: true
    });
    input.dispatchEvent(event);
  }
  if (model) {
    model = decodeURIComponent(model);
    const th = document.querySelector('#product__table-header--model');
    const input = th.querySelector('input');
    input.value = model;
    const event = new Event('input', {
      bubbles: true
    });
    input.dispatchEvent(event);
  }
  if (product) {
    product = decodeURIComponent(product);
    const th = document.querySelector('#product__table-header--product');
    const input = th.querySelector('input');
    input.value = product;
    const event = new Event('input', {
      bubbles: true
    });
    input.dispatchEvent(event);
  }
}, false);
