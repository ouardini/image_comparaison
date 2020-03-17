import { Component, OnInit } from '@angular/core';
import {ActivatedRoute ,Router} from '@angular/router';
import { MenuController, NavController, AlertController } from '@ionic/angular';
declare const fireb_app: any;
declare const alert_field: any;
declare const fireb_data: any;
declare const sweet_alert: any;
declare const set2: any;
declare const save_db: any;
declare const confirm_field: any;
declare const previaw: any;
declare const jqr: any;
declare const delete_db: any;
declare const fireb_storage: any;
declare const fireb_auth: any;
@Component({
  selector: 'app-discount',
  templateUrl: './discount.page.html',
  styleUrls: ['./discount.page.scss'],
})
export class DiscountPage implements OnInit {

  constructor(public alertController: AlertController,
    public navCtrl: NavController , private menu:MenuController,public router:Router,public activatedRoute:ActivatedRoute) { }
    user=this.activatedRoute.snapshot.paramMap.get('user') ;
  ngOnInit() {
    fireb_app();
    fireb_data();
    fireb_storage()
    fireb_auth();
    sweet_alert(); 
    jqr();
  set2(this.user);
    
  }
  toCam(){this.router.navigateByUrl('/cam/'+this.user);}
}
