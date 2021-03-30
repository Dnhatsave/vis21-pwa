import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciasDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

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
      public auth: AuthService) {

  }
  ionViewWillEnter() { this.menu.swipeEnable(false);
  }
  ionViewDidLeave() { this.menu.swipeEnable(true);
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CadastrosPage');  
    }, 
    error =>{
      console.log(error);
    });
  }

}
