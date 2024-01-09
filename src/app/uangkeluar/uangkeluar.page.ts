import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-uangkeluar',
  templateUrl: './uangkeluar.page.html',
  styleUrls: ['./uangkeluar.page.scss'],
})
export class UangkeluarPage  implements OnInit {
  [x: string]: any;
  public uang: any;
  public data: any;
  filtereduang: any;
  searchNamapengeluaran: string = '';
 

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getUang();
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async getUang() {
    try {
      await this.storage.create();
      const res = await this._apiService.getuang();

      if (res.msg === 'ok') {
        this.uang = res.data;
        this.filtereduang = res.data; // Initialize filtered data with all data
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada pengeluaran!', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in uangkeluar:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }

  searchByNamapengeluaran() {
    this.filtereduang = this.uang.filter((data: any) =>
      data.nama_pengeluaran.toLowerCase().includes(this.searchNamapengeluaran.toLowerCase())
    );
  }

  async confirmDelete(id_keluar: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this pengeluaran?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete_uang(id_keluar);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_uang(kd_keluar: string) {
    try {
      const res = await this._apiService.deleteuang(kd_keluar);

      if (res.msg === 'ok') {
        this.presentToast('Pengeluaran berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getUang(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Pengeluaran gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePengeluaran:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  edit(kd_keluar: string) {
    if (kd_keluar !== undefined && kd_keluar !== null && kd_keluar.trim() !== '') {
      this.navCtrl.navigateRoot('/e-uang?kd_keluar=' + kd_keluar);
    } else {
      this.presentToast('Invalid kd_keluar value', 'danger', 'alert-circle-outline');
    }
  }

  tambahPengeluaran() {
    // Implement tambahPengeluaran function to add new data
  }

  synchronizeDataAndExportToExcel() {
    // Implement synchronizeDataAndExportToExcel function to export data to Excel
  }
  viewExportedData() {
    this.navCtrl.navigateForward(['/report'], {
      state: { exportedData: this['Data'] }

    });
  }
}


