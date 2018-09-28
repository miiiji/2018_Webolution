var all_check = document.getElementById('inlineCheckbox4');
var C_check = document.getElementById('inlineCheckbox1');
var Java_check = document.getElementById('inlineCheckbox2');
var Python_check = document.getElementById('inlineChecbox3');
var checkbox_best = document.getElementsByClassName('language');
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

//checkbox 여부 확인 
    console.log($('input:checkbox[name="lang"]'));
    $('input:checkbox[name="lang"]').each(function(index) {
        //this.checked = true; //checked 처리
        this.addEventListener('change',function(){
            if(this.checked) {
                
                console.log(this.value);
            } 
        })
   });
  
const query = firebase.database().ref('game/');

   query.once('value')
   .then(snapshot => {
     const points = {}
     const users = snapshot.val()
    console.log(users)
    var str="";
      for (const Language of Object.keys(users)) {
        const language = users[Language];
       for (const lang of Object.keys(language)){
           // lang - C, Java
           const lev = language[lang];
            for(const Level of Object.keys(lev)){
                const num = lev[Level];
                // num - level 1 2 3 
                for(const number of Object.keys(num)){
                    const final = num[number];
                    for(const r_final of Object.keys(final)){
                        console.log(final[r_final]);
                        console.log(r_final);
                        str+="<div class=\"col-lg-4 col-sm-6 portfolio-item\">"+
                        "<div class=\"card h-100\">"+"<a href="+final[r_final]+"><img class=\"card-img-top\" src="+final[r_final]+" alt=\"\"></a>"+
                        "<div class=\"card-body\">"+
                        "<h4 class=\"card-title\">"+
                        "<a href="+final[r_final]+">"+"["+lang+"]   "+r_final+"</a>"+
                       "</h4></div></div></div></div>"     
                    }
                }
            }
       }

    }
    console.log(str);
    $('.row').html(str);
     }
   );
   
   function showQuiz(){

   }




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