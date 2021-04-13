import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';

/**
 * Generated class for the AtivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ativos',
  templateUrl: 'ativos.html',
})
export class AtivosPage {

  items : RegistoDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public registoService: RegistoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.presentLoading();
    this.registoService.findAll()
    .subscribe(response => {
      this.items = response;
      loading.dismiss();
    },
    error => {
      
    });
  }

  mostrarUtilizador(utilizador_id : string){
    this.navCtrl.push('UserPage', {utilizador_id : utilizador_id});
  }

  presentLoading() {
    const loading =  this.loadingController.create({
      content: 'Porfavor Agurade...'
    });
     loading.present();
     return loading;
  }

}
