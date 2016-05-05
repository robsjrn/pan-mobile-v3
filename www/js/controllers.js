angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

.controller('RegCtrl', function($scope, $ionicConfig) {

})

.controller('feedbackCtrl', function($scope,$state,customerFactory,$ionicLoading,$ionicPopup) {
 $scope.sendcomment=function(feedback){
  $ionicLoading.show({
      template: ' Sending Your Feedback '
    });
    customerFactory.Comments(feedback) 
    .success(function(data) { 
           $ionicLoading.hide(); 

                var alertPopup = $ionicPopup.alert({
                                  title: ' Feedback ',
                                  template: '<p> Feedback Received </p>'
                                });  
                                $state.go('app.landing');  
                                                                        
               }) 
             .error(function(data) {                     
                           $ionicLoading.hide();       
                          var alertPopup = $ionicPopup.alert({
                                  title: ' Internet Connection',
                                  template: ' Error Occurred <p>Kindly Check Your Connection and Retry </p>'
                                });      
              
               });

  };
})



// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $ionicLoading,$ionicPopup,customerFactory,$ionicAnalytics) {

  $ionicAnalytics.track('Login', {
    app_id: 1,
    app_name: 'Pan-Mobile-App'
  });

	$scope.doLogIn = function(){
    var user={};
      if ($scope.user.phone){
           user.username=$scope.user.phone;
           user.credential="phone";
           user.password=$scope.user.phonepassword;
      }else if ($scope.user.idnumber){
      	  user.username=$scope.user.idnumber;
      	  user.credential="idnumber";
           user.password=$scope.user.password;
      }
        $ionicLoading.show({
         template: 'Kindly Wait .....'
    });
     customerFactory.Login(user)
       .success(function(data) { 
           $ionicLoading.hide(); 
           $scope.showloading=false;
                  if (data.status ==1){
                     window.localStorage.setItem('username', user.username);
                     window.localStorage.setItem('password', user.password);
                    	$state.go('app.profile');
                  }
                 else {
                        var alertPopup = $ionicPopup.alert({
                                  title: ' Invalid Credential',
                                  template: ' Kindly Check Your Credential '
                                });    
                 }
             
                                                                        
               }) 
             .error(function(data) {                     
                           $ionicLoading.hide();        
                          var alertPopup = $ionicPopup.alert({
                                  title: ' Internet Connection',
                                  template: ' Error Occurred Trying to Retrieve <p> Your Details  Kindly</p><p>Check Your Connection and Retry </p>'
                                });      
              
               });
    

		
	
	};

	$scope.user = {};
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

.controller('ProfileCtrl', function($scope,  $state,$ionicPopover,$ionicLoading,$timeout,customerFactory) {
   var username = window.localStorage.getItem('username');


   $scope.gotobeneficiaries=function(productid){
    $state.go('app.client_beneficiary',{productid:productid});
  };
    $scope.gotospouse=function(productid){
    $state.go('app.client_spouse',{productid:productid});
  };
   $scope.gotochildren=function(productid){
    $state.go('app.client_children',{productid:productid});
  };

$scope.gotoparent=function(productid){
    $state.go('app.client_parents',{productid:productid});
  };
$scope.makeclaim=function(){
  $state.go('app.claim');
};
  

 $ionicLoading.show({
      template: 'Fetching Your Details...'
    });
   customerFactory.getCustomerDetails(username )
      .success(function(data) {  
            $scope.client=data; 
             $ionicLoading.hide();
                                                                        
               }) 
             .error(function(data) {                     
                           $ionicLoading.hide();           
                          var alertPopup = $ionicPopup.alert({
                                  title: '  Error ',
                                  template: 'Ooops, An Error Occurred Trying to Retrieve <p>Your Details  Kindly Retry Later</p>'
                                });      
              
               });

$scope.futuredays=function(data){

return data;
};

  


 $scope.logout=function(){
   $ionicLoading.show({
      template: 'Closing Your Profile...'
    });
   $timeout(function() {
       $ionicLoading.hide();
       $state.go('auth.login');
    }, 1000);
    
  };


})

