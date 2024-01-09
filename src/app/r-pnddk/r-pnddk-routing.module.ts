import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RPnddkPage } from './r-pnddk.page';

const routes: Routes = [
  {
    path: '',
    component: RPnddkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RPnddkPageRoutingModule {}
