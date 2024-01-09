import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-e-pengeluaran',
  templateUrl: './e-pengeluaran.page.html',
  styleUrls: ['./e-pengeluaran.page.scss'],
})
export class EPengeluaranPage implements OnInit {
  public Data: any;
  public pengeluaran : any ;
  public kd_pengeluaran: any;
  public nama_pengeluaran: string = '';
  public status: any;


  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService

  ) {
    this.route.queryParams.subscribe((params) => {
      const kd_pengeluaran = params['kd_pengeluaran'];
      if (kd_pengeluaran == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_pengeluaran = kd_pengeluaran;
        this.getpengeluaran();
      }
    });
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const kd_pengeluaran = params.get('kd_pengeluaran');
      if (kd_pengeluaran == null) {
        this.presentToast('No Parameter found!', 'warning', 'alert-circle-outline');
      } else {
        this.kd_pengeluaran = kd_pengeluaran;
        this.getpengeluaran();
      }
    });
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

  async getpengeluaran() {
    try {
      await this.storage.create();
      this._apiService.getPengeluaran().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter((item: any) => item.kd_pengeluaran === this.kd_pengeluaran);
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_pengeluaran = dataItem.kd_pengeluaran;
            this.nama_pengeluaran = dataItem.nama_pengeluaran;
            this.status = dataItem.status;
          } else {
            this.presentToast('Data not found', 'warning', 'alert-circle-outline');
          }
        } else if (res.msg == 'err') {
          this.presentToast(
            'Something went wrong: ' + String(res.err),
            'danger',
            'alert-circle-outline'
          );
        }
      });
    } catch (error) {
      console.error('Error in getpengeluaran', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }
  async Update() {
    try {
      if (
        this.kd_pengeluaran == '' ||
       
        this.nama_pengeluaran == '' ||
        this.status == ''
      ) {
        this.presentToast(
          'Tidak boleh ada form yang kosong, harap isi semua form!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
          spinner: 'lines',
        });
        loader.present();
  
        const updateData = {
          kd_pengeluaran: this.kd_pengeluaran,
          
          nama_pengeluaran: this.nama_pengeluaran,
          status: this.status
        };
  
        this._apiService.updatePengeluaran(updateData, this.kd_pengeluaran).then((res) => {
          if (res.msg == 'ok') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Data berhasil diubah !',
              'success',
              'checkmark-circle-outline'
            );
            this.navCtrl.navigateRoot('/pengeluaran');
          } else if (res.msg == 'notOk') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Data gagal diubah !',
              'danger',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Something went wrong !',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    } catch (error) {
      console.error('Error in Update', error);
      this.presentToast('Error updating data', 'danger', 'alert-circle-outline');
    }
  }
  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/pengeluaran');
  }


}
