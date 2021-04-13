import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
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
  utilizador : RegistoDTO[];


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
     public navParams: NavParams,
     public registoService: RegistoService,
     public loadingController: LoadingController) {
  }


  ionViewDidLoad() {
    
    this.loadData();
  }

  loadData(){
    let loading = this.presentLoading();

    this.registoService.findAll()
    .subscribe(response => {
      this.items = response;
      loading.dismiss();
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    });
  }
  

  mostrarUtilizador(utilizador_id : string){
    this.navCtrl.push('UserPage', {utilizador_id : utilizador_id});
  }


  aprovar(id:string){
    this.registoService.validar(id)
    .subscribe(response =>{
      this.showApproved();
    }, error =>{

    });
  }

  rejeitar(id:string){
    this.registoService.rejeitar(id)
    .subscribe(response =>{
      this.showRejected();
    }, error =>{

    });
  }

  showApproved(){
    let alert = this.alertCtrl.create({
      title: "Sucesso",
      message: "A conta foi ativada com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('CadastrosPage');
          }
        }
      ]
    });
    alert.present();
  }
  showRejected(){
    let alert = this.alertCtrl.create({
      title: "Sucesso",
      message: "A conta foi Desabilitada da lista",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('CadastrosPage');
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    const loading =  this.loadingController.create({
      content: 'Porfavor Agurade...'
    });
     loading.present();
     return loading;
  }

  doRefresh(refresher){
    this.loadData();
    setTimeout(()=>{
      refresher.complete();
    }, 1000);
  }
}
