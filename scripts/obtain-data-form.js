let params = require('./scripts/params-object');

// Выделяем все интерактивные элементы для поиска
let radius = document.querySelector('.settings-panel__radius');
let sort = document.querySelector('.settings-panel__sort');
let timeBounds = document.querySelectorAll('.settings-panel__time-bounds-data');
let wordSearch = document.querySelector('.settings-panel__time-bounds-word-search');

let extSearch = document.querySelector('.add-settings-panel__is-extended input');
extSearch.flag = true;
let extFilters = document.querySelector('.add-settings-panel__filters-flex');

//Чекбокс расширенного поиска
extSearch.onclick = () => {
  if (extSearch.flag) {
    extFilters.style.display = 'none';
    extSearch.flag = false;
    params.add = false;
  } else {
    extFilters.style.display = '';
    extSearch.flag = true;
    params.add = true;
  }
};

//Вешаем обработчики на эелементы и в них взаимодействуем с объектом для поиска
radius.onclick = (e) => {
  if (e.target.tagName == 'INPUT') {
    let val = e.target.dataset.value;
    console.log(val);
    params.radius = +val;
    console.log(params);
  }
};

sort.onclick = (e) => {
  if (e.target.tagName == 'INPUT') {
    let val = e.target.dataset.value;
    console.log(val);
    params.sort = +val;
  }
  console.log(params);
};
//Дата начала
timeBounds[0].onblur = (e) => {
  params.start_time = new Date(e.target.value).getTime() / 1000;
  if (isNaN(params.start_time)) params.start_time = '';
  console.log(params.start_time);
};
// Дата конца
timeBounds[1].onblur = (e) => {
  params.end_time = new Date(e.target.value).getTime() / 1000;
  if (isNaN(params.end_time)) params.end_time = '';
  console.log(params.end_time);
};

wordSearch.onblur = (e) => {
  console.log(e.target.value);
  params.search = e.target.value;
};

//Панель дополнительных настроек

let typeSearch = document.querySelector('.add-settings-panel__type-search');
let resolution = document.querySelector('.add-settings-panel__resolution input');
let countOfResults = document.querySelector('.add-settings-panel__count-of-results input');
let sex = document.querySelector('.add-settings-panel__human-filters--sex');
let age = document.querySelectorAll('.add-settings-panel__human-filters--age input');
let cityHuman = document.querySelector('.add-settings-panel__human-filters--city input');
let cityGroup = document.querySelector('.add-settings-panel__group-filters--city input');
let relation = document.querySelector('.add-settings-panel__human-filters--relation select');
let commonFriends = document.querySelector(
  '.add-settings-panel__human-filters--common-friend input'
);
let countMembers = document.querySelectorAll(
  '.add-settings-panel__group-filters--members_count input'
);

console.log(age);
typeSearch.onclick = (e) => {
  if (e.target.tagName == 'INPUT') {
    let val = e.target.dataset.value;
    console.log(val);
    params.type = +val;
    console.log(params.type);
  }
};

sex.onclick = (e) => {
  if (e.target.tagName == 'INPUT') {
    let val = e.target.dataset.value;
    console.log(val);
    params.sex = +val;
    console.log(params.sex);
  }
};
age[0].onblur = (e) => {
  console.log(e.target.value);
  params.age_from = +e.target.value;
};
age[1].onblur = (e) => {
  console.log(e.target.value);
  params.age_to = +e.target.value;
};
cityHuman.onblur = (e) => {
  console.log(e.target.value);
  params.cityHuman = e.target.value;
};
relation.onblur = (e) => {
  console.dir(e.target.selectedOptions[0].dataset.value);
  params.relation = +e.target.selectedOptions[0].dataset.value;
};
commonFriends.onclick = (e) => {
  if (params.common_count) {
    params.common_count = false;
  } else {
    params.common_count = true;
  }
};

cityGroup.onblur = (e) => {
  console.log(e.target.value);
  params.cityGroup = e.target.value;
};

countMembers[0].onblur = (e) => {
  params.countMembers_from = +e.target.value;
  if (e.target.value == '') params.countMembers_from = 0;
  console.log(params.countMembers_from);
};
countMembers[1].onblur = (e) => {
  params.countMembers_to = +e.target.value;
  if (e.target.value == '') params.countMembers_to = 10000000;
  console.log(params.countMembers_to);
};

countOfResults.onblur = (e) => {
  console.log('eee');
  params.count = +e.target.value;
};
resolution.flag = true;

resolution.onclick = (e) => {
  if (resolution.flag) {
    resolution.flag = false;
    params.resolution = false;
  } else {
    resolution.flag = true;
    params.resolution = true;
  }
};
