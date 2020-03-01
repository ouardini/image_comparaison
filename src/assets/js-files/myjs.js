
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

    function  confirm_field(username)
    {
      swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          save_db(username);
        } 
      })
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
function sleep (time) {
  let timerInterval
Swal.fire({
  title: 'Wait..',
 
  timer: time,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  
})
  return new Promise((resolve) => setTimeout(resolve, time));
}
function previaw(username,myphoto) { 
  firebase.initializeApp(firebaseConfig);
   var i = document.getElementById("i");
   

 
    i.src = myphoto;
    firebase.storage().ref(username+'.jpg').putString(i.src, 'data_url');

  
   sleep(4000).then(() => {
    window.location.href = '/profile/'+username ;
  });
}

/*function previaw(username,myphoto) { 
  firebase.initializeApp(firebaseConfig);
   var i = document.getElementById("i");
    const reader = new FileReader();
   const file = document.querySelector('input[type=file]').files[0];

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    i.src = reader.result;
    firebase.storage().ref(username+'.jpg').putString(i.src, 'data_url');

  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
   sleep(4000).then(() => {
    window.location.href = '/profile/'+username ;
  });
}*/


  
       
function set_data3(username) {
 var im = document.getElementById("im");
  firebase.initializeApp(firebaseConfig);
  var db= firebase.database();
  var storageRef=firebase.storage().ref();
  
  storageRef.child(username+'.jpg').getDownloadURL().then(onResolve, onReject);
  function onResolve(foundURL) {
    storageRef.child(username+'.jpg').getDownloadURL().then(function(downloadURL) {
      im.src= downloadURL})
  }
  
  function onReject(error) {
    storageRef.child('avatar.jpg').getDownloadURL().then(function(downloadURL) {
      im.src= downloadURL})
  }
} 





 
function set_data2(username) {
  var i = document.getElementById("i");
  firebase.initializeApp(firebaseConfig);
  

  var db= firebase.database();
  var storageRef=firebase.storage().ref();
  var e = document.getElementById("e");
  var f = document.getElementById("f");
  var l = document.getElementById("l");
  
 storageRef.child(username+'.jpg').getDownloadURL().then(onResolve, onReject);
function onResolve(foundURL) {
  storageRef.child(username+'.jpg').getDownloadURL().then(function(downloadURL) {
    i.src= downloadURL})
}

function onReject(error) {
  storageRef.child('avatar.jpg').getDownloadURL().then(function(downloadURL) {
    i.src= downloadURL})
}

  var ref = db.ref('user/'+username+'/email');
   ref.once("value").then(function(snapshot) { 
      if(!snapshot.exists()){
        e.innerHTML= "No email yet"}

       if(snapshot.exists()){
        e.innerHTML=snapshot.val().toString();}
})

var ref = db.ref('user/'+username+'/fname');
ref.once("value").then(function(snapshot) { 
   if(!snapshot.exists()){
     f.innerHTML= ""}

    if(snapshot.exists()){
     f.innerHTML=snapshot.val().toString();}
})

var ref = db.ref('user/'+username+'/lname');
ref.once("value").then(function(snapshot) { 
   if(!snapshot.exists()){
     l.innerHTML= ""}

    if(snapshot.exists()){
     l.innerHTML=snapshot.val().toString();}
})

}
function delete_db(username) {
  swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      firebase.initializeApp(firebaseConfig);
  

  var db= firebase.database();
  var storageRef=firebase.storage().ref();
  var desertRef = storageRef.child(username+'.jpg');
  db.ref('user/'+username).remove();

desertRef.delete();


sleep(4000).then(() => {
  window.location.href = '/sign-in' ;
});
    } 
  })
  
}



function add(username){
     
firebase.initializeApp(firebaseConfig);
sleep(2000).then(() => {

      var db= firebase.database();
      
      db.ref("dates").orderByKey().on("child_added", function(snapshot) {
        var i=0;
        var n=2;
        n++;
        db.ref('dates/'+snapshot.key+'/date').on("value", function(snapshot) {
          var res = snapshot.val().split("/");
          var month = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December'
            ];
          if(snapshot.exists()){
          $("#div1").prepend("<div  'id="+n+"> <div class='card' style='background-color:#00C6FF;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);width:80%;margin:auto;border-radius:5%;'> <h2 text-center><b style='padding-left:40%;color:#aaf0d1;font-size: 50%;'>"+month[res[1]-1]+" "+ res[0]+","+ res[2]+"</b></h2><table style='border-collapse: collapse; width:90%;'><tr><th>Products</th><th>Quantity</th></tr></table> <div id='div2'> </div> </div> </div>")}})
          var d=snapshot.key;
          
          db.ref('dates/'+d+'/products').orderByKey().on("child_added", function(snapshot) {
           var p=snapshot.key;
           
           db.ref('dates/'+d+'/products/'+p+'/'+username).on("value", function(snapshot) {
            
              if(snapshot.exists()){
             $("#div2").prepend("<table><tr><td> "+p+"</td><td>"+snapshot.val()+"</td></tr></table>")
            
             i++;}
          
          })
            
            }) 
     $("table").css({"border-collapse": "collapse", "width": "90%",});
       $("th").css({"padding": "8px", "text-align": "center", "border-bottom": "1px solid #ddd" ,"font-size":"85%" , "color":"#ffffff"});
       $("td").css({"padding": "8px", "text-align":"center", "border-bottom": "1px solid #ddd" , "color":"#ffffff"});
    if(i==0){ $("#"+n).remove();}
      }); 
    
       })
      
       /*var db= firebase.database();

      db.ref('dates/day4/products').orderByKey().on("child_added", function(snapshot) {
        var j=snapshot.key;
        db.ref('dates/day4/products/'+j).orderByKey().on("child_added", function(snapshot) {
          var i=snapshot.key;            
          console.log(i);
          })
         
      }); */
           

 
}