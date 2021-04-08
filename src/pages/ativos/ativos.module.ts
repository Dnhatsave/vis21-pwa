import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtivosPage } from './ativos';

@NgModule({
  declarations: [
    AtivosPage,
  ],
  imports: [
    IonicPageModule.forChild(AtivosPage),
  ],
})
export class AtivosPageModule {}
