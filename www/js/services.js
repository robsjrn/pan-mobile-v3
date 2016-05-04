angular.module('your_app_name.services', [])

.service('FeedList', function ($rootScope, FeedLoader, $q){
	this.get = function(feedSourceUrl) {
		var response = $q.defer();
		//num is the number of results to pull form the source
		FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
			response.resolve(data.responseData);
		});
		return response.promise;
	};
})


.factory('ageCalc', function() {
  var age;
  var ageService={};
    ageService.calculate=function(dateOfBirth, dateToCalculate){

         var calculateYear = dateToCalculate.getFullYear();
          var calculateMonth = dateToCalculate.getMonth();
          var calculateDay = dateToCalculate.getDate();
          var birthYear = dateOfBirth.getFullYear();
          var birthMonth = dateOfBirth.getMonth();
          var birthDay = dateOfBirth.getDate();

  

          age = calculateYear - birthYear;
          var ageMonth = calculateMonth - birthMonth;
          var ageDay = calculateDay - birthDay;


          if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
              age = parseInt(age) - 1;
          }
          return age;

          };
    ageService.isDate=function(txtDate){

       var currVal = txtDate;
            if (currVal === '')
              return true;

            //Declare Regex
            var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
            var dtArray = currVal.match(rxDatePattern); // is format OK?

            if (dtArray === null)
              return false;

            //Checks for dd/mm/yyyy format.
            var dtDay = dtArray[1];
            var dtMonth = dtArray[3];
            var dtYear = dtArray[5];

            if (dtMonth < 1 || dtMonth > 12)
              return false;
            if (dtDay < 1 || dtDay > 31)
              return false;      
            else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay == 31)
              return false;
            else if (dtMonth === 2) {
              var isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0));
              if (dtDay > 29 || (dtDay === 29 && !isleap)){
                return false;
                }
            }

            return true;

              } ; 

     ageService.parseDate=function(dateStr){
			         var dateParts = dateStr.split("/");
			   var kk=new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
			   return kk;
       }  ;

       return ageService;           
})