.controller('LoginParentCtrl', function($scope,  $state,$ionicLoading,$stateParams,$ionicHistory,customerFactory) {
  $ionicLoading.show({
      template: 'Fetching Parents Details...'
    });
   customerFactory.getCustomerParents($stateParams.productid)
      .success(function(data) { 
            $ionicLoading.hide();  
            $scope.parents=data; 


               }) 
             .error(function(data) {                                                 
              $ionicLoading.hide(); 
               });

  $scope.back=function(){
     $ionicHistory.goBack();
   };
})
.controller('LoginChildrenCtrl', function($scope,  $state,$ionicLoading,$stateParams,$ionicHistory,customerFactory) {
   $ionicLoading.show({
      template: 'Fetching Children Details...'
    });
     customerFactory.getCustomerChildrens($stateParams.productid)
      .success(function(data) {  
            $scope.children=data; 
            $ionicLoading.hide(); 

               }) 
             .error(function(data) {                                                 
              $ionicLoading.hide(); 
               });
 $scope.back=function(){
     $ionicHistory.goBack();
   };
})

.controller('LoginBeneficiaryCtrl', function($scope, $filter, ageCalc,$ionicPopup,$state,customerFactory,$ionicLoading,$stateParams,$ionicHistory) {
  $scope.editbeneficiary=false;
  $scope.client={};
   $ionicLoading.show({
      template: 'Fetching Beneficiary Details...'
    });
   customerFactory.getCustomerBeneficiaries($stateParams.productid)
      .success(function(data) {  
             $scope.beneficiaries=data; 
             $ionicLoading.hide();                                                                             
               }) 
             .error(function(data) {                                                 
              $ionicLoading.hide(); 
               });
   $scope.back=function(){
     $ionicHistory.goBack();
   };

   $scope.editBeneficiary=function(){
    $scope.editbeneficiary=true;
   };

   $scope.savebeneficiary=function(det){
     $ionicLoading.show({
      template: 'Saving Beneficiary Details...'
    });
     var ben={};
       ben.details=det;
       ben.productid=$stateParams.productid;
     customerFactory.editbeneficiary(ben)
      .success(function(data) {  
             $scope.beneficiaries=data; 
             $scope.editbeneficiary=false;
             $ionicLoading.hide();                                                                             
               }) 
             .error(function(data) {                                                 
              $ionicLoading.hide(); 
               });

   };
   $scope.beneficiarydob=function(dStr){
        var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
           if (ageCalc.isDate(dtStr) ){
                var age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

                 if (age > 80 || age < 18 ){
                    
                        var alertPopup = $ionicPopup.alert({
                         title: 'Age Limit',
                         template: 'Sorry Your Beneficiary is Not of The Age Bracket (18-80 ) <p> Set for this Product </p>'
                       });


                       alertPopup.then(function(res) { 
                       $scope.client.beneficiary.age='';         
                       });
                     }else {
                     
                      $scope.client.beneficiary.age=age;
                     }
              } else {
               console.log("Error on age Calc");
              } 

        };

})


.controller('LoginSpouseCtrl', function($scope,  $state,$ionicLoading,$stateParams,$ionicHistory,customerFactory) {
   $ionicLoading.show({
      template: 'Fetching Spouse Details...'
    });
   customerFactory.getCustomerSpouse($stateParams.productid)
      .success(function(data) {  
             $scope.spouse=data; 
             $ionicLoading.hide();                                                                             
               }) 
             .error(function(data) {                                                 
              $ionicLoading.hide(); 
               });

    $scope.back=function(){
     $ionicHistory.goBack();
   };
})
.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};
})

