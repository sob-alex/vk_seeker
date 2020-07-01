const { shell } = require('electron');
const utils = require('./scripts/utils');
const fs = require('fs');
const { BrowserWindow } = require('electron').remote;
//Обработка декоративных событий
//
//Открытие доп настроек:
let addSettingsButton = document.querySelector('.settings-panel__other-settings-button > button');
let addSettingsButtonflag = true;
let settingsPanel = document.querySelector('.add-settings-panel');
let closeErrorWindow = document.querySelector('.place-map__error-window--inner--close');

addSettingsButton.onclick = () => {
  //Тугл панели дополнительных настроек
  if (addSettingsButtonflag) {
    settingsPanel.style.display = 'block';
    addSettingsButtonflag = false;
  } else {
    settingsPanel.style.display = 'none';
    addSettingsButtonflag = true;
  }
};
//Закрытие доп настроек посредством кнопки на панели доп настроек:
let addSettingsClose = document.querySelector('.add-settings-panel__close');
addSettingsClose.onclick = () => {
  settingsPanel.style.display = 'none';
  addSettingsButtonflag = true;
};

let showResultsButton = document.querySelector('.place-map__open-search-result-panel');
showResultsButton.onclick = () => {
  let resultsPanel = document.querySelector('.search-results-panel');
  resultsPanel.style.display = 'block';
};

let hideResultsButton = document.querySelector('.search-results-panel__close-panel');

hideResultsButton.onclick = () => {
  let resultsPanel = document.querySelector('.search-results-panel');
  resultsPanel.style.display = '';
};

closeErrorWindow.onclick = () => {
  let errorWidnow = document.querySelector('.place-map__error-window');
  errorWidnow.style.display = 'none';
};

//Модальное окно с картинкой в панели результатов
let modal = document.getElementsByClassName('search-results-panel__modal')[0];

let modalImg = document.getElementById('img01');
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
function obr(target) {
  modal.style.display = 'flex';
  console.dir(target);
  console.log(target.children[0]);
  let imaga = target.children[0];
  let targetComputed = getComputedStyle(
    document.querySelector('.search-results-panel__modal--content')
  );
  let k = imaga.naturalWidth / imaga.naturalHeight;
  canvas.width = parseFloat(targetComputed.height) * k;
  canvas.height = parseFloat(targetComputed.height);
  ctx.drawImage(imaga, 0, 0, canvas.width, canvas.height);

  let personName = document.getElementsByClassName(
    'search-results-panel__description--person-name'
  )[0];
  let date = document.getElementsByClassName('search-results-panel__description--date')[0];
  personName.innerHTML = target.children[1].children[0].innerHTML;
  date.innerHTML = target.children[1].children[1].innerHTML;
  let linkVk = document.querySelector('.search-results-panel__description--person-anchor');
  linkVk.href = target.children[1].children[0].dataset.href;
  linkVk.onclick = (e) => {
    e.preventDefault();
    shell.openExternal(linkVk.href);
  };
  label_on_map.onclick = () => {
    map.openPopup(target.dataset.id);
  };
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('search-results-panel__modal--close-modal')[0];
let modalContainer = document.querySelector('.search-results-panel__modal');
modalContainer.onclick = (e) => {
  if (e.target.className == 'search-results-panel__modal') {
    modal.style.display = 'none';
  }
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

//Работа с minimize, maximize, close

let closeApp = document.querySelector('.header__window-buttons--close');
let minimizeWindow = document.querySelector('.header__window-buttons--minimize');
let maximizeWindow = document.querySelector('.header__window-buttons--maximize');

let win = BrowserWindow.fromId(1);

closeApp.onclick = () => {
  console.log('close');
  win.close();
};
minimizeWindow.onclick = () => {
  console.log('minimize');
  win.minimize();
};
maximizeWindow.onclick = () => {
  console.log('maximize');
  console.log(win.isMaximized());
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
};

// обработчик на кнопке для получения токена
document
  .querySelector('.place-map__authorization-form--inner button')
  .addEventListener('click', () => {
    let win = new BrowserWindow({ width: 800, height: 600, frame: false });
    win.loadURL(
      'https://oauth.vk.com/authorize?client_id=6910812&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,offline&response_type=token&v=5.103&state=123456'
    );
    win.webContents.on('did-finish-load', () => {
      //Окно с токеном загружено, и можно доставать его оттуда
      let myURL = new URL(win.webContents.getURL());
      if (myURL.hash != '') {
        let token = utils.getToken(myURL);
        console.log(myURL);
        try {
          fs.writeFileSync(`.\\tkn.txt`, token, 'utf8');
          win.close();
          document.querySelector('.place-map__authorization-form').style.display = 'none';
          params.token = token;
        } catch (err) {
          console.log('Запись токена в файл не удалась');
        }
      } else {
        win.webContents.on('will-navigate', () => {
          myURL = new URL(win.webContents.getURL());
          let token = utilities.getToken(myURL);
          console.log('change!');
          console.log(token);
          try {
            fs.writeFileSync(`.\\tkn.txt`, token, 'utf8');
            win.close();
            document.querySelector('.place-map__authorization-form').style.display = 'none';
            params.token = token;
          } catch (err) {
            console.log('Запись токена в файл не удалась');
          }
        });
      }
    });
  });
