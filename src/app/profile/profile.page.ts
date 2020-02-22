import { Component, OnInit } from '@angular/core';
import {ActivatedRoute ,Router} from '@angular/router';

import { MenuController, NavController, AlertController } from '@ionic/angular';
declare const fireb_app: any;
declare const alert_field: any;
declare const fireb_data: any;
declare const sweet_alert: any;
declare const set_data2: any;
declare const save_db: any;
declare const confirm_field: any;
declare const previaw: any;

declare const fireb_storage: any;
declare const fireb_auth: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  myphoto: string;

  constructor( public alertController: AlertController,
    public navCtrl: NavController , private menu:MenuController,public router:Router,public activatedRoute:ActivatedRoute) { }
    user=this.activatedRoute.snapshot.paramMap.get('user') ;

    s:String=" ";
  ngOnInit() { 
    var u = <HTMLInputElement>document.getElementById("u");
  u.innerHTML= this.user;
  
  fireb_app();
  fireb_data();
  fireb_storage()
  fireb_auth();
  sweet_alert(); 
  
set_data2(this.user);

  }

  up(){
    fireb_app();
    fireb_data();
    fireb_storage()
    fireb_auth();
    sweet_alert(); 
    
    previaw(this.user)}

    toCam(){this.router.navigateByUrl('/cam/'+this.user);}

}