.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'customercare@pan-africa.com',
					cc:      'customercare@pan-africa.com',
				   // bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'App Feedback',
					body:    'Feedback'
				});
			}
		);
	};
})

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation,GoogleMaps, $ionicLoading) {
GoogleMaps.init("AIzaSyCjqTsAy0MIDvr5olXmS9nuC4PdQR0PsKA");
	$scope.info_position = {
		lat: -1.2847,
		lng: 36.8215
	};

	$scope.center_position = {
		lat: -1.2847,
		lng: 36.8215
	};

	$scope.my_location = "";

       $scope.$on('event:show', function(event, data){
            $scope.map = data.mapdata; 
        });
  
	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Getting Your Location ...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
   
})

.controller('ClaimCtrl', function($scope,  $state,$ionicLoading,customerFactory,$ionicPopup,$ionicHistory,$ionicAnalytics) {

    $ionicAnalytics.track('Claims', {
    app_id: 1,
    app_name: 'Pan-Mobile-App'
  });


   $scope.claim={};
   $scope.back=function(){
     $ionicHistory.goBack();
   };

  $scope.saveClaim=function(clm){
      $ionicLoading.show({
         template: 'Kindly Wait Posting Your Claim.....'
    });

    customerFactory.MakeClaim($scope.claim)
    .success(function(data) { 
           $ionicLoading.hide(); 
          
                var alertPopup = $ionicPopup.alert({
                                  title: ' Claim ',
                                  template: '<p> Claim Received </p>'
                                }); 
                      $scope.claim="";          
                                                                        
               }) 
             .error(function(data) {                     
                           $ionicLoading.hide();       
                          var alertPopup = $ionicPopup.alert({
                                  title: ' Internet Connection',
                                  template: ' Error Occurred <p>Kindly Check Your Connection and Retry </p>'
                                });      
                   $scope.claim="";  
               });
 
  };
})


.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: -1.2847,
		lng: 36.8215
	};

	$scope.center_position = {
		lat: -1.2847,
		lng: 36.8215
	};

	$scope.my_location = "";

 $rootScope.$on('mapready', function(event, data) {
    $scope.map = data; 
});
	
	/*$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	}); */

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})

.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
})

// SETTINGS
.controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('auth.walkthrough');
			}
		});

	};
})

// TINDER CARDS
.controller('TinderCardsCtrl', function($scope, $http) {

	$scope.cards = [];


	$scope.addCard = function(img, name) {
		var newCard = {image: img, name: name};
		newCard.id = Math.random();
		$scope.cards.unshift(angular.extend({}, newCard));
	};

	$scope.addCards = function(count) {
		$http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
			angular.forEach(value.data.results, function (v) {
				$scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
			});
		});
	};

	$scope.addFirstCards = function() {
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png","Nope");
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
	};

	$scope.addFirstCards();
	$scope.addCards(5);

	$scope.cardDestroyed = function(index) {
		$scope.cards.splice(index, 1);
		$scope.addCards(1);
	};

	$scope.transitionOut = function(card) {
		console.log('card transition out');
	};

	$scope.transitionRight = function(card) {
		console.log('card removed to the right');
		console.log(card);
	};

	$scope.transitionLeft = function(card) {
		console.log('card removed to the left');
		console.log(card);
	};
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){
			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {

	$scope.post = post_data.post;
	$ionicLoading.hide();

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $state,$cordovaCamera,fileUpload,API_ENDPOINT) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.upload = function(image) {
		window.plugins.socialsharing.share(null, null, image);
  
	};

	$scope.shareAll = function() {
	//	window.plugins.socialsharing.share(null, null, $scope.images);
     var file = $scope.images;

               var uploadUrl = API_ENDPOINT.url +"Umash/rest/client/uploadclaimdoc";
               fileUpload.uploadFileToUrl(file,uploadUrl);
               $state.go('app.claim');
	};
})

