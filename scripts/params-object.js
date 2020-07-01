let params = {
  token: '185541d4f781dd8f6f74be73ec6a7674e9a6318e2745008c80e4b5b5c1897663fe59ef9f84e1d0ad07814',
  radius: 100, //10, 100, 800, 6000, 50000
  lat: 52,
  long: 87,
  sort: 0, //1 — по количеству отметок «Мне нравится»  0 — по дате добавления фотографии.
  offset: 0,
  count: 100, //max =1000
  search: '',
  start_time: ``,
  end_time: ``,
  add: true,
  type: 0, // all - 0, users - 1,groups - 2
  age_from: 0,
  age_to: 100,
  sex: -1, // -1 - all, 1 - women, 2 -men
  common_count: false, //общие друзья
  relation: -1, // -1 - любой,  1 — не женат/не замужем;  2 — есть друг/есть подруга;  3 — помолвлен/помолвлена;  4 — женат/замужем;  5 — всё сложно;  6 — в активном поиске;  7 — влюблён/влюблена; 8 — в гражданском браке; 0 — не указано.
  cityHuman: '', // 0 - не указано
  cityGroup: '', // 0 - не указано
  countMembers_from: 0,
  countMembers_to: 10000000,
  resolution: true,
};
module.exports = params;