.factory('customerFactory', ['$http','API_ENDPOINT',function($http,API_ENDPOINT) {
  
        
  var data = {   
            getCustomerDetails:function (clientid) {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/details?clientid='+clientid);
            },
             getCustomerBeneficiaries:function (productid) {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/beneficiaries?productid='+productid);
            },
             getCustomerParents:function (productid) {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/parents?productid='+productid);
            },
            getCustomerChildrens:function (productid) {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/children?productid='+productid);
            },
            getCustomerSpouse:function (productid) {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/spouse?productid='+productid);
            },
             editbeneficiary:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'Umash/rest/client/editbeneficiary',data);
               },
            subcribe:function (data) {
              
         return $http.post(API_ENDPOINT.url +'Umash/rest/client/subscribe',data);
               },
                 unsubcribe:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'Umash/rest/client/unsubcribe',data);
               },

               
          MakeClaim:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'Umash/rest/client/claim',data);
               },
            getofficelocation:function () {
              return $http.get(API_ENDPOINT.url +'Umash/rest/client/officelocation');
            },
             MpesaRequest:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'UmashMpesa/umash/MpesaPaymentRequest',data);
               },
             
             Login:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'Umash/rest/authentication',data);
               },
            Comments:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'Umash/rest/client/comments',data);
               },
               
                MpesaConfirmation:function (data) {
                 
         return $http.post(API_ENDPOINT.url +'UmashMpesa/umash/MpesaConfirmation',data);
               },
             RegisterUser:function (user) {
             // console.log(user);
         return $http.post(API_ENDPOINT.url +'Umash/rest/Registration',user);
            },
            
          
  };
  return data;
}])
.factory('premiumcalculation', function($timeout, $rootScope) {
   var premium;
   var service={};

   service.calculate=function(sumassured,membertype,age){
           

           switch( parseInt(sumassured)){


              case 1200:
           
                      if (membertype=='spouse'){
                       premium=premium + 1200;
                      // console.log("New Premium "+premium);
                      }
                      else if (membertype=='child'){
                         premium=premium + 1000;
                        // console.log("New Premium "+premium);
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium + 2000;}
                               else {premium=premium + 3500;}                       
                      }
      
                  break;
              case 1800:
           
                      if (membertype=='spouse'){
                       premium=premium + 1200;
                       
                      }
                      else if (membertype=='child'){
                         premium=premium + 1800;
                       
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium + 2500;}
                               else {premium=premium + 4000;}
                         
                      }
                  break;                  
               case 2400: 
             

                     if (membertype=='spouse'){
                       premium=premium + 2400;
                      }
                      else if (membertype=='child'){
                         premium=premium + 2000;
                        // console.log("New Premium "+premium);
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium + 4000;}
                               else {premium=premium + 7000;}
                         
                      }

                 break;
                   case 3600: 
             

                     if (membertype=='spouse'){
                       premium=premium + 3600;
                      }
                      else if (membertype=='child'){
                         premium=premium + 3600;
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium + 5000;}
                               else {premium=premium + 8000;}
                         
                      }

                 break; 
           }
        
       return premium;
   };
   service.negcalculate=function(sumassured,membertype,age){
           

           switch( parseInt(sumassured)){


              case 1200:
           
                      if (membertype=='spouse'){
                       premium=premium - 1200;
                      // console.log("New Premium "+premium);
                      }
                      else if (membertype=='child'){
                         premium=premium - 1000;
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium - 2000;}
                               else {premium=premium - 3500;}
                         
                      }
                  break;
             case 1800:
           
                      if (membertype=='spouse'){
                       premium=premium - 1200;
                       console.log("New Premium "- premium);
                      }
                      else if (membertype=='child'){
                         premium=premium - 1800;
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium - 2500;}
                               else {premium=premium - 4000;}
                         
                      }
                  break;    
               case 2400: 
             

                     if (membertype=='spouse'){
                       premium=premium - 2400;
                      }
                      else if (membertype=='child'){
                         premium=premium - 2000;
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium - 4000;}
                               else {premium=premium -7000;}
                         
                      }

                 break;
              case 3600: 
             

                     if (membertype=='spouse'){
                       premium=premium - 3600;
                      }
                      else if (membertype=='child'){
                         premium=premium - 3600;
                      }
                       else if (membertype=='parent'){

                               if (age<=65 ){premium=premium - 5000;}
                               else {premium=premium - 8000;}
                         
                      }

                 break;   
           }
        
       return premium;
   };
   service.setPremium=function(prem){

    //console.log("Setting Premium"+prem);

    premium = prem;

        return premium;
       };
      return service;

}) 



.service('client', function() {
  var Client = [];

  var saveClient = function(newObj) {
     
      Client=newObj;
       
  };

  var getClient = function(){
      return Client;
  };

  return {
    saveClient: saveClient,
    getClient : getClient 
  };

})

.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      if ($window.localStorage) $window.localStorage.setItem('my-storage', JSON.stringify(val));
      return this;
    },
    getData: function() {
      return JSON.parse($window.localStorage && $window.localStorage.getItem('my-storage'));
    }
  };
})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
 
  return {
    isOnline: function(){
 
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
 
    },
    ifOffline: function(){
 
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
 
    }
  };
})
.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
    });

    return {
        ready: ready.promise
    };
})

