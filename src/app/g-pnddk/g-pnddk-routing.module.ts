import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GPnddkPage } from './g-pnddk.page';

const routes: Routes = [
  {
    path: '',
    component: GPnddkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GPnddkPageRoutingModule {}
