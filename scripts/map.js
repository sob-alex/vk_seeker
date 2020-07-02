module.exports.map = async function () {
  let Datastore = require('nedb');

  let map_;

  db = new Datastore({ filename: 'cities' });
  db.loadDatabase();

  // загрузка карты
  try {
    await DG;
  } catch (err) {
    console.log(err);
    if (err.message == 'DG is not defined') {
      console.log('Ошибка! Карта не загрузилась\nПроверьте подключение к интернету');
      errorWidnow = document.querySelector('.place-map__error-window');
      errorWidnow.querySelector('h3').innerHTML =
        'Ошибка! Карта не загрузилась\nПроверьте подключение к интернету';
      return;
    }
  }

  // получение карты по айди и установка центра и масштаба на карте
  map_ = DG.map('map', {
    center: [52.26, 87.12],
    zoom: 5,
  });
  console.log(map_);
  //Создаем маркер
  myIcon = DG.icon({
    iconUrl: 'images/marker-01.png',
    iconSize: [12, 12],
  });

  //контейнер для главного маркера
  let group_main_marker = DG.featureGroup();

  //определяем координаты по клику
  map_.on('click', function (e) {
    // Удаление фотомаркеров
    group_of_markers.clearLayers();
    global.countImgs = 0;
    document.querySelector('.search-results-panel__row').innerHTML = '';

    // удаляется маркер предыдущего клика
    group_main_marker.clearLayers();

    //записываем в параметры широту и долготу, которые будут отправляться в запросе к апи вк
    params.lat = e.latlng.lat;
    params.long = e.latlng.lng;
    // установка главного маркера
    DG.marker([e.latlng.lat, e.latlng.lng], {
      icon: myIcon,
    }).addTo(group_main_marker);

    group_main_marker.addTo(map_);
  });

  let group_of_markers = DG.featureGroup();
  module.exports.clear_map_of_markers = () => {
    group_of_markers.clearLayers();
  };

  //добавление по одной фотографии на карту
  module.exports.addMarkersToMap = async (objects) => {
    group_of_markers.clearLayers();
    const chooseSizeForMap = require('./utils').chooseSizeForMap;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].lat) {
        let image = document.createElement('img');
        image.src = chooseSizeForMap(objects[i].sizes);
        image.style.width = '175px';
        let a = document.createElement('a');
        a.href = `https://vk.com/photo${objects[i].owner_id}_${objects[i].id}`;
        a.onclick = (e) => {
          e.preventDefault();

          shell.openExternal(a.href);
        };
        a.append(image);

        let popup = DG.popup().setContent(a);

        DG.marker([objects[i].lat, objects[i].long]).addTo(group_of_markers).bindPopup(popup);

        group_of_markers.addTo(map_);
      }
      // задержка добавления маркеров в 50мс (иначе если все разом, может подвиснуть
      // если маркеров много)
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  };

  module.exports.openPopup = (id) => {
    console.log('in openPopup id: ', id);
    let mark = group_of_markers.getLayers()[+id];
    console.log(mark.getLatLng());
    map_.setView([mark.getLatLng().lat, mark.getLatLng().lng]);

    mark.openPopup();

    document.querySelector('.search-results-panel__modal').style.display = 'none';
    document.querySelector('.search-results-panel').style.display = 'none';
  };

  let submitSearchCityButton = document.querySelector('.place-map__search-sity-pannel i');
  let inputSearchCity = document.querySelector('.place-map__search-sity-pannel input');
  const changeToDot = require('./utils').changeToDot;
  const UpperCaseFirstLetter = require('./utils').UpperCaseFirstLetter;
  submitSearchCityButton.onclick = () => {
    console.log('rrr');
    db.find({ Город: UpperCaseFirstLetter(inputSearchCity.value) }, function (err, docs) {
      console.log(docs);
      if (docs.length != 0) {
        console.log([changeToDot(docs[0].lat), changeToDot(docs[0].lng)]);
        map_.setView([+changeToDot(docs[0].lat), +changeToDot(docs[0].lng)]);
      }
    });
  };
};
