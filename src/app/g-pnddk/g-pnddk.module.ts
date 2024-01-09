import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GPnddkPageRoutingModule } from './g-pnddk-routing.module';

import { GPnddkPage } from './g-pnddk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GPnddkPageRoutingModule
  ],
  declarations: [GPnddkPage]
})
export class GPnddkPageModule {}
