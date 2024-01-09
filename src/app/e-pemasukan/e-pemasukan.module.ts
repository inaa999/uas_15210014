import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EPemasukanPageRoutingModule } from './e-pemasukan-routing.module';

import { EPemasukanPage } from './e-pemasukan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EPemasukanPageRoutingModule
  ],
  declarations: [EPemasukanPage]
})
export class EPemasukanPageModule {}
