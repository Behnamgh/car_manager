import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartListPage } from './part-list';

@NgModule({
  declarations: [
    PartListPage,
  ],
  imports: [
    IonicPageModule.forChild(PartListPage),
  ],
})
export class PartListPageModule {}
