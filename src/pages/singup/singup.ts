import { Component, Input, OnInit } from '@angular/core';
import { s } from '@angular/core/src/render3';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder) {
  }

  @Input() formGroup : FormGroup;

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      morada: ['', Validators.required],
      contacto1: ['', Validators.required],
      contacto2: ['', Validators.nullValidator],
      email: ['', Validators.nullValidator],
    });
  }
  signupUser(){
    console.log("Registado");
  }



}
