import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-blok',
  templateUrl: './blok.page.html',
  styleUrls: ['./blok.page.scss'],
})
export class BlokPage implements OnInit {
  public blokData: any;
  public Data: any;
  filteredBlokData: any;
  searchNamaBlok: string = '';

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getBlok();
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

  async getBlok() {
    try {
      await this.storage.create();
      const res = await this._apiService.getBlok();

      if (res.msg === 'ok') {
        this.blokData = res.data;
        this.filteredBlokData = res.data; // Initialize filtered data with all data
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada blok!', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getBlokData:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }

  searchByNamaBlok() {
    this.filteredBlokData = this.blokData.filter((data: any) =>
      data.nama_blok.toLowerCase().includes(this.searchNamaBlok.toLowerCase())
    );
  }

  async confirmDelete(kd_blok: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this blok?',
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
            this.deleteBlok(kd_blok);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteBlok(kd_blok: string) {
    try {
      const res = await this._apiService.delete_Blok(kd_blok);

      if (res.msg === 'ok') {
        this.presentToast('Blok berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getBlok(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Blok gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteBlok:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  edit(kd_blok: string) {
    if (kd_blok !== undefined && kd_blok !== null && kd_blok.trim() !== '') {
      this.navCtrl.navigateRoot('/updateblok?kd_blok=' + kd_blok);
    } else {
      this.presentToast('Invalid kd_blok value', 'danger', 'alert-circle-outline');
    }
  }

  // Export to Excel with real-time data
  synchronizeDataAndExportToExcel() {
    // Update data before exporting
    this.getBlok();

    // Prepare all data for export
    const exportData = this.filteredBlokData.map((item: any) => {
      return {
        'Nama Blok': item.nama_blok,
        'No Blok': item.no_blok,
      };
    });

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook with the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Blok Data');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'blok_data.xlsx');
  }
  viewExportedData() {
    this.navCtrl.navigateForward(['/g-pnddk'], {
      state: { exportedData: this.Data }
    });
  }
}

