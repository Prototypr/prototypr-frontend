var axios = require('axios');

const getUserByEmail =(email) =>{
  var config = {
    method: 'get',
    url: `https://prototypr-backend-e8a72.ondigitalocean.app/api/users?filters[$and][0][email][$eq]=${email}`,
    headers: { 
      'Authorization': 'Bearer 06e4edb1e5a7119631ada482cb6658110da692716458f7292c50ff5f1fd7ffc06b4b590a9f98e51888b8a46b102bcb235b77597cd49e8b8ea63d831e5081a00c83f09fd6a01bb0082642e2103a56d8fb0271fe44d9748be99df62b2ec4c9fa4a3bf75ea4a3d7f12543ff79fbda4c77105f18f70bd6d8f81f57176aa4e46d1d16', 
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