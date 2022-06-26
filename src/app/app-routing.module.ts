import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremiumCalulatorComponent } from './premium-calulator/premium-calulator.component';

const routes: Routes = [
  {path:'premiumCalculator',component:PremiumCalulatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
