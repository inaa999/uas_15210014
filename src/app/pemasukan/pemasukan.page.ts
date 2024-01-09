// pemasukan.page.ts

import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-pemasukan',
  templateUrl: './pemasukan.page.html',
  styleUrls: ['./pemasukan.page.scss'],
})
export class PemasukanPage implements OnInit {
  [x: string]: any;
  public uangKeluarData: any = [];

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private _apiService: ApiserviceService
  ) {}

  ngOnInit() {
    this.uangKeluarData;
  }

  async getUang_keluar() {
    try {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'lines',
      });
      loader.present();

      this._apiService.getuangkeluar().then((res: any) => {
        console.log(res)
        if (res.status === 'Ok') {
          this.uangKeluarData = res.result;
        } else {
          this.presentToast('Data not found', 'warning', 'alert-circle-outline');
        }
        loader.dismiss();
      });
    } catch (error) {
      console.error('Error in getUangKeluar', error);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async updateUangKeluar(kd_pengeluaran: string) {
    // Implement the update logic here
    console.log('Update Uang Keluar:', kd_pengeluaran);
  }

  async deleteUangKeluar(kd_pengeluaran: string) {
    // Implement the delete logic here
    console.log('Delete Uang Keluar:', kd_pengeluaran);
  }
}
