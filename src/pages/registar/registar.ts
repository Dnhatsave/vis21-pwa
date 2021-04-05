import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistoDTO } from '../../models/registo.dto';
import { RegistoService } from '../../services/domain/registo.service';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-registar',
  templateUrl: 'registar.html',
})


export class RegistarPage implements OnInit {
  utilizador: RegistoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public registoService: RegistoService,
    public alertCtrl: AlertController,
    public storage: StorageService) {
  }

 
  @Input() formGroup : FormGroup;

  ngOnInit(){
    let localUser = this.storage.getLocalUser();
      if(localUser && localUser.contacto){
        this.registoService.findByContacto2(localUser.contacto)
        .subscribe(response => {
          let nome = response.nome;
          this.formGroup.controls.registadoPor.setValue(nome);
        },
        error=>{
          // if(error.status == 403){
          //   this.navCtrl.setRoot('HomePage');
          // }
        });
        
      }else{
          // this.navCtrl.setRoot('HomePage');
      }
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      morada: ['', Validators.required],
      contacto1: ['', Validators.required],
      registadoPor: ['',Validators.required],
      email: ['', Validators.nullValidator],
      estado: [0, Validators.nullValidator],
      password: ['cad123456', Validators.nullValidator]
    });
    // 
      
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
      message: "Parabens, a conta foi Regista com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('PrincipalPage');
          }
        }
      ]
    });
    alert.present();
  }
}

