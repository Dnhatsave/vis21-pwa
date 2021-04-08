import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendentesPage } from './pendentes';

@NgModule({
  declarations: [
    PendentesPage,
  ],
  imports: [
    IonicPageModule.forChild(PendentesPage),
  ],
})
export class PendentesPageModule {}
