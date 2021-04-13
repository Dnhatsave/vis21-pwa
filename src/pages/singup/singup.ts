import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public alertCtrl: AlertController) {
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
    this.registoService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOk();
    }, error =>{

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
}
