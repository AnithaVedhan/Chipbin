
var app = angular.module('geo', []);
app.controller('myC', function ($scope) {
//-------------------------	  	
//---Map Display----------
//-------------------------	  
	  var mapOptions = {
		        zoom: 13,
		        center: new google.maps.LatLng(12.9450442, 77.6779853),
		        mapTypeId: google.maps.MapTypeId.TERRAIN
		    }

	  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  

//-------------------------	  
//---Markers Display-------
//-------------------------	  	  
		    $scope.markers = [];
		    var myLatLng1 = {lat: 12.9450442, lng: 77.6779853};
		    var myLatLng2 = {lat: 12.95842, lng: 77.65004};
		    var myLatLng = [{lat: 12.96390, lng: 77.65167},{lat: 12.96708, lng: 77.66008},{lat: 12.96081, lng: 77.68339},{lat: 12.95416, lng: 77.73076},{lat: 12.91249, lng: 77.73516}];
		    var i = 0;
		    for (i = 0; i < 5; i++) {		     
		    $scope.markers.push(new google.maps.Marker({map: $scope.map, position: myLatLng[i] }));
		    }
//-------------------------	  
//---Direction Display-----
//-------------------------	
		
			  var directionsService = new google.maps.DirectionsService();
			  var directionsDisplay = new google.maps.DirectionsRenderer();
			  
			  var waypts = [];
			  for (var i = 0; i < 5; i++) {		      
		            waypts.push({
		            location: myLatLng[i],
		            stopover:true});
		            }		            
			  
			    var request = {
				        origin: myLatLng1,
				        destination: myLatLng2,	
				        waypoints:waypts,
				        optimizeWaypoints: true,
				        travelMode: google.maps.TravelMode.DRIVING
				    };
				    directionsService.route(request, function(response, status) {
				      if (status == google.maps.DirectionsStatus.OK) {
				        directionsDisplay.setDirections(response);
				      }
				    });		directionsDisplay.setMap($scope.map);
                    });