.controller('UmashEntryCtrl', function($scope,$state,$ionicHistory, $filter,ageCalc,$ionicPopup,$ionicAnalytics, $ionicActionSheet,LS) {
      
   $ionicAnalytics.track('Umash-Entry', {
    app_id: 1,
    app_name: 'Pan-Mobile-App'
  });

       $scope.client={}; 

     $scope.dctype={};
     $scope.client.stage="umashEntry";
     $scope.client.doctype={};
     $scope.client.doctype.name="National id";
      $scope.client.doctype.docid=1;

       $scope.dctype.maxlength=14;
       $scope.dctype.minlength=4;

     $scope.client.children=[];
     $scope.client.spouse={};

     $scope.back=function(){
     	$ionicHistory.goBack();
     };
 
$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>National Id</b>' },
       { text: '<b>Passport</b>' }       ,
       { text: '<b>Alien id</b>' }
     ],
    
     titleText: 'Select Your identification',
     cancel: function() {
           	
        },
     buttonClicked: function(index) {
    
       switch (index){
                case 0 :
                  //Handle Share Button
                   $scope.client.doctype.name="National id";
                   $scope.client.doctype.docid=1;
                   $scope.dctype.maxlength=14;
                   $scope.dctype.minlength=4;
                  return true;
                case 1 :
                  //Handle Move Button
                   $scope.client.doctype.name="passport";
                   $scope.client.doctype.docid=2;
                    $scope.dctype.maxlength=12;
                    $scope.dctype.minlength=2;
                  return true;
                case 2 :
                  //Handle Move Button
                   $scope.client.doctype.name="Alien id";
                   $scope.client.doctype.docid=3;
                    $scope.dctype.maxlength=14;
                    $scope.dctype.minlength=4;
                 return true;    
              }
       
     }
   });

   
 };



  $scope.clientdateChange=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        $scope.client.age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if ($scope.client.age > 60 || $scope.client.age < 18 ){
                $scope.client.dob="";
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry You Are Not of The Age Bracket (18-60 ) <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) {          
               });
             }else {
               $scope.showClientAge=true;
             }
      } else {
       console.log("Error on age Calc");
      } 

};

 $scope.PolicyDetails=function(){
  $scope.client.sumassured=200000;
  $scope.client.premiumpayable=2400;
   $scope.client.premiumselected=2400;
  $scope.client.productname="umash";
   LS.setData($scope.client);
    $state.go('registration.other_members');
  };

})


.controller('cashPlanCtrl', function($scope,$state,$ionicHistory,$ionicAnalytics, $ionicActionSheet, client,$filter,ageCalc,$ionicPopup,LS) {
   $ionicAnalytics.track('CashPlan-Entry', {
    app_id: 1,
    app_name: 'Pan-Mobile-App'
  });
   
     $scope.client={}; 
         
                    $scope.client.doctype={};
                    $scope.client.stage="cashplanEntry";
                      $scope.client.doctype.name="National id";
                      $scope.client.doctype.docid=1;
                    $scope.client.beneficiary={};
    $scope.client.spouse={};
    $scope.client.children=[];
    $scope.dctype={};
      $scope.dctype.maxlength=14;
       $scope.dctype.minlength=4;
        $scope.showsumassured=false;
        $scope.sumassuredselected=false;


 $scope.back=function(){
     	$ionicHistory.goBack();
     };

$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>National Id</b>' },
       { text: '<b>Passport</b>' }       ,
       { text: '<b>Alien id</b>' }
     ],
    
     titleText: 'Select Your identification',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       switch (index){
                case 0 :
                  //Handle Share Button
                  $scope.client.doctype.name="National id";
                  $scope.client.doctype.docid=1;
                   $scope.dctype.maxlength=14;
                    $scope.dctype.minlength=4;
                  return true;
                case 1 :
                  //Handle Move Button
                   $scope.client.doctype.name="passport";
                   $scope.client.doctype.docid=2;
                  return true;
                case 2 :
                  //Handle Move Button
                   $scope.client.doctype.name="Alien id";
                   $scope.client.doctype.docid=3;
                  return true;    
              }
       
     }
   });

   
 };

  $scope.selectSumassured = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>100,000</b>' },
       { text: '<b>200,000</b>' }      
     ],
    
     titleText: 'Select Your Sum Assured',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       switch (index){
                case 0 :
                  //Handle Share Button
                  $scope.client.sumassured=100000;
                  $scope.client.premiumpayable=1800;
                  $scope.client.premiumselected=1800;
                  $scope.showsumassured=true;
                  $scope.sumassuredselected=true;
                  return true;
                case 1 :
                  //Handle Move Button
                  $scope.client.sumassured=200000;
                  $scope.client.premiumpayable=3600;
                  $scope.client.premiumselected=3600;
                  $scope.showsumassured=true;
                  $scope.sumassuredselected=true;
                  return true;
               
              }
       
     }
   });

   
 };

 

  $scope.clientdateChange=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        $scope.client.age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if ($scope.client.age > 60 || $scope.client.age < 18 ){
            $scope.client.dob="";
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry You Are Not of The Age Bracket (18-60 ) <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) {          
               });
             }else {
               $scope.showClientAge=true;
             }
      } else {
       console.log("Error on age Calc");
      } 

};

 $scope.PolicyDetails=function(){
  $scope.client.productname="cash-plan";
   // client.saveClient($scope.client);
    LS.setData($scope.client);
    $state.go('registration.other_members');
  };

  })

