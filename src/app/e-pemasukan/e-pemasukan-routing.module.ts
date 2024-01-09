import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EPemasukanPage } from './e-pemasukan.page';

const routes: Routes = [
  {
    path: '',
    component: EPemasukanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EPemasukanPageRoutingModule {}
