module.exports = (results) => {
  let checkCityGroup = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id > 0) filteredResults.push(e);
      else {
        if (e.addInfo.city && e.addInfo.city.title.toLowerCase() == params.cityGroup.toLowerCase())
          filteredResults.push(e);

        if (params.cityGroup.trim() == '') filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkMembersCount = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id > 0) filteredResults.push(e);
      else {
        if (
          e.addInfo.members_count >= params.countMembers_from &&
          e.addInfo.members_count <= params.countMembers_to
        )
          filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkSex = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id < 0) filteredResults.push(e);
      else {
        if (e.addInfo.sex == params.sex || params.sex == -1) filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkCityHuman = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id < 0) filteredResults.push(e);
      else {
        if (e.addInfo.city && e.addInfo.city.title.toLowerCase() == params.cityHuman.toLowerCase())
          filteredResults.push(e);
        if (params.cityHuman.trim() == '') filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkRelation = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id < 0) filteredResults.push(e);
      else {
        if (e.addInfo.relation == params.relation || params.relation == -1) filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkCommonCount = (res) => {
    let filteredResults = [];
    res.forEach((e) => {
      if (e.owner_id < 0) filteredResults.push(e);
      else {
        if (params.common_count && e.addInfo.common_count > 0) filteredResults.push(e);
        else if (!params.common_count) filteredResults.push(e);
      }
    });
    return filteredResults;
  };
  let checkAge = (res) => {
    let filteredResults = [];
    let getAge = (date) => {
      date = date.split('.');

      return (Date.now() - new Date(date.reverse()).getTime()) / 1000 / 60 / 60 / 24 / 365;
    };
    res.forEach((e) => {
      if (e.owner_id < 0) filteredResults.push(e);
      else if (params.age_from == 0 && params.age_to == 100) {
        filteredResults.push(e);
      } else if (
        e.addInfo.bdate &&
        e.addInfo.bdate.indexOf('.') != e.addInfo.bdate.lastIndexOf('.')
      ) {
        if (
          getAge(e.addInfo.bdate) >= params.age_from &&
          getAge(e.addInfo.bdate) <= params.age_to
        ) {
          filteredResults.push(e);
        }
      }
    });
    return filteredResults;
  };
  console.log('до фильтров', results);
  results = checkCityGroup(results);
  results = checkMembersCount(results);
  results = checkSex(results);
  results = checkAge(results);
  results = checkCityHuman(results);
  results = checkRelation(results);
  results = checkCommonCount(results);
  console.log('после фильтров', results);
  return results;
};

//пол
// возраст
// город
// сп
// общие друзья

// город
// кол-во участников
