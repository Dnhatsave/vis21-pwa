import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RegistoService } from '../../services/domain/registo.service';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public registoService: RegistoService,
    public alertCtrl: AlertController,
    public loadingController: LoadingController) {
  }

  @Input() formGroup : FormGroup;

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      morada: ['', Validators.required],
      contacto1: ['84', Validators.required],
      contacto2: ['82', Validators.nullValidator],
      registadoPor: ['sistema', Validators.nullValidator],
      email: ['ex@gmail.com', Validators.nullValidator],
      estado: [0, Validators.nullValidator],
      password: ['', Validators.required]
    });
  }
  signupUser(){
    let loading = this.presentLoading();
    this.registoService.insert(this.formGroup.value)
    .subscribe(response =>{
      loading.dismiss();
      this.showInsertOk();
    }, error =>{
      loading.dismiss();
    });
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: "Sucesso",
      message: "Parabens a sua conta foi criada com sucesso, Aguarde pela validacao",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
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
}
