import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pesan',
  templateUrl: './pesan.page.html',
  styleUrls: ['./pesan.page.scss'],
})
export class PesanPage {
  public infoPesan: any[] = [];
  public selectedDate: string = '';
  public searchKeyword: string = '';

  constructor(
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.fetchMessages();
  }

  async fetchMessages() {
    try {
      const response = await this._apiService.getPesan();

      if (response.msg === 'ok') {
        this.infoPesan = response.data;
      } else if (response.msg === 'notFound') {
        this.presentToast('Belum ada info !', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in fetchMessages:', err);
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

  filterMessages() {
    // Filter messages based on selected date
    if (this.selectedDate !== '') {
      this.infoPesan = this.infoPesan.filter((data) => data.tgl_pesan === this.selectedDate);
    } else {
      // If selected date is empty, fetch all messages
      this.fetchMessages();
    }
  }

  uniqueDates(): string[] {
    // Extract unique dates from the data
    return Array.from(new Set(this.infoPesan.map((data) => data.tgl_pesan)));
  }

  async handleRefresh(event: any) {
    setTimeout(() => {
      this.fetchMessages();
      event.target.complete();
    }, 2000);
  }

  edit(kd_pesan: string) {
    if (kd_pesan !== undefined && kd_pesan !== null && kd_pesan.trim() !== '') {
      this.navCtrl.navigateRoot('/updatepesan?kd_pesan=' + kd_pesan);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_pesan: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletePesan(kd_pesan);
          },
        },
      ],
    });

    await alert.present();
  }

  async deletePesan(kd_pesan: string) {
    try {
      const res = await this._apiService.delete_Pesan(kd_pesan);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.fetchMessages(); // Refresh data after deletion
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePesan:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  searchBydate() {
    if (this.searchKeyword.trim() !== '') {
      this._apiService.getPesan(this.searchKeyword).then((res:any) => {
        if (res.msg === 'ok') {
          this.infoPesan = res.data;
          this.presentToast(
            'Data berhasil ditemukan!',
            'success',
            'checkmark-circle-outline'
          );
        } else if (res.msg === 'notFound') {
          this.infoPesan = [];
          this.presentToast(
            'Data tidak ditemukan.',
            'warning',
            'alert-circle-outline'
          );
        } else if (res.msg === 'err') {
          this.infoPesan = [];
          this.presentToast(
            'Something went wrong!',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    } else {
      // If searchKeyword is empty, fetch all messages
      this.fetchMessages();
    }
  }

  exportToExcel() {
    try {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.infoPesan);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      const today: string = new Date().toISOString().slice(0, 10);
      const fileName: string = `pesan_data_${today}.xlsx`;

      // Save the Excel file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = fileName;
      link.click();
    } catch (err) {
      console.error('Error exporting to Excel:', err);
      this.presentToast('Error exporting data', 'danger', 'alert-circle-outline');
    }
  }
}
