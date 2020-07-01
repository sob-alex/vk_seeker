const submit = require('./scripts/submit');
const map = require('./scripts/map');

//Когда карта загрузилась, то вызов сабмита, который навешивает обработчик на кнопку поиска
map.map().then(() => {
  if (fs.existsSync('.\\tkn.txt')) params.token = fs.readFileSync(`.\\tkn.txt`, 'utf8');
  else fs.writeFileSync(`.\\tkn.txt`, '', 'utf8');
  console.log(params.token);
  submit();
});
