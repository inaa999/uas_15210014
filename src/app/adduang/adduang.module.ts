import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdduangPageRoutingModule } from './adduang-routing.module';

import { AdduangPage } from './adduang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdduangPageRoutingModule
  ],
  declarations: [AdduangPage]
})
export class AdduangPageModule {}
