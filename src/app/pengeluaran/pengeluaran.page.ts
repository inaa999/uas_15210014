import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.page.html',
  styleUrls: ['./pengeluaran.page.scss'],
})
export class PengeluaranPage implements OnInit {
  public pengeluaranData: any;
  filteredPengeluranData: any;
  searchId: string = '';

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getpengeluaran();
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

  async getpengeluaran() {
    try {
      await this.storage.create();
      const res = await this._apiService.getPengeluaran();

      if (res.msg === 'ok') {
        this.pengeluaranData = res.data;
        this.filteredPengeluranData = res.data; // Initialize filtered data with all data
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada pengeluaran!', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getpengeluaranData:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }

  searchById() {
    this.filteredPengeluranData = this.pengeluaranData.filter((data: any) =>
      data.kd_pengeluaran.toLowerCase().includes(this.searchId.toLowerCase())
    );
  }

  filterData() {
    // Implement filterData function
    // You can modify this function according to your requirements
  }

  synchronizeDataAndExportToExcel() {
    // Implement synchronizeDataAndExportToExcel function to export data to Excel
  }

  async confirmDelete(kd_pengeluaran: string) {
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
            this.deletePengeluaran(kd_pengeluaran);
          },
        },
      ],
    });

    await alert.present();
  }

  async deletePengeluaran(kd_pengeluaran: string) {
    try {
      const res = await this._apiService.deletePengeluaran(kd_pengeluaran);

      if (res.msg === 'ok') {
        this.presentToast('Pengeluaran berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getpengeluaran(); // Refresh data setelah penghapusan
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

  edit(kd_pengeluaran: string) {
    if (kd_pengeluaran !== undefined && kd_pengeluaran !== null && kd_pengeluaran.trim() !== '') {
      this.navCtrl.navigateRoot('/e-pengeluaran?kd_pengeluaran=' + kd_pengeluaran);
    } else {
      this.presentToast('Invalid kd_pengeluaran value', 'danger', 'alert-circle-outline');
    }
  }

  // Implement tambahPengeluaran function to add new data
  tambahPengeluaran() {
    // Implementation goes here
  }
}
