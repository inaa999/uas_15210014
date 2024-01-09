import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UangPage } from './uang.page';

const routes: Routes = [
  {
    path: '',
    component: UangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UangPageRoutingModule {}
