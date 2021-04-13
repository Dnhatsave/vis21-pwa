import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
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
    public registoService: RegistoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    let loading = this.presentLoading();
      if(localUser && localUser.contacto){
        this.registoService.findByContacto(localUser.contacto)
        .subscribe(response => {
          this.utilizador = response;
          loading.dismiss();
        },
        error=>{
          if(error.status == 403){
            // this.navCtrl.setRoot('HomePage');
            loading.dismiss();
          }
        });
        
      }else{
          // this.navCtrl.setRoot('HomePage');
      }   
  }

  registar(){
    this.navCtrl.push('RegistarPage');
  }

  listarContactos(){
    this.navCtrl.push('CadastrosPage');
  }

  listarPendentes(){
    this.navCtrl.push('PendentesPage');
  }

  listarAtivos(){
    this.navCtrl.push('AtivosPage');
  } 
  listarRejeitados(){
    this.navCtrl.push('RejeitadosPage');
  }

   presentLoading() {
    const loading =  this.loadingController.create({
      content: 'Porfavor Agurade...'
    });
     loading.present();
     return loading;
  }

}
