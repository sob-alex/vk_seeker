const utils = require('./utils');
let objs = [];
global.countImgs = 0;
function createColumn(name, datee, src, ownIds) {
  setTimeout(() => {
    let column = document.createElement('div');
    let image = document.createElement('img');
    let description = document.createElement('div');
    let personName = document.createElement('span');
    let date = document.createElement('span');

    column.className = 'search-results-panel__row--column';
    column.setAttribute('onclick', 'obr(this)');

    column.dataset.id = `${global.countImgs++}`;
    image.src = src;
    description.className = 'search-results-panel__column--description';
    personName.className = 'search-results-panel__column--description--person-name';
    personName.innerHTML = name;
    personName.dataset.href = `https://vk.com/photo${ownIds[0]}_${ownIds[1]}`;
    date.className = 'search-results-panel__column--description--date';
    date.innerHTML = datee;

    // flag && (image.id = 'myImg');
    // flag = false;
    column.append(image);
    column.append(description);

    description.append(personName);
    description.append(date);

    document.body.querySelector('.search-results-panel__row').append(column);
  }, 50);
}

module.exports.addToContainer = (objects) => {
  if (objects.length > 50)
    document.querySelector('.search-results-panel__show-more').style.display = 'block';
  objs = [...objects];
  addPartToContainer(objs);
};

document.querySelector('.search-results-panel__show-more').onclick = () => {
  addPartToContainer(objs);
};

async function addPartToContainer(objects) {
  let portion = objects.splice(0, 50);
  for (let i = 0; i < portion.length; i++) {
    if (portion[i].lat) {
      let name;
      if (params.add) {
        if (portion[i].addInfo.first_name)
          name = `${portion[i].addInfo.first_name} ${portion[i].addInfo.last_name}`;
        else name = `${portion[i].addInfo.name}`;
      } else name = `Неизвестно`;

      createColumn(
        name,
        utils.getDateForResults(portion[i].date),
        utils.chooseSize(portion[i].sizes, params.resolution),
        [portion[i].owner_id, portion[i].id]
      );
      await new Promise((res) => setTimeout(res, 100));
    }
  }
  if (objects.length == 0)
    document.querySelector('.search-results-panel__show-more').style.display = 'none';
}
