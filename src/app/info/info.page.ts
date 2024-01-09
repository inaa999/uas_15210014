import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx'; // Import XLSX library

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public info!: string;
  isMenuOpen = false;
  infoData: any;
  Data: any;
  filteredInfoData: any;
  searchTerm: string = '';

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getInfo();
  }

  ngOnInit() {
    // Untuk contoh penggunaan ActivatedRoute, Anda dapat menambahkannya sesuai kebutuhan
    // this.info = this.activatedRoute.snapshot.paramMap.get('id') as string;
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

  async getInfo() {
    try {
      await this.storage.create();
      const res = await this._apiService.getInfo();

      if (res.msg === 'ok') {
        this.infoData = res.data;
        this.filteredInfoData = res.data; // Initialize filtered data with all data
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada info!', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getInfo:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getInfo();
      event.target.complete();
    }, 2000);
  }

  edit(kd_info: string) {
    if (kd_info !== undefined && kd_info !== null && kd_info.trim() !== '') {
      this.navCtrl.navigateRoot('/updateinfo?kd_info=' + kd_info);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_info: string) {
    const alert = await this.alertCtrl.create({
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
            this.delete_Info(kd_info);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Info(kd: string) {
    try {
      const res = await this._apiService.delete_Info(kd);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getInfo(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteInfo:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  filterData(event: any) {
    this.filteredInfoData = this.infoData.filter((data: any) => {
      return (
        data.judul_info.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        data.informasi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        data.tgl_info.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  // Export to Excel with real-time data
  synchronizeDataAndExportToExcel() {
    // Update data before exporting
    this.getInfo();
    
    // Prepare all data for export
    const exportData = this.filteredInfoData.map((item: any) => {
      return {
        'Judul Info': item.judul_info,
        'Informasi': item.informasi,
        'Tanggal Info': item.tgl_info,
      };
    });
  }
    viewExportedData() {
      this.navCtrl.navigateForward(['/uang'], {
        state: { exportedData: this.Data }
      });
    }
  }
  
   
