import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public registoService: RegistoService) {
  }


  ionViewDidLoad() {
    this.registoService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
