import { GPnddkPageModule } from './g-pnddk.module';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-g-pnddk',
  templateUrl: './g-pnddk.page.html',
  styleUrls: ['./g-pnddk.page.scss'],
})
export class GPnddkPage implements OnInit {
  kd_blok: any[] = [];
  nik: any[] = [];
  nama_blok: any[] = [];
 

  constructor(
    private _apiService: ApiserviceService,
  ) { }

  ngOnInit() {
    this.fetchpendudukData();
  }

  async fetchpendudukData() {
    try {
      const res = await this._apiService.getBlok();

      if (res.msg === 'ok') {
        // Mengambil data kd_pengeluaran dan tanggal_keluar dari res.data
        this.kd_blok = res.data.map((item: { kd_blok: any; }) => item.kd_blok);
        this.nik = res.data.map((item: { nik: any; }) => item.nik);
        this.nama_blok = res.data.map((item: { nama_blok: any; }) => item.nama_blok);

        // Memanggil metode untuk menampilkan grafik
        this.showChartData();
      } else if (res.msg === 'notFound') {
        console.log('Data not found');
      } else {
        console.error('Error fetching data:', res.err);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  showChartData() {
    const datasets = [{
      label: 'Kode blok',
      data: this.kd_blok,
      borderWidth: 1,
      backgroundColor: [] // Array untuk menyimpan warna untuk setiap bar
    }];

    // Tentukan warna untuk setiap bar berdasarkan nilai kd_pengeluaran
    for (let i = 0; i < this.kd_blok.length; i++) {
      const value = this.kd_blok[i];

      // Pilih warna berdasarkan nilai
      const color = value > 20 ? 'green' : (value > 10 ? 'blue' : 'red');

      datasets[0].backgroundColor.push();
    }

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.kd_blok,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