.controller('OthermemberCtrl', function($scope, $ionicActionSheet,$ionicHistory, $state,ageCalc,$filter,$ionicPopup,$ionicModal,premiumcalculation,LS) {

  if (LS.getData()===null){
     var alertPopup = $ionicPopup.alert({
               title: 'Client Details',
               template: 'You Need to Add Your Details First '
            });

            alertPopup.then(function(res) {
               $ionicHistory.goBack();
            });

  }else {

    $scope.client=LS.getData();
   // console.log($scope.client);
  }

   $scope.addBeneficiary=function(){
     $state.go('registration.beneficiary_details');
   };
 


   premiumcalculation.setPremium($scope.client.premiumpayable);
  
    

 
   $scope.otherMembers = function() {
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Children</b>' },
       { text: '<b>Parent(s)</b>' }       ,
       { text: '<b>Spouse</b>' }
     ],
    
     titleText: 'Select Other Members',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       switch (index){
                case 0 :
                    $state.go('registration.children_details');
                  return true;
                case 1 :
                  $state.go('registration.parents_details');
                  return true;
                case 2 :
                     $state.go('registration.spouse_details');
                  return true;    
              }
       
     }
   });

 };
 


 
 

   $scope.landingPage=function(){
    $ionicHistory.goBack();
  };


$scope.next=function(){
         LS.setData($scope.client);
     $state.go('registration.confirm_details');
  };


})





.controller('BeneficiaryCtrl', function($scope,$state,LS,ageCalc,$filter,$ionicPopup) {
 $scope.client=LS.getData();
 $scope.client.stage="beneficiaryEntry";
  $scope.saveBeneficiarydet=function(ben){
   console.log(ben);
    if (typeof ben!='undefined'){
       $scope.client.beneficiary=ben;
       $scope.client.beneficiaryAdded=true;
       LS.setData($scope.client);
      // console.log($scope.client)
         $state.go('registration.other_members');      
    }
      
 
};

$scope.beneficiarydob=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        var age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if (age > 80 || age < 18 ){
            
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry Your Beneficiary is Not of The Age Bracket (18-80 ) <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) { 
               $scope.client.beneficiary.age='';         
               });
             }else {
             
              $scope.client.beneficiary.age=age;
             }
      } else {
       console.log("Error on age Calc");
      } 

};

})

