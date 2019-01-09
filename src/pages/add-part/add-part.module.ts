import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPartPage } from './add-part';

@NgModule({
  declarations: [
    AddPartPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPartPage),
  ],
})
export class AddPartPageModule {}
