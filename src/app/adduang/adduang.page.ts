import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router'; // Import Router
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adduang',
  templateUrl: './adduang.page.html',
  styleUrls: ['./adduang.page.scss'],
})
export class AdduangPage implements OnInit {
  public newUangkeluarData: any = {};
  public kd_pengeluaran: string = '';
  public keterangan: string = '';
  public buktiFile: File | null = null;
  public tanggal_keluar: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private router: Router, // Inject Router
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.buktiFile = files[0];
    }
  }

  async createuangkeluar() {
    try {
      const formData = new FormData();
      formData.append('kd_pengeluaran', this.kd_pengeluaran);
      formData.append('keterangan', this.keterangan);
      if (this.buktiFile) {
        formData.append('bukti', this.buktiFile, this.buktiFile.name);
      }
      formData.append('tanggal_keluar', this.tanggal_keluar);

      const response = await this._apiService.createuangkeluar(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Pengeluaran added successfully', 'success');

        // Refresh the 'uangkeluar' page
        this.router.navigate(['/uangkeluar'], { replaceUrl: true });
      } else if (response.msg === 'notOk') {
        // Handle the case when data addition fails
        this.presentToast('Failed to add pengeluaran', 'danger');
      } else {
        // Handle other error cases
        this.presentToast('Something went wrong', 'danger');
      }
    } catch (err: any) {
      console.log(err);
      // Handle unexpected errors
      this.presentToast('An error occurred', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
