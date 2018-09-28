
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVPSjURoYlQqrWLmEdnxfBHZl26Zm7EAg",
    authDomain: "webolution-2b82e.firebaseapp.com",
    databaseURL: "https://webolution-2b82e.firebaseio.com",
    projectId: "webolution-2b82e",
    storageBucket: "webolution-2b82e.appspot.com",
    messagingSenderId: "22529361245"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var ref = database.ref('game/');

ref.once('value').then(function(snapshot){
		snapshot.forEach(function(childSnapshot){
		    var childKey = childSnapshot.key;
		    var childData = childSnapshot.val();
            console.log(childKey);
            console.log(childData);
		});
	});
  

  //sign out
function signOut() {
    if(!confirm("Do you really want to log out?")) {
        return;
    }
    firebase.auth().signOut().then(function() {
    		console.log("로그아웃 되었습니다.");
        location.reload();
    }, function(e) {
        lastWork = "authorized";
        $("#error #errmsg").html(e.message)
        $("#error").show();
        $("#authorized").hide();
    });
}