.factory('GoogleMaps', function($cordovaGeolocation, $ionicLoading, 
$rootScope, $cordovaNetwork, customerFactory, ConnectivityMonitor,$timeout){
 
  var apiKey = false;
  var map = null;
 
  function initMap(){
 
    var options = {timeout: 10000, enableHighAccuracy: true};
 

      var lat=-1.2846505;
      var lng=36.8215172;
      var latLng = new google.maps.LatLng(lat, 
            lng);
 
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
 
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){
        loadMarkers();
        enableMap();
        $rootScope.$broadcast('event:show', {mapdata: map});

      });
 
  }
  function couldnotgetLocation(){
    
    $ionicLoading.show({
      template: 'Could not get Your Location ..Kindly Enable GPS and Retry'
    });
  }
 
  function enableMap(){
    $ionicLoading.hide();
  }
 
  function disableMap(){
      $timeout(function() {
       $ionicLoading.hide();
    }, 3000);
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
  }
 
  function loadGoogleMaps(){
 
    $ionicLoading.show({
      template: 'Loading Google Maps'
    });
 
    //This function will be called once the SDK has been loaded
    window.mapInit = function(){
      initMap();
    };
 
    //Create a script element to insert into the page
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps";
 
    //Note the callback function in the URL is the one we created above
    if(apiKey){
      script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey +
'&callback=mapInit';
    }
    else {
script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
    }
 
    document.body.appendChild(script);
 
  }
 
  function checkLoaded(){
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      loadGoogleMaps();
    } else {
      enableMap();
    }       
  }
 
  function loadMarkers(){
 
      //Get all of the markers from our Markers factory
      customerFactory.getofficelocation()
      .success(function(markers){

 
       // var records = markers.data.result;
 
        for (var i = 0; i < markers.length; i++) {
 
          var record = markers[i];   
          var markerPos = new google.maps.LatLng(record.lat, record.lng);
 
          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });
 
          var infoWindowContent = "<h4>" + record.description + "</h4>";          
 
          addInfoWindow(marker, infoWindowContent, record);
 
        }
 
      }); 
 
  }
 
  function addInfoWindow(marker, message, record) {
 
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
 
  }
 
  function addConnectivityListeners(){
 
    if(ionic.Platform.isWebView()){
 
      // Check if the map is already loaded when the user comes online, 
//if not, load it
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        checkLoaded();
      });
 
      // Disable the map when the user goes offline
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        disableMap();
      });
 
    }
    else {
 
      //Same as above but for when we are not running on a device
      window.addEventListener("online", function(e) {
        checkLoaded();
      }, false);    
 
      window.addEventListener("offline", function(e) {
        disableMap();
      }, false);  
    }
 
  }
 
  return {
    init: function(key){
 
      if(typeof key != "undefined"){
        apiKey = key;
      }
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        disableMap();
 
        if(ConnectivityMonitor.isOnline()){
          loadGoogleMaps();
        }
      }
      else {
        if(ConnectivityMonitor.isOnline()){
          initMap();
          enableMap();
        } else {
          disableMap();
        }
      }
 
      addConnectivityListeners();
 
    }
  };
 
})
.factory(("PushProcessingService"), function( $window, $ionicPopup ,$cordovaPush,$rootScope,$http,$cordovaMedia,$cordovaDialogs,customerFactory){

var clientid =false;

  function register(){
      

    if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "1093922814713" 
            };
        }
      else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            };
        }    

    $cordovaPush.register(config).then(function (result) {
        
            if (ionic.Platform.isIOS()) {
                $rootScope.regId = result;
                storeDeviceToken("ios");
            }
        }, function (err) {
           // $cordovaToast.showShortCenter('Error Registoring ' + err);
        });


  }

   // Notification Received
    $rootScope.$on('pushNotificationReceived', function (event, notification) {
       
        if (ionic.Platform.isAndroid()) {
          
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
            $rootScope.$apply(function () {
                $rootScope.notifications.push(JSON.stringify(notification.alert));
            });
        }
    });


    $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
       
        if (ionic.Platform.isAndroid()) {
          
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
            $rootScope.$apply(function () {
                $rootScope.notifications.push(JSON.stringify(notification.alert));
            });
        }
    });
    


        // Android Notification Received Handler
    function handleAndroid(notification) {
        if (notification.event == "registered") {
            $rootScope.regId = notification.regid;
            storeDeviceToken("android");
        }
        else if (notification.event == "message") {
            $cordovaDialogs.alert(notification.message, "Pan-Africa Group");
            $rootScope.$apply(function () {
                $rootScope.notifications.push(JSON.stringify(notification.message));
            });
        }
        else if (notification.event == "error")
            $cordovaDialogs.alert(notification.msg, "Notification Error (ignore)");
        else $cordovaDialogs.alert(notification.event, "Notification Error (ignore)");
    }

    // IOS Notification Received Handler
    function handleIOS(notification) {
        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
        // the notification when this code runs (weird).
        if (notification.foreground == "1") {
            // Play custom audio if a sound specified.
            if (notification.sound) {
                var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
            }

            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "Pan Africa Group");

            if (notification.badge) {
                $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                    console.log("Set badge success " + result);
                }, function (err) {
                    console.log("Set badge error " + err);
                });
            }
        }
        // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
        // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
        // the data in this situation.
        else {
            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body,  notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "Incoming Notification");
        }
    }

    // Stores the device token in a db using node-pushserver (running locally in this case)
    //
    // type:  Platform type (ios, android etc)$http
    function storeDeviceToken(type) {
        // Create a random userid to store with it
       var user;

        if(clientid){
          user = { user: clientid, type: type, token: $rootScope.regId };
        }else{
         user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $rootScope.regId };
           }
        //console.log("Post token for registered device with data " + JSON.stringify(user));

         customerFactory.subcribe(JSON.stringify(user))
            .success(function (data, status) {
               // console.log("Token stored, device is successfully subscribed to receive push notifications.");
            })
            .error(function (data, status) {
               // console.log("Error storing device token." + data + " " + status);
            }
        );
    
    }

    function removeDeviceToken() {
        var tkn = {"token": $rootScope.regId};
        customerFactory.unsubcribe(JSON.stringify(tkn))
            .success(function (data, status) {
                console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
            })
            .error(function (data, status) {
                console.log("Error removing device token." + data + " " + status);
            }
        );
    }

  return {
    registerClient: function(cid){
      clientid=cid;
      register();
    },
     deleteClient: function(){
      removeDeviceToken();
    }

   };
    
})

