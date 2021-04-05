import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciasDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';
import { RegistoService } from '../../services/domain/registo.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciasDTO = {
    contacto: "",
    password: ""
  }
  constructor(
      public navCtrl: NavController,
      public menu: MenuController,
      public auth: AuthService,
      public registoService: RegistoService,
      public alertCtrl: AlertController,
      public storage: StorageService) {

  }
  ionViewWillEnter() { 
    this.menu.swipeEnable(false);
    
  }
  ionViewDidLeave() { 
    this.menu.swipeEnable(true);
  }
  ionViewDidEnter() { 
    // this.auth.refreshToken()
    // .subscribe(response => {
    //   this.auth.successfullLogin(response.headers.get('Authorization'));
    //   this.navCtrl.setRoot('PrincipalPage');
    // },
    // error => {
    //   console.log(error);
    // }); 
  }


  login(){

    

    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get("Authorization"));
      // verifficacao 
    let localUser = this.storage.getLocalUser();
    this.registoService.findByContacto2(localUser.contacto)
        .subscribe(response => {

          if(response.estado == 'PENDENTE'){
            let alert = this.alertCtrl.create({
              title: "Ativação",
              message: "Conta Pendente, Aguarde pela Ativação!",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.setRoot('HomePage');
                    this.storage.setLocalUser(null);

                  }
                }
              ]
            });
            alert.present();
          }else if(response.estado == 'REJEITADO'){
            let alert = this.alertCtrl.create({
              title: "Ativação",
              message: "Conta nao existente tente novamente!",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.setRoot('HomePage');
                    this.storage.setLocalUser(null);

                  }
                }
              ]
            });
            alert.present();
          }else if(response.estado == 'VALIDADO'){
            // console.log(response.headers.get("Authorization"));
            this.navCtrl.setRoot('PrincipalPage');  
          }

        },
        error=>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      
    }, 
    error =>{
      // console.log(error);
    });
  }

  signup(){
    this.navCtrl.push('SingupPage');
  }

}