.controller('ParentCtrl', function($scope,$state,LS,ageCalc,$filter,$ionicPopup,premiumcalculation) {
  $scope.parents=[];
     $scope.client=LS.getData();
     $scope.client.stage="parentEntry";
    
   $scope.back=function(){
     $scope.client.parentdetails=$scope.parents;
   if ($scope.parents.length > 0){
        $scope.client.parentAdded=true;
   }  
  LS.setData($scope.client);
 $state.go('registration.other_members');
};

$scope.clearparent=function(){
  $scope.btnAddparent=false;
   $scope.client.parent=null;
};



$scope.addparent=function(parent){

      if ($scope.parents.length == 4){
       var alertPopup = $ionicPopup.alert({
                 title: 'Parent Limit',
                 template: 'You Cannot Add More than 4 Parents'
               });

               alertPopup.then(function(res) {
                 $scope.btnAddparent=true;
               
               });
    }else{
       

   $scope.parents.push(parent);
    $scope.client.premiumpayable=premiumcalculation.calculate($scope.client.premiumselected,'parent',parent.age);
    $scope.btnAddparent=true;
    $scope.client.parent=null;
  }
};

$scope.delParent=function(idx){
    
  $scope.client.premiumpayable=premiumcalculation.negcalculate($scope.client.premiumselected,'parent',0); 
      $scope.parents.splice($scope.parents.indexOf(idx), 1);
    

      
};


$scope.parentChange=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        var age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if (age > 80 || age < 18 ){
            
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry Your Parent is Not of The Age Bracket (18-80 ) <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) { 
               $scope.client.parent='';         
               });
             }else {
              $scope.showParentage=true;
              $scope.client.parent.age=age;
             }
      } else {
       console.log("Error on age Calc");
      } 

};


  })

.controller('ChildCtrl', function($scope,$state,LS,ageCalc,$filter,$ionicPopup,premiumcalculation) {
 $scope.client=LS.getData();
 $scope.client.stage="childEntry";
 $scope.children=[];
 $scope.clearChild=function(){
  $scope.btnAddchild=false;
   $scope.client.child="";

};
 $scope.back=function(){
     $scope.client.children=$scope.children;

   if ($scope.client.children.length > 0){

        $scope.client.childrenAdded=true;
   }  
  LS.setData($scope.client);
 $state.go('registration.other_members');
};

 

   $scope.addChild=function(child){

        if ($scope.children.length == 6){
       var alertPopup = $ionicPopup.alert({
                 title: 'Child Limit',
                 template: 'You Cannot Add More than 6 Children'
               });

               alertPopup.then(function(res) {
               
               });
    }else{
      console.log(child);
   $scope.children.push(child);
   console.log($scope.client.premiumselected);
  $scope.client.premiumpayable=premiumcalculation.calculate($scope.client.premiumselected,'child',0); 
  $scope.btnAddchild=true;
      $scope.childAdded=true;
      $scope.client.child=null;
}
};

$scope.delChild=function(idx){

  $scope.client.premiumpayable=premiumcalculation.negcalculate($scope.client.premiumselected,'child',0); 
      $scope.children.splice($scope.children.indexOf(idx), 1);
      
};

$scope.childdate=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        var age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if (age > 24  ){
            
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry Your Child is Above the Age limit  <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) { 
               $scope.client.child='';         
               });
             }else {
            
              $scope.client.child.age=age;
               $scope.showchilddob=true;
             }
      } else {
       console.log("Error on age Calc");
      } 

};
    

})

