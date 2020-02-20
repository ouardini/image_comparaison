import { Component } from '@angular/core';
import {  NavController, AlertController } from '@ionic/angular' ;
import { MenuController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';

declare const edit_db: any;


@Component({
  selector: 'app-cam',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage {
  

  


  constructor(private camera: Camera,    public alertController: AlertController,
    public navCtrl: NavController , private menu:MenuController,public router:Router,public activatedRoute:ActivatedRoute )  
     { }

   toSettings(){ let user=this.activatedRoute.snapshot.paramMap.get('user') ;

     this.router.navigateByUrl('/settings/'+user); }











 myphoto :any;
 takephoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.myphoto= 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  })};

  pickImage() {
    const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    saveToPhotoAlbum:false,
    
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myphoto= 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }
   corpImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300,
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.myphoto= 'data:image/jpeg;base64,' + imageData;
  
      }, (err) => {
        // Handle error
      });
    }
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("mySidenav").style.borderStyle = "solid";
      document.getElementById("mySidenav").style.borderRightColor="white";
      


    }
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav").style.borderStyle = "none";
      document.getElementById("mySidenav").style.borderRightColor="black";

    }
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Alert!!',
        message: 'Are you sure you want to sign out ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel'); }
           }
          , {
            text: 'Yes',
            handler: () => {
              this.navCtrl.navigateRoot('/sign-in') ;
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    
  
  }
  



    



  

