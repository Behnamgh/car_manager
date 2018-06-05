import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportFilterPage } from './report-filter';

@NgModule({
  declarations: [
    ReportFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportFilterPage),
  ],
})
export class ReportFilterPageModule {}
