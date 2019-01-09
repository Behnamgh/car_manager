import { NgModule } from '@angular/core';
import { JalaliPipe } from './jalali/jalali';
import { MiladiPipe } from './miladi/miladi';
@NgModule({
	declarations: [
		JalaliPipe,
		MiladiPipe],
	imports: [],
	exports: [
		JalaliPipe,
		MiladiPipe]
})
export class PipesModule { }