// BOOKMARKS FUNCTIONS
.service('BookMarkService', function (_, $rootScope){

	this.bookmarkFeedPost = function(bookmark_post){

		var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_feed_bookmarks) ?
														JSON.parse(window.localStorage.ionFullApp_feed_bookmarks) : [];

		//check if this post is already saved

		var existing_post = _.find(user_bookmarks, function(post){ return post.link == bookmark_post.link; });

		if(!existing_post){
			user_bookmarks.push({
				link: bookmark_post.link,
				title : bookmark_post.title,
				date: bookmark_post.publishedDate,
				excerpt: bookmark_post.contentSnippet
			});
		}

		window.localStorage.ionFullApp_feed_bookmarks = JSON.stringify(user_bookmarks);
		$rootScope.$broadcast("new-bookmark");
	};

	this.bookmarkWordpressPost = function(bookmark_post){

		var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_wordpress_bookmarks) ?
														JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks) : [];

		//check if this post is already saved

		var existing_post = _.find(user_bookmarks, function(post){ return post.id == bookmark_post.id; });

		if(!existing_post){
			user_bookmarks.push({
				id: bookmark_post.id,
				title : bookmark_post.title,
				date: bookmark_post.date,
				excerpt: bookmark_post.excerpt
			});
		}

		window.localStorage.ionFullApp_wordpress_bookmarks = JSON.stringify(user_bookmarks);
		$rootScope.$broadcast("new-bookmark");
	};

	this.getBookmarks = function(){
		return {
			feeds : JSON.parse(window.localStorage.ionFullApp_feed_bookmarks || '[]'),
			wordpress: JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks || '[]')
		};
	};
})


// WP POSTS RELATED FUNCTIONS
.service('PostService', function ($rootScope, $http, $q, WORDPRESS_API_URL){

	this.getRecentPosts = function(page) {
		var deferred = $q.defer();

		$http.jsonp(WORDPRESS_API_URL + 'get_recent_posts/' +
		'?page='+ page +
		'&callback=JSON_CALLBACK')
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};


	this.getPost = function(postId) {
		var deferred = $q.defer();

		$http.jsonp(WORDPRESS_API_URL + 'get_post/' +
		'?post_id='+ postId +
		'&callback=JSON_CALLBACK')
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};

	this.shortenPosts = function(posts) {
		//we will shorten the post
		//define the max length (characters) of your post content
		var maxLength = 500;
		return _.map(posts, function(post){
			if(post.content.length > maxLength){
				//trim the string to the maximum length
				var trimmedString = post.content.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf("</p>")));
				post.content = trimmedString;
			}
			return post;
		});
	};

	this.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};

})


;
