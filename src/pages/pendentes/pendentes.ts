import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';

/**
 * Generated class for the PendentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pendentes',
  templateUrl: 'pendentes.html',
})
export class PendentesPage {

  items : RegistoDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public registoService: RegistoService) {
  }

  ionViewDidLoad() {
    this.registoService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {
      
    });
  }

  mostrarUtilizador(utilizador_id : string){
    this.navCtrl.push('UserPage', {utilizador_id : utilizador_id});
  }

}
