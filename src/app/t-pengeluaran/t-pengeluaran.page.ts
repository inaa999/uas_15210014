import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-t-pengeluaran',
  templateUrl: './t-pengeluaran.page.html',
  styleUrls: ['./t-pengeluaran.page.scss'],
})
export class TPengeluaranPage implements OnInit {
  newPengeluaranData: any = {};
  public nama_pengeluaran: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async createPengeluaran() {
    try {
      const formData = new FormData();
      formData.append('nama_pengeluaran', this.nama_pengeluaran);

      const response = await this._apiService.createPengeluaran(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('pengeluaran added successfully', 'success');

        // Navigate back to the 'Pengeluaran' page
        this.navCtrl.navigateBack('/Pengeluaran');
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

  async doRefresh(event: { target: { complete: () => void; }; }) {
    // Put your refresh logic here, for example, fetching updated data from the server

    setTimeout(() => {
      // Complete the refresh and close the spinner
      event.target.complete();
    }, 2000);
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

  goTopengeluaranPage() {
    // Navigate back to the 'Pengeluaran' page
    this.navCtrl.navigateBack('/Pengeluaran');
  }

  Back() {
    // Implement the logic for the 'Back' button as needed
  }
}
