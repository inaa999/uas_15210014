import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UangPageRoutingModule } from './uang-routing.module';

import { UangPage } from './uang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UangPageRoutingModule
  ],
  declarations: [UangPage]
})
export class UangPageModule {}
