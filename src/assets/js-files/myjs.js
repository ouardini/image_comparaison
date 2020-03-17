
 var firebaseConfig = {
    apiKey: "AIzaSyDZsKlgxoLT8Q40GQ8eHQIqpwbVGpHduhA",
    authDomain: "image-e4d30.firebaseapp.com",
    databaseURL: "https://image-e4d30.firebaseio.com",
    projectId: "image-e4d30",
    storageBucket: "image-e4d30.appspot.com",
    messagingSenderId: "390764991932",
    appId: "1:390764991932:web:95fe64c8b6f85836e8c7b9"
  };
  function savy(username){
    firebase.initializeApp(firebaseConfig);

swal.fire({
title: 'tap Your password',
icon: 'warning',
html: '<input type="password" id="ii">' ,
showCancelButton: true,
confirmButtonText: 'Yes, save it!',
cancelButtonText: 'No, cancel!',
reverseButtons: true
}).then((result) => {
if (result.value) {
 var iii=document.getElementById("ii");
 
 firebase.database().ref('user/'+username+'/password').once("value", function(snapshot) {

   if (iii.value==snapshot.val()) {
    sleep(2000).then(() => {
      set(username);  
    confirm_field(username);})}
   else{ alert_field("password incorrect")  }})
 } 

})
}

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

             if (password==snapshot.val()) {
               window.location.href = '/cam/'+username ;}
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
  /*p.placeholde="tap your new password";
  c.placeholde="confirm your new password";*/
})
}

function save_db(username) {
  var db= firebase.database();
  var ref = db.ref('user/'+username);
    var e = document.getElementById("email");
    var f = document.getElementById("fname");
    var l = document.getElementById("lname");
    var p = document.getElementById("password");
    var c = document.getElementById("cpassword");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if(c.value!=p.value){alert_field("Password mismatch")}
      if(!e.value.match(mailformat) ){alert_field("Invalid email address")}
   if(c.value==p.value  && e.value.match(mailformat)  ){
     if(p.value!=""){
    ref.once("value").then(function(snapshot) {
      db.ref('user/'+username).set({
        username:username,
         email:e.value,
         fname:f.value,
         lname:l.value,
         password:p.value,
       })
           })}
       if(p.value==""){
         ref.once("value").then(function(snapshot) {
          db.ref('user/'+username+'/password').on("value", function(snapshot) {
           var pp=snapshot.val().toString();
            db.ref('user/'+username).set({
              username:username,
               email:e.value,
               fname:f.value,
               lname:l.value,
               password: pp,
             })
          })

           
                   })}  
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

sleep(1500).then(() => {
var db= firebase.database();
var i=0;
var n=2;
var j=0;
  db.ref("dates").orderByKey().on("child_added", function(snapshot) {
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
     j++;
     i++;
     console.log(i)
    }
  
  })
    
    })  

      if(i==0){ $("#"+n).remove();}

});})
sleep(2500).then(() => { 
$("table").css({"table-layout": "fixed","border-collapse": "collapse", "width": "90%",});
$("th").css({"padding": "8px", "text-align": "center", "border-bottom": "1px solid #ddd" ,"font-size":"85%" , "color":"#ffffff"});
$("td").css({"padding": "8px", "text-align":"center", "border-bottom": "1px solid #ddd" , "color":"#ffffff"});})
sleep(3500).then(() => { 
if(j==0){
   $("#div1").remove();
   console.log(i)
$("#divv1").prepend("<p style='margin-top:50%;color:#DBE7ED;' text-center><b>you have never came to our store</b></p>");
}})
        
             

      
    
     
    
  
      
      
      
           

 
}

function write2(p,username,a){
  firebase.database().ref('product_stats/'+p+'/'+username).set({
    total_qte:parseInt(a),
  });

}
function write1(p,username){
  firebase.database().ref('product_stats/'+p+'/'+username).set({
    total_qte:0,
  });
}
function write3(username){
  var n=1;
  var j="r";
  var c=0;
  firebase.database().ref('user/'+username+'/top_product').orderByKey().on('child_added', function(snapshot){ 
     if(parseInt(snapshot.val())>=n){
     n=parseInt(snapshot.val());
       j=snapshot.key.toString();
      }
       get_topPro(j,n,username,c); 
     
        c++;


        })

}

