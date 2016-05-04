angular.module('your_app_name')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  tokenExpired:'auth-tokenExpired'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  publics: 'public_role'
})

.constant('API_ENDPOINT', {
// url: 'http://192.168.0.43:8585/',
//url:'http://89705a0d.ngrok.io/',
// url: 'http://127.0.0.1:8080/',
//url:'http://188.166.78.82:8080/' //dev
url:'http://41.139.152.37:8585/', //pan dev,
//url:'http://192.168.100.5:8080/', //home  dev,
 

});