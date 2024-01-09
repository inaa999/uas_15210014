import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TPemasukanPage } from './t-pemasukan.page';

const routes: Routes = [
  {
    path: '',
    component: TPemasukanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TPemasukanPageRoutingModule {}
