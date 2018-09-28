<<<<<<< HEAD
  //sign up 하는 함수
=======


  //sign up 하는 함수 
>>>>>>> ff80c7a6c9dcfe6a4d760bc4a870631e75ee1913
  function signUp() {
    var id = $("#su_id").val();
    var pw = $("#su_pw").val();
    var cf = $("#su_cf").val();

<<<<<<< HEAD
    if (pw != cf) {
      alert("Password does not match the confirm password.");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(id, pw)
      .then(function() {
        alert("Signed Up!");
        var userRef = database.ref('/OperatorProfile/' + id.split('@')[0]);
        var data = {
          E_mail: id
        }
        userRef.set(data);
        console.log(id.split('@')[0]);
        location.href = "./Main.html";

      })
      .catch(function(e) {
        alert("bb");
        $("#error #errmsg").html(e.message);
        $("#error").show();
        //      $("#signUp").hide();
        return;
      });
  }

  //로그인 (sing in) 하는 함수
  function signIn() {
=======
    if(pw != cf) {
        alert("Password does not match the confirm password.");
        return;
    }       

    firebase.auth().createUserWithEmailAndPassword(id, pw)
            .then(function() {
                alert("Signed Up!");
                var userRef = database.ref('/OperatorProfile/'+id.split('@')[0]);
                var data = {
                        E_mail : id
                }
                userRef.set(data);
                console.log(id.split('@')[0]); 
                location.href="./Main.html";
                
            })
            .catch(function(e) {
                 alert("bb");
                $("#error #errmsg").html(e.message);
                $("#error").show();
                return;
    });
}

//로그인 (sing in) 하는 함수
 function signIn() {
>>>>>>> ff80c7a6c9dcfe6a4d760bc4a870631e75ee1913
    var id = $("#si_id").val();
    var pw = $("#si_pw").val();
    firebase.auth().signInWithEmailAndPassword(id, pw)
      .then(function() {
        $("#signIn").hide();
        $("#authorized").show();
        location.href = "./Main.html";
      })
      .catch(function(e) {
        lastWork = "signIn";
        $("#error #errmsg").html(e.message);
        $("#error").show();
        $("#signIn").hide();
        return;
      });
  }

<<<<<<< HEAD

  //현재 로그인 상태를 감지해서 로그인이 되었으면 화면에 띄우고 아니면 경고창 띄우는 함수
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("log-button").innerHTML = user.email + "님 환영합니다.";
      document.getElementById("log-button").style.color = "rgb(233,65,103)";
    }
  });
=======
>>>>>>> ff80c7a6c9dcfe6a4d760bc4a870631e75ee1913
