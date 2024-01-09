import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdduangPage } from './adduang.page';

const routes: Routes = [
  {
    path: '',
    component: AdduangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdduangPageRoutingModule {}
