// var firebase = require("firebase");
// require('firebase/database');


var config = {
  apiKey: "AIzaSyD998TOVqJq0gV5Z85PToNjHbjVtr6VARk",
  authDomain: "experimental-mobile-play.firebaseapp.com",
  databaseURL: "https://experimental-mobile-play-default-rtdb.firebaseio.com/",
  projectId: "experimental-mobile-play",
  storageBucket: "experimental-mobile-play.appspot.com",
  messagingSenderId: "G-ZQPYG8XXL8"
};


var db = db = firebase.initializeApp(config).database();

var { LMap, LTileLayer, LMarker } = Vue2Leaflet;
var userRefs = db.ref('users');

new Vue({
  el: '#app',
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      myUuid : localStorage.getItem('myUuid'),
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      watchPositionId : null
    }
  },
  mounted(){
    var vm = this
    if (!vm.myUuid) {
      vm.myUuid = vm.guid();
      localStorage.setItem('myUuid', vm.myUuid);
    }else{
      
      vm.watchPositionId = navigator.geolocation.watchPosition(vm.successCoords, vm.errorCoords);
      
    }
    
  },
  firebase: {
    users: userRefs.limitToLast(25)
  },
  methods:{
    successCoords(position) {
    var vm = this
    if (!position.coords) return
      
      userRefs.child(vm.myUuid).set({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        timestamp: Math.floor(Date.now() / 1000)
      })
      vm.center = L.latLng([position.coords.latitude, position.coords.longitude])
      vm.marker = L.latLng([position.coords.latitude, position.coords.longitude])
    },
    errorCoords() {
      console.log('Unable to get current position')
    },
    formatLocation(lat, lng){
      return L.latLng(lat, lng)
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  }
});