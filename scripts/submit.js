const request = require('./request');
const container = require('./results-in-container');
const map = require('./map');
const utils = require('./utils');

module.exports = () => {
  let button = document.querySelector('.settings-panel__submit button');
  button.onclick = () => {
    (async () => {
      try {
        //получаем результаты и копируем результаты по значению

        let [...res] = await request();
        map.addMarkersToMap(res);
        container.addToContainer(res);
      } catch (e) {
        console.log(e);
        utils.showError(e);
      }
    })();
  };
};
