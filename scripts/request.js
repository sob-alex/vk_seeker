const axios = require('axios');
const filter = require('./filter-for-results');
const utils = require('./utils');
const addRequest = async (items) => {
  let results = [];
  async function requestGroups(ids) {
    if (ids.length != 0) {
      if (ids.length >= 500) {
        let idsFirstPart = ids.slice(0, (ids.length / 2) | 0);
        let idsSecondPart = ids.slice((ids.length / 2) | 0);
        const url1 = `https://api.vk.com/method/groups.getById?group_ids=${idsFirstPart.join()}&fields=members_count,city&access_token=${
          params.token
        }&v=5.103`;
        const url2 = `https://api.vk.com/method/groups.getById?group_ids=${idsSecondPart.join()}&fields=members_count,city&access_token=${
          params.token
        }&v=5.103`;
        try {
          const response1 = await axios.get(url1);
          const response2 = await axios.get(url2);
          const data1 = response1.data;
          const data2 = response2.data;
          // console.log('users: ', data.response);
          results.push(...data1.response);
          results.push(...data2.response);
        } catch (error) {
          errorWidnow.style.display = 'flex';
          errorWidnow.querySelector('h3').innerHTML = error.message;
          console.log(error);
        }
      } else {
        const url = `https://api.vk.com/method/groups.getById?group_ids=${ids.join()}&fields=members_count,city&access_token=${
          params.token
        }&v=5.103`;
        try {
          const response = await axios.get(url);
          const data = response.data;

          // console.log('groups:', data.response);
          results.push(...data.response);
        } catch (error) {
          errorWidnow.style.display = 'flex';
          errorWidnow.querySelector('h3').innerHTML = error.message;
          console.log(error);
        }
      }
    }
  }
  async function requestUsers(ids) {
    if (ids.length != 0) {
      if (ids.length >= 500) {
        let idsFirstPart = ids.slice(0, (ids.length / 2) | 0);
        let idsSecondPart = ids.slice((ids.length / 2) | 0);
        const url1 = `https://api.vk.com/method/users.get?user_ids=${idsFirstPart.join()}&fields=city,common_count,relation,sex,bdate&access_token=${
          params.token
        }&v=5.103`;
        const url2 = `https://api.vk.com/method/users.get?user_ids=${idsSecondPart.join()}&fields=city,common_count,relation,sex,bdate&access_token=${
          params.token
        }&v=5.103`;
        try {
          const response1 = await axios.get(url1);
          const response2 = await axios.get(url2);
          const data1 = response1.data;
          const data2 = response2.data;
          // console.log('users: ', data.response);
          results.push(...data1.response);
          results.push(...data2.response);
        } catch (error) {
          errorWidnow.style.display = 'flex';
          errorWidnow.querySelector('h3').innerHTML = error.message;
          console.log(error);
        }
      } else {
        const url = `https://api.vk.com/method/users.get?user_ids=${ids.join()}&fields=city,common_count,relation,sex,bdate&access_token=${
          params.token
        }&v=5.103`;
        try {
          const response = await axios.get(url);
          const data = response.data;
          // console.log('users: ', data.response);
          results.push(...data.response);
        } catch (error) {
          errorWidnow.style.display = 'flex';
          errorWidnow.querySelector('h3').innerHTML = error.message;
          console.log(error);
        }
      }
    }
  }

  //Проверяем, фотографии пользователей и/или групп искать
  if (!params.type) {
    //   Выдергиваем из объектов только айдишники пользователей
    let idsUsers = items.filter((e) => e.owner_id > 0).map((e) => e.owner_id);
    let idsGroups = items.filter((e) => e.owner_id < 0).map((e) => -1 * e.owner_id);

    await requestUsers(idsUsers);
    await requestGroups(idsGroups);
    // Если нужны только фото пользователей
  } else if (params.type == 1) {
    let idsUsers = items.filter((e) => e.owner_id > 0).map((e) => e.owner_id);
    await requestUsers(idsUsers);
  } else {
    let idsGroups = items.filter((e) => e.owner_id < 0).map((e) => -1 * e.owner_id);
    await requestGroups(idsGroups);
  }
  // console.log('resultsss: ', results);
  return results;
};

//Главная экспортируемая функция для отправки запроса к API VK
module.exports = async () => {
  const url = `https://api.vk.com/method/photos.search?lat=${params.lat}&long=${params.long}&sort=${params.sort}&q=${params.search}&start_time=${params.start_time}&end_time=${params.end_time}&offset=${params.offset}&count=${params.count}&radius=${params.radius}&access_token=${params.token}&v=5.103`;

  try {
    //   Отправка главного запроса
    const response = await axios.get(url);
    const data = response.data;
    let results = [];
    // Ошибка, если токен устарел, или его нет
    if (data.error && data.error.error_code == 5) {
      document.querySelector('.place-map__authorization-form').style.display = 'flex';
      return results;
    } else {
      // Получаем результаты поиска, пока не подробные
      const items = data.response.items;

      //Если нужна расширенная информация
      if (params.add) {
        await addRequest(items).then((res) => {
          //   Здесь добавляем к массиву объектов первоначального запроса расширенную информацию
          items.forEach((e) => {
            // Ищем одинаковые айдишники, чтобы сопоставить результаты главного запроса и дополнительного
            //То есть находится пересечение дополнительного и главного запроса по айдишникам
            // Чаще всего дополнительный запрос содержит меньше эелементов, чем главный,
            // потому что если в дополнительном запросе к вк в параметрах есть одинаковые айдишники,
            // то они считается как один
            let index = res.findIndex((ee) => ee.id == Math.abs(e.owner_id));
            // нужные нам результаты записываем в массив результатов

            if (index != -1) {
              let toItems = res[index];

              let element = { ...e };
              element.addInfo = toItems;
              results.push(element);
            }
          });
        });

        results = filter(results);
      }

      return results;
    }
  } catch (error) {
    console.log(error);
    utils.showError(error);
  }
};
