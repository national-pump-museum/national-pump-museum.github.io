(() => {
  'use strict';
  const ATTR_FILTERABLE = 'data-filterable';
  const ATTR_SORTABLE = 'data-sortable';
  const ATTR_STYLE_ATTACHED = 'style-attached';
  const CLASS_FILTER_TEXT = 'filter-text';
  const CLASS_HEADER_TEXT = 'header-text';
  const CLASS_HIDDEN_ROW = 'hidden-row';
  const CLASS_SORT_ICON = 'sort-icon';
  const CLASS_TH_CONTAINER = 'th-container';
  const SELECTOR_FILTERABLE_TABLE = 'table[data-filterable]';
  const SELECTOR_SORTABLE_TABLE = 'table[data-sortable]';
  const TEXT_FILTER_PLACEHOLDER = '検索…';
  const SORT_STATE = {
    asc: {text: 'asc', icon: '▲'},
    default: {text: 'default', icon: '⇅'},
    desc: {text: 'desc', icon: '▼'}
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTableStyle, false);
  } else {
    initTableStyle();
  }
  function initTableStyle () {
    const tables = [...new Set([
      ...document.querySelectorAll(SELECTOR_FILTERABLE_TABLE),
      ...document.querySelectorAll(SELECTOR_SORTABLE_TABLE)
    ])];
    tables.forEach(table => {
      if (table.hasAttribute(ATTR_STYLE_ATTACHED)) return;
      const hasFilter = table.hasAttribute(ATTR_FILTERABLE);
      const hasSort = table.hasAttribute(ATTR_SORTABLE);
      const headers = table.querySelectorAll('th');
      const tbody = table.querySelector('tbody');
      const rows = tbody.querySelectorAll('tr');
      rows.forEach((tr, index) => tr.dataset.index = index);
      headers.forEach((th, index) => {
        const container = document.createElement('div');
        container.className = CLASS_TH_CONTAINER;
        const headerText = document.createElement('span');
        headerText.className = CLASS_HEADER_TEXT;
        headerText.textContent = th.textContent;
        container.appendChild(headerText);
        const sortIcon = document.createElement('div');
        sortIcon.className = CLASS_SORT_ICON;
        sortIcon.dataset.state = SORT_STATE.default.text;
        sortIcon.textContent = SORT_STATE.default.icon;
        container.appendChild(sortIcon);
        th.innerHTML = '';
        th.appendChild(container);
        if (hasSort) {
          sortIcon.addEventListener('click', event => {
            event.stopPropagation();
            applySort(table, index);
          }, false);
        }
        if (hasFilter) {
          const filterText = document.createElement('input');
          filterText.className = CLASS_FILTER_TEXT;
          filterText.placeholder = TEXT_FILTER_PLACEHOLDER;
          filterText.type = 'text';
          filterText.value = '';
          filterText.addEventListener('click', event => event.stopPropagation(), false);
          filterText.addEventListener('input', event => applyFilter(table), false);
          container.appendChild(filterText);
        }
      });
      table.setAttribute(ATTR_STYLE_ATTACHED, true);
    });
  }
  function applyFilter (table) {
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const filterValues = [...headers].map(th => th.querySelector(`.${CLASS_FILTER_TEXT}`)?.value.toLowerCase() || '');
    rows.forEach(tr => {
      tr.classList.remove(CLASS_HIDDEN_ROW);
      for (let i = 0; i < filterValues.length; i ++) {
        const value = filterValues[i];
        if (!value) continue;
        const text = tr.cells[i]?.textContent.toLowerCase() || '';
        if (text.includes(value)) continue;
        tr.classList.add(CLASS_HIDDEN_ROW);
        break;
      }
    });
  }
  function applySort (table, columnIndex) {
    const headers = table.querySelectorAll('th');
    const th = headers[columnIndex];
    const icon = th.querySelector(`.${CLASS_SORT_ICON}`);
    if (!icon) return;
    headers.forEach((th, index) => {
      if (index === columnIndex) return;
      const icon = th.querySelector(`.${CLASS_SORT_ICON}`);
      if (icon) {
        icon.dataset.state = SORT_STATE.default.text;
        icon.textContent = SORT_STATE.default.icon;
      }
    });
    const currentState = icon.dataset.state || SORT_STATE.default.text;
    let nextState = SORT_STATE.default;
    switch (currentState) {
      case SORT_STATE.default.text:
        nextState = SORT_STATE.asc;
        break;
      case SORT_STATE.asc.text:
        nextState = SORT_STATE.desc;
        break;
      default:
        nextState = SORT_STATE.default;
        break;
    }
    icon.dataset.state = nextState.text;
    icon.textContent = nextState.icon;
    const tbody = table.querySelector('tbody');
    const rows = [...tbody.querySelectorAll('tr')];
    if (nextState.text === SORT_STATE.default.text) {
      rows.sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
    } else {
      rows.sort((a, b) => {
        const valA = a.cells[columnIndex].textContent.trim();
        const valB = b.cells[columnIndex].textContent.trim();
        const isNum = !isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '';
        return nextState.text === SORT_STATE.asc.text?
            isNum?
                Number(valA) - Number(valB):
                valA.localeCompare(valB):
            isNum?
                Number(valB) - Number(valA):
                valB.localeCompare(valA);
      });
    }
    rows.forEach(row => tbody.appendChild(row));
  }
})();
