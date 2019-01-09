import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuelCreatePage } from './fuel-create';

@NgModule({
  declarations: [
    FuelCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FuelCreatePage),
  ],
})
export class FuelCreatePageModule {}