.controller('SpouseCtrl', function($scope,$state,LS,ageCalc,$filter,$ionicPopup,premiumcalculation) {
 $scope.client=LS.getData();
 $scope.client.stage="spouseEntry";
    $scope.saveSpouse=function(sp){
         if (typeof sp!='undefined'){
            $scope.client.spouse=sp;
            $scope.client.premiumpayable=premiumcalculation.calculate($scope.client.premiumselected,'spouse',0);   
            $scope.client.spouseAdded=true;
              LS.setData($scope.client);
              
         }   

         $state.go('registration.other_members'); 
    
  };
 

$scope.back=function(){
if (typeof sp!='undefined'){
            $scope.client.spouse=sp;
            $scope.client.premiumpayable=premiumcalculation.calculate($scope.client.premiumselected,'spouse',0);   
            $scope.client.spouseAdded=true;
              LS.setData($scope.client);
              
         }   
 $state.go('registration.other_members');
};



$scope.spousedob=function(dStr){
var dtStr = $filter('date')(new Date(dStr),'dd/MM/yyyy');
   if (ageCalc.isDate(dtStr) ){
        var age = ageCalc.calculate(ageCalc.parseDate(dtStr), new Date());

         if (age > 60 || age < 18 ){
            
                var alertPopup = $ionicPopup.alert({
                 title: 'Age Limit',
                 template: 'Sorry Your Spouse is Not of The Age Bracket (18-60 ) <p> Set for this Product </p>'
               });


               alertPopup.then(function(res) { 
               $scope.client.spouse.age='';         
               });
             }else {
              $scope.showspousedob=true;
              $scope.client.spouse.age=age;
             }
      } else {
       console.log("Error on age Calc");
      } 

};


 })


.controller('ConfirmCtrl', function($scope,$state,  client,$ionicPopup,LS,$ionicHistory) {
    $scope.client=LS.getData();
  // console.log($scope.client);
   $scope.client.stage="confirmEntry";
   $scope.parents=$scope.client.parentdetails;
   $scope.children=$scope.client.childrendetails;
   if (typeof $scope.client.idnumber=="undefined"){
          var alertPopup = $ionicPopup.alert({
                 title: 'Client Details ',
                 template: 'Kindly Provide Your <p> Details..</p>'
               });

               alertPopup.then(function(res) {
                  $ionicHistory.goBack();
               });
      }

  $scope.PolicyDetails=function(){
    $state.go('registration.other_members');
  };

  
  $scope.termsAndCondition=function(){
       if (typeof $scope.client.beneficiary=="undefined"){
          var alertPopup = $ionicPopup.alert({
                 title: 'Beneficiary',
                 template: 'Kindly Provide a <p> Beneficiary </p>'
               });

               alertPopup.then(function(res) {
                 $state.go('registration.other_members');
               });
      }else {
          LS.setData($scope.client);
         $state.go('registration.termsandcondition_details');
   }
  };

})
.controller('TandCCtrl', function($scope,  $state,$ionicLoading,$ionicPopup,client,customerFactory,LS,ConnectivityMonitor,PushProcessingService,$ionicAnalytics) {
  $scope.client=LS.getData();
  $scope.client.stage="tcEntry";

  $ionicAnalytics.track('Umash-Entry', {
    client_id: $scope.client.idnumber,
    app_name: 'Pan-Mobile-App'
  });

  $scope.save=function(){
  	  if(ConnectivityMonitor.isOnline()){ 
         $ionicLoading.show({
            template: 'Saving Your details ...'
          });

         $scope.client.agreed=true;
        customerFactory.RegisterUser($scope.client)
         .success(function(data) {
                
             if (data.code==1){
                   $scope.client.invoice = data.invoice;
                     LS.setData($scope.client);  
                     try {         
                      PushProcessingService.registerClient($scope.client.idnumber); 
                      }catch(e){

                      }                      
                   $ionicLoading.hide();
              $state.go('registration.payment_details');
             }

             else if (data.code==6 || data.code==5) {
              $ionicLoading.hide();
          
                try {         
                      PushProcessingService.registerClient($scope.client.idnumber); 
                      }catch(e){

                      } 
                
                 var alertPopup = $ionicPopup.alert({
                 title: 'Product Response',
                 template: data.StatusMessage
               });

               alertPopup.then(function(res) {
              
                   $state.go('registration.confirm_details');
               
               });
             }else {
              $scope.client.stage="appError";
              LS.setData($scope.client);
              $ionicLoading.hide();
                   var alertPopup2 = $ionicPopup.alert({
                 title: 'Application Error',
                 template: 'An Error Has Occured .Your Data Has Been Saved <p> Kindly Retry Later </p>'
               });

               alertPopup2.then(function(res) {
              
                   $state.go('app.life-products');
               
               });

             }
              
                                                                     
               }) 
             .error(function(data) {

                $scope.client.stage="appError";
                 LS.setData($scope.client);                
                  $ionicLoading.hide();
                      var alertPopup3 = $ionicPopup.alert({
                                  title: ' Server Error ',
                                  template: ' An Error Occurred Try To Communicate With The Server <p> Kindly Retry Later </p>'
                                }); 
                      alertPopup3.then(function(res) {
                         $state.go('registration.confirm_details');
                       });
              
               });
         }else {
              $scope.client.stage="appError";
              LS.setData($scope.client);
           var alertPopup = $ionicPopup.alert({
                                  title: ' Sorry No Internet Connection ',
                                  template: ' Kindly Connect To The Internet <p> And Retry  </p>'
                                }); 
        }        
  };


  $scope.next=function(){
     $state.go('registration.confirm_details');
  };

   $scope.disagree = function () {

    //go to home page 
    $scope.client.agreed=false;

    customerFactory.RegisterUser($scope.client)
         .success(function(data) {
                PushProcessingService.registerClient($scope.client.idnumber);
                $ionicLoading.hide();
              $state.go('app.life-products');
              
                                                                     
               }) 
             .error(function(data) { 
                 var alertPopup = $ionicPopup.alert({
                                  title: ' Server Error or No Connection ',
                                  template: ' An Error Occurred <p> Kindly Retry Later </p>'
                                }); 
                      alertPopup.then(function(res) {
                          $state.go('app.life-products');
                       });
              
              
               });
       



   };
  

})


