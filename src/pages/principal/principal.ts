import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  utilizador: RegistoDTO[];

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public registoService: RegistoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
      if(localUser && localUser.contacto){
        this.registoService.findByContacto(localUser.contacto)
        .subscribe(response => {
          this.utilizador = response;
        },
        error=>{
          if(error.status == 403){
            // this.navCtrl.setRoot('HomePage');
          }
        });
        
      }else{
          // this.navCtrl.setRoot('HomePage');
      }
  }

  registar(){
    this.navCtrl.push('RegistarPage');
  }

}
