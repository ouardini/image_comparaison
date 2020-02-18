
 var firebaseConfig = {
    apiKey: "AIzaSyDZsKlgxoLT8Q40GQ8eHQIqpwbVGpHduhA",
    authDomain: "image-e4d30.firebaseapp.com",
    databaseURL: "https://image-e4d30.firebaseio.com",
    projectId: "image-e4d30",
    storageBucket: "image-e4d30.appspot.com",
    messagingSenderId: "390764991932",
    appId: "1:390764991932:web:95fe64c8b6f85836e8c7b9"
  };
  function  alert_field(message)
  {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:message,
        } )
    }
    

  
function connect_db(username,password){
    firebase.initializeApp(firebaseConfig);

    var db= firebase.database();
 
    var ref = db.ref('user/'+username);
        ref.once("value").then(function(snapshot) {
        if(snapshot.exists()) {db.ref('user/'+username+'/password').on("value", function(snapshot) {
             if (password==snapshot.val()) {window.location.href = '/cam' ;}
             else {alert_field("password incorrect");}
                 });} 
        else{alert_field("username incorrect");}
  });
}
function create_db(user,pass){
    firebase.initializeApp(firebaseConfig);
    var db= firebase.database();
    var ref = db.ref('user/'+user);
    ref.once("value").then(function(snapshot) {
        if(snapshot.exists()) {alert_field("user already exists!")}
        else{db.ref('user/'+user).set({
            password:pass,
             username:   user,
           });

           Swal.fire({
            title : 'Welcome '+user+" !",
            text: 'You are now a member',
            confirmButtonText: 'ok',
            preConfirm: () => {window.location.href = '/cam' ;}
            } )
           
           
        }
  });

}