.controller('paymentoptionsCtrl', function($scope, $ionicAnalytics,$stateParams,$ionicPopup,$state,customerFactory,$ionicLoading,LS) {
 $scope.client=LS.getData();
 $scope.mpesa={};
 $scope.mpesa.phonenumber=$scope.client.contact;
 $scope.client.stage="paymentEntry";
 
   $ionicAnalytics.track('Payment-Entry', {
    client_id: $scope.client.idnumber,
    app_name: 'Pan-Mobile-App'
  });

var confirmPopup ;
$ionicAnalytics.track('Payment-Entry', {
    invoice_id: $scope.client.invoice,
    app_name: 'Pan-Mobile-App'
  });
$scope.done=function(){
  $state.go('app.life-products');
};

  $scope.mpesapayment=function(mpesa){

   if (mpesa.phonenumber.substring(0, 1) === 0) { 
        mpesa.phonenumber = "254"+mpesa.phonenumber.substring(1);
      }
    else if (mpesa.phonenumber.substring(0, 1) == '+'){
              mpesa.phonenumber = mpesa.phonenumber.substring(1);
    }  
    else {
            mpesa.phonenumber = "254"+mpesa.phonenumber;
    }  
    mpesa.amount = $scope.client.premiumpayable;
    
    var data={};
       data.phonenumber=mpesa.phonenumber;
       data.amount=mpesa.amount;
       data.virtualaccount = $scope.client.invoice;
  $ionicLoading.show({
      template: 'Requesting Mpesa transaction...'
    });
         customerFactory.MpesaRequest(data)
             .success(function(data) {
              $scope.transactionid=data;
              $scope.diasbleMpesaBtn=true;
               $ionicLoading.hide(); 
               LS.setData(null);
                       var alertPopup = $ionicPopup.alert({
                                  title: 'Mpesa',
                                  template: 'Request Sent to Mpesa'
                                });
                        alertPopup.then(function(res) {
                           $state.go('app.life-products');
                       });
                       
                                                                     
               }) 
             .error(function(data) {
             
              $ionicLoading.hide();
              LS.setData(null);
              var alertPopup = $ionicPopup.alert({
                                  title: 'Mpesa',
                                  template: 'Request Sent to Mpesa '
                                }); 
              $scope.diasbleMpesaBtn=true;
               alertPopup.then(function(res) {
                           $state.go('app.life-products');
                       });
               });
           

  };

   



  })



;
