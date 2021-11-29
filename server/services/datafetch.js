const axios = require("axios").default;

const URLs = ["https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json", "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json", "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json"];

const fetchData = async () => {
  const all_user_data = [];
  const requests = URLs.map(URL => axios.get(URL).catch(err => null));
  const [user1, user2, user3] = await axios.all(requests)
  all_user_data.push(user1.data, user2.data, user3.data);
  return all_user_data;
}

module.exports = { fetchData };