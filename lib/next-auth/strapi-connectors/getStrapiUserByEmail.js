var axios = require('axios');

const getUserByEmail =(email) =>{
  var config = {
    method: 'get',
    url: `https://prototypr-backend-e8a72.ondigitalocean.app/api/users?filters[$and][0][email][$eq]=${email}`,
    headers: { 
      'Authorization': 'Bearer oldtoken', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };

  axios(config)
  .then(function (response) {
    return response.data[0]
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default getUserByEmail
