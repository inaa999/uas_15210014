import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RPnddkPageRoutingModule } from './r-pnddk-routing.module';

import { RPnddkPage } from './r-pnddk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RPnddkPageRoutingModule
  ],
  declarations: [RPnddkPage]
})
export class RPnddkPageModule {}
