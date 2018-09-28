

  //sign up 하는 함수 
  function signUp() {
    var id = $("#su_id").val();
    var pw = $("#su_pw").val();
    var cf = $("#su_cf").val();

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
    var id = $("#si_id").val();
    var pw = $("#si_pw").val();
    firebase.auth().signInWithEmailAndPassword(id, pw)
            .then(function() {
                $("#signIn").hide();
                $("#authorized").show();
                location.href="./Main.html";
            })
            .catch(function(e) {
                lastWork = "signIn";
                $("#error #errmsg").html(e.message);
                $("#error").show();
                $("#signIn").hide();
                return;
            }); 
}   

