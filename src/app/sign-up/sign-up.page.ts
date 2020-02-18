import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
declare const create_db: any;
declare const fireb_app: any;
declare const alert_field: any;
declare const fireb_data: any;
declare const sweet_alert: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUPPage implements OnInit {
  
  constructor(public navCtrl: NavController) { }
  ngOnInit() {
  }
  create_account(){
    sweet_alert();
    fireb_app();
    fireb_data();
  var u  =  <HTMLInputElement>document.getElementById('user');
  var p1 = <HTMLInputElement>document.getElementById("pwd1");
  var p2 = <HTMLInputElement>document.getElementById("pwd2");
  if(p1.value=== ""||p2.value=== ""||u.value=== ""){alert_field("please enter all the required fields!")}
    else{if(p1.value!=p2.value){alert_field("Password mismatch")}
        else{       create_db(u.value,p1.value);
             }
     };}
    
    
    
  gotoSIGNIN() { this.navCtrl.navigateForward('/sign-in'); }
  
  }

