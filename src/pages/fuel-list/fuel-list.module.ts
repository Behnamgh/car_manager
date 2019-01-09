import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuelListPage } from './fuel-list';

@NgModule({
  declarations: [
    FuelListPage,
  ],
  imports: [
    IonicPageModule.forChild(FuelListPage),
  ],
})
export class FuelListPageModule {}
