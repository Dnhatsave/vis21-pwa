import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';

/**
 * Generated class for the CadastrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastros',
  templateUrl: 'cadastros.html',
})
export class CadastrosPage {

  herokuUrl: string = API_CONFIG.herokuUrl;

  items : RegistoDTO[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public registoService: RegistoService) {
  }


  ionViewDidLoad() {
    this.registoService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });
  }

}
