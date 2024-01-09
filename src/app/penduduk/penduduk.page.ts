// penduduk.page.ts

import { Component } from '@angular/core';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-penduduk',
  templateUrl: 'penduduk.page.html',
  styleUrls: ['penduduk.page.scss'],
})
export class PendudukPage implements ViewDidEnter {
  public Data: any;
  public filteredData: any;
  public searchNik: string = '';
  isReadOnly = false;
public searchHistory : any 
  public penduduk: string = '';
  public importedData: any;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.getPenduduk();
  }

  ionViewDidEnter() {
    this.getPenduduk();
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

  async getPenduduk() {
    await this.storage.create();

    this._apiService.getPenduduk('').then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.filteredData = res.data; // Initialize filteredData with all data initially
        this.penduduk = String(res.data[0].penduduk);
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  searchByNik() {
    this.filteredData = this.Data.filter((data: any) =>
      data.nik.toLowerCase().includes(this.searchNik.toLowerCase())
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPenduduk();
      event.target.complete();
    }, 2000);
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }

  update(nik: string) {
    if (nik && nik.trim() !== '') {
      this.navCtrl.navigateRoot('/updatependuduk?nik=' + nik);
    } else {
      this.presentToast('Nilai nik tidak valid', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(nik: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this information?',
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
            this.delete_Penduduk(nik);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Penduduk(nik: string) {
    try {
      const res = await this._apiService.delete_Penduduk(nik);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPenduduk(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePenduduk:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  tambah() {
    this.navCtrl.navigateRoot('/create?penduduk=' + this.penduduk);
  }
  updateSearchHistory(query: string) {
    // Add the query to search history
    if (query && !this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      // Limit search history to 5 items (you can adjust as needed)
      this.searchHistory = this.searchHistory.slice(0, 5);
      // Save search history to storage
      this.storage.set('searchHistory', this.searchHistory);
    }
  }

  clearSearchHistory() {
    // Clear search history
    this.searchHistory = [];
    this.storage.remove('searchHistory');
  }
  exportToExcel() {
    if (this.Data && this.Data.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'PendudukData');
      XLSX.writeFile(wb, 'penduduk_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.readExcelFile(file);
    }
  }

  readExcelFile(file: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse sheet data to JSON
      this.importedData = XLSX.utils.sheet_to_json(sheet);

      // Now you can use importedData in your application
      console.log('Imported Data:', this.importedData);

      // Add your logic to process the imported data as needed
      this.presentToast('Data imported successfully!', 'success', 'checkmark-circle-outline');
    };

    reader.readAsArrayBuffer(file);
  }
  

  viewExportedData() {
    this.navCtrl.navigateForward(['/r-pnddk'], {
      state: { exportedData: this.Data }
    });
  }
}
