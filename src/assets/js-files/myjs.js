
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

             if (password==snapshot.val()) {window.location.href = '/cam/'+username ;}
             else {alert_field("password incorrect");}
            }     
            );
                } 
        else{alert_field("username incorrect");}
  }
  );
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
            preConfirm: () => {window.location.href = '/cam/'+user ;}
            } )
           
           
        }
  });
}

function set_data(username) {
  firebase.initializeApp(firebaseConfig);
  var db= firebase.database();
  
  var e = document.getElementById("email");
  var f = document.getElementById("fname");
  var l = document.getElementById("lname");
  var p = document.getElementById("password");
  var c = document.getElementById("cpassword");
  
  


  var ref = db.ref('user/'+username+'/email');
   ref.once("value").then(function(snapshot) { 
      if(!snapshot.exists()){
        e.placeholder= "No email yet"}

       if(snapshot.exists()){
        e.value=snapshot.val().toString();}
})

var ref = db.ref('user/'+username+'/fname');
ref.once("value").then(function(snapshot) { 
   if(!snapshot.exists()){
     f.placeholder= "type your first name"}

    if(snapshot.exists()){
     f.value=snapshot.val().toString();}
})

var ref = db.ref('user/'+username+'/lname');
ref.once("value").then(function(snapshot) { 
   if(!snapshot.exists()){
     l.placeholder= "type your last name"}

    if(snapshot.exists()){
     l.value=snapshot.val().toString();}
})

var ref = db.ref('user/'+username+'/password');
ref.once("value").then(function(snapshot) { 
  p.value=snapshot.val().toString();
  c.value=snapshot.val().toString();

})

}

function save_db(username) {
  firebase.initializeApp(firebaseConfig);
    var db= firebase.database();
    var ref = db.ref('user/'+username);
    var e = document.getElementById("email");
    var f = document.getElementById("fname");
    var l = document.getElementById("lname");
    var p = document.getElementById("password");
    var c = document.getElementById("cpassword");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    
    if(c.value!=p.value){alert_field("Password mismatch")}
      if(p.value==""){alert_field("Password required")}
      if(!e.value.match(mailformat) ){alert_field("Invalid email address")}
   if(c.value==p.value && p.value!="" && e.value.match(mailformat)  ){
    ref.once("value").then(function(snapshot) {
      db.ref('user/'+username).set({
        username:username,
         email:e.value,
         fname:f.value,
         lname:l.value,
         password:p.value,
         
       })
           })
           Swal.fire({
            title : 'Saved!',
           preConfirm: () => {
            console.log("working") 
           window.location.href = '/sign-in' ;}

            } )
           }
          
}


  
  
       
  
 