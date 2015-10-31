angular.module('starter.controllers', ['ui.chart'])

.controller('DashCtrl', function($scope) {

   // -------------------------
	// ---Initialize----------
	// -------------------------
	var latitude;
	var longitude;   
	var myLatLng = [ {
		lat : 12.960586,
		lng : 77.641786
	}, {
		lat : 12.968636,
		lng : 77.660261
	}, {
		lat : 12.970895,
		lng : 77.681826
	}, {
		lat : 12.971271,
		lng : 77.712082
	}, {
		lat : 12.974993,
		lng : 77.732166
	}, {
		lat : 12.941870,
		lng : 77.738131
	}, {
		lat : 12.973948,
		lng : 77.614760
	} ];

	var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	var directionsService = new google.maps.DirectionsService();
	// -------------------------
	// ---Map Display----------
	// -------------------------
	var mapOptions = {
			zoom : 13,
			center : new google.maps.LatLng(12.9450442, 77.6779853),
			mapTypeId : google.maps.MapTypeId.TERRAIN
	}
	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// ---------------------------------------------------------
	// ---Create the search box and link it to the UI element---
	// ---------------------------------------------------------
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	// ------------------------------------------
	// ---Geocode to get latlong from place------
	// ------------------------------------------
	var geocoder;
	geocoder = new google.maps.Geocoder();
	 $("#clear").on("click", function() { location.reload(); });
	document.getElementById('submit').addEventListener('click', function() {	
		geocodeAddress(geocoder, $scope.map, myLatLng);	
	});

	function geocodeAddress(geocoder, resultsMap, myLatLng) {
		
		address = document.getElementById('pac-input').value;
		geocoder.geocode({
			'address' : address
		}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				latitude = results[0].geometry.location.lat();
				longitude = results[0].geometry.location.lng();	
				// First position - Starting Place
				myLatLng.unshift({
					lat : latitude,
					lng : longitude
				});
				getShortestPath(myLatLng, directionsDisplay, directionsService);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
	// -------------------------
	// ---Get data from DB------
	// -------------------------

	// -------------------------
	// ---Markers Display-------
	// -------------------------
	function getShortestPath(myLatLng, directionsDisplay, directionsService) {
		// -------------------------
		// ---Variables ----------
		// -------------------------
		var myLatLng1;
		var myLatLng2;
		var address;
		directionsDisplay = [];
		var t = [];  //temporary array
		var fin = []; //final array
		var request;
		var x,p1,p2;
		var distance = 0;
		var idis = 0;
		var covered = [];
		$scope.markers = [];

		// Last Position - Dumping Place
//		myLatLng.push({
//		lat : 12.916167,
//		lng : 77.636272
//		});
		var i = 0;
		var j = 0;
		var holi = 0;
		var mini = 0;
		var minj = 0;
		var min ;
		covered.push(mini);
		
		// -------------------------
		// ---Direction Display-----
		// -------------------------
		for (i = 0; i < 7; i++) {

			$scope.markers.push(new google.maps.Marker({
				map : $scope.map,
				position : myLatLng[i]
			}));
			holi = minj;
			min = 999999999999999999999999999999999999999999999999999;
			mini = 0;
			minj = 0;
			idis = 0;
			distance = 0;
			// Insert a new row (array)
			//t[i] = [];
			for (j = 1; j < 7; j++) {
				if (covered.indexOf(j) == -1){
					p1 = new google.maps.LatLng(myLatLng[holi]["lat"],myLatLng[holi]["lng"]);
					p2 = new google.maps.LatLng(myLatLng[j]["lat"],myLatLng[j]["lng"]);
					if (holi == j){
						distance = 0;
					}
					else {
						distance =   (google.maps.geometry.spherical.computeDistanceBetween(p1,p2) / 1000).toFixed(2);
						//convert string to number
						idis = Number(distance);
						if (idis < min){
							min = idis;
							mini = holi;
							minj = j;}}

					//t[i][j] = distance;
					//console.log('the value of i is'+i+'j is'+j+'distance'+distance);

				}
			}
			covered.push(minj);
			request = {
					origin : myLatLng[holi],
					destination : myLatLng[minj],
					travelMode : google.maps.TravelMode.DRIVING
			};

			directionsService.route(request,  function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {							
					directionsDisplay[i] = new google.maps.DirectionsRenderer({suppressMarkers: true});
					directionsDisplay[i].setDirections(response);						
					directionsDisplay[i].setMap($scope.map);						
				} 
			});		



		}
	}
})

.controller('LoginCtrl', function($scope) {
    
$scope.redirect = function() { window.location = "#/tab-dash.html"; };

})

.controller('ChatsCtrl', function($scope, Chats, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.filterOption=Chats.allOption();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
    
    $scope.clearSearch=function(){
       $scope.Search='';
    };
    
    $scope.SelectedLocation=[];
    $scope.doSomething=function(option){
        
        for (var i = 0; i < $scope.chats.length; i++) {
        if ($scope.chats[i].selected) {
           $scope.SelectedLocation.push($scope.chats[i]);
        }
        }
        $state.go('tab.chat-detail',{selectedBins:$scope.SelectedLocation,queryHeader:option});
    }
   
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.selectedBins=[];
    $scope.someData=[];
    $scope.series=[];
  $scope.selectedBins =$stateParams.selectedBins ;
  $scope.queryOption=$stateParams.queryHeader;
  $scope.ticks=[[1,'Mon'], [2,'Tue'], [3,'Wed'], [4,'Thur'], [5,'Fri'], [6,'Sat'], [7,'Sun']]
    $scope.yAxisLabel='';
   for (var i=0;i<$scope.selectedBins.length;i++)
   {
       if($scope.queryOption==='Fill Trend')
       {
           $scope.someData.push($scope.selectedBins[i].fillTrend);
           $scope.yAxisLabel='Fill Trend(%)'
       }
       else if ($scope.queryOption==='Humidity')
       {
          $scope.someData.push($scope.selectedBins[i].humidity);
            $scope.yAxisLabel='Humidity(%)'
       }
      
       
       $scope.series.push($scope.selectedBins[i].label);
   }
         
 $scope.chart=  {
   stackSeries: true,
      animate : false,
       showMarker: true,
       highlighter: {
        show: true,
        showTooltip: false
       },
       seriesDefaults: {
           fill: true,
       },
       series:$scope.series ,
       legend: {
        show: true,
        placement: 'outsideGrid',
        location: 'n'
       },
       grid: {
        drawBorder: false,
        shadow: false,
        background: 'white'
       },
     axesDefaults: {
            labelRenderer: jQuery.jqplot.CanvasAxisLabelRenderer,
        },
       axes: {
           xaxis: {
              label:'Week',
              ticks: $scope.ticks,
              drawMajorGridlines: true
          },
            yaxis: {
                label: $scope.yAxisLabel,
                drawMajorGridlines: true
                
            }
        }
       
      };
    $scope.myChartOpts =  $scope.chart;
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
