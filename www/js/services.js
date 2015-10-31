angular.module('starter.services', [])
    .factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Location1 Bin1',
    humidity:[11, 9, 5, 12, 14, 8, 7],
    fillTrend:[11,4,3,7,2,11,7],
    selected:false,
    label:{
            label:'Location1 Bin1'
      }
  }, {
    id: 1,
    name: 'Location2 Bin2',
    humidity:[4, 8, 5, 3, 6, 5, 3],
    fillTrend:[10,40,13,17,20,11,17],
    selected:false,
      label:{
            label:'Location2 Bin2'
      }
  }, {
    id: 2,
    name: 'Location3 Bin3',
     humidity:[1,2,3,4,5,6,7],
     fillTrend:[15,20,10,15,20,10,17],
      selected:false,
      label:{
            label:'Location3 Bin3'
      }
  }, {
    id: 3,
    name: 'Location4 Bin4',
    humidity:[5,6,3,9,10,15,11],
    fillTrend:[15,25,15,25,20,10,17],
    selected:false,
    label:{
            label:'Location4 Bin4'
      }
  }, {
    id: 4,
    name: 'Location5 Bin5',
    humidity:[4,4,6,7,2,8,10],
    fillTrend:[1,2,3,4,5,6,7],
    selected:false,
    label:{
            label:'Location5 Bin5'
      }
  }];
    
    var filterOption=[{
    option:'Humidity'
    },{
    option:'Fill Trend'
    }]
    
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    allOption: function(){
    return filterOption;
    }
      
  };
});

        