import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TPemasukanPageRoutingModule } from './t-pemasukan-routing.module';

import { TPemasukanPage } from './t-pemasukan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TPemasukanPageRoutingModule
  ],
  declarations: [TPemasukanPage]
})
export class TPemasukanPageModule {}
