import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  utilizador : RegistoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public registoService: RegistoService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let utilizador_id = this.navParams.get('utilizador_id');
        this.registoService.findById(utilizador_id)
        .subscribe(response => {
          this.utilizador = response;       
        },
        error=>{
          
        });
        
      }
  

}