function write0(username) {
  var db= firebase.database();
 
  db.ref("product_stats").orderByKey().on("child_added", function(snapshot) {
    var p=snapshot.key;
    db.ref('product_stats/'+p+'/'+username+'/total_qte').once("value", function(snapshot) {
    write1(p,username);
  
  })

  })
}
function write4(username) {
  var db= firebase.database();
 
  db.ref('product_stats').orderByKey().on("child_added", function(snapshot) { 
    var d =snapshot.key;

    db.ref('product_stats/'+d+'/'+username+'/total_qte').on("value", function(snapshot) {
     
      var c=snapshot.val();
      firebase.database().ref().child('/user/'+username+'/top_product')
      .update({ [d.toString()]:parseInt(c)});
      
      })   
    })
}

function set(username){
var ll=0;
  var db= firebase.database();
  firebase.database().ref('product_stats').orderByKey().on("child_added", function(snapshot) {
   
      var p=snapshot.key;
     write1(p,username);

  })  
  
  db.ref("dates").orderByKey().on("child_added", function(snapshot) {
      var d =snapshot.key;
      db.ref('dates/'+d+'/products').orderByKey().on("child_added", function(snapshot) {
      var p=snapshot.key;
      
      db.ref('dates/'+d+'/products/'+p+'/'+username).on("value", function(snapshot) {
              
        if(snapshot.exists()){
             var s=snapshot.val();
             ll++; 
                     
                                   
             db.ref('product_stats/'+p+'/'+username+'/total_qte').once("value", function(snapshot) {
              
            a=parseInt( parseInt(snapshot.val())+s);
            write2(p,username,a);

                })
              } 

    })
        })  
  })
  
 sleep(2000).then(() => {if(ll!=0){
   
    write4(username);


  }
  else{
    /*$("#ddd").prepend("<p style='margin-top:50%;color:#DBE7ED;' text-center><b>you have never came to our store</b></p>");*/
  }})
}

    function  get_topPro(sk,sv,username,c){
      
      firebase.database().ref('user/'+username).once("value")
      .then(function(snapshot) {
            var b = snapshot.child("top_product").numChildren(); 

        if(  c == b-1 ) {
   $("#ddd").prepend('<div style="border: 5px solid #bbb; width: 80%; border-radius: 15px; margin: 0 auto; max-width: 600px;" class="coupon"> <div style="padding: 2px 16px; background-color: #f1f1f1;" class="container"> <h3>'+sk.toUpperCase()+'</h3> </div> <div class="container" style="padding: 2px 16px;background-color:white"> <h2><b>20% OFF YOUR PURCHASE '+sk.toUpperCase()+'</b></h2> </div> <div style="padding: 2px 16px; background-color: #f1f1f1;" class="container"> <p>Use Promo Code: <span style="background: #ccc; padding: 3px;" class="promo">BOH232</span></p> <p style="color: red;"  class="expire">Expires: Jan 03, 2021</p> </div> </div>');

}

  })
  
    }  

 

    function set2(username){
      var ll=0;
      firebase.initializeApp(firebaseConfig);
        var db= firebase.database();
        firebase.database().ref('product_stats').orderByKey().on("child_added", function(snapshot) {
         
            var p=snapshot.key;
           write1(p,username);
        })  
        
        db.ref("dates").orderByKey().on("child_added", function(snapshot) {
            var d =snapshot.key;
            db.ref('dates/'+d+'/products').orderByKey().on("child_added", function(snapshot) {
            var p=snapshot.key;
            
            db.ref('dates/'+d+'/products/'+p+'/'+username).on("value", function(snapshot) {
                    
              if(snapshot.exists()){
                   var s=snapshot.val();
                   ll++; 
                           
                                         
                   db.ref('product_stats/'+p+'/'+username+'/total_qte').once("value", function(snapshot) {
                    
                  a=parseInt( parseInt(snapshot.val())+s);
                  write2(p,username,a);
                      })
                    } 
      
          })
              })  
        })
        
       sleep(2000).then(() => {if(ll!=0){
         
          write4(username);
        
          write3(username);
        }
        else{
          $("#ddd").prepend("<p style='margin-top:50%;color:#DBE7ED;' text-center><b>you have never came to our store</b></p>");
        }})
      }
  
 
   
      
    


