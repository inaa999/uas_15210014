// penduduk.page.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-r-pnddk',
  templateUrl: './r-pnddk.page.html',
  styleUrls: ['./r-pnddk.page.scss'],
})
export class RPnddkPage implements OnInit {
  statusAktifData: any[] = [];
  jumlahPendudukByTanggalMasuk: any[] = [];

  constructor() {}

  ngOnInit() {
    // Dummy data (gantilah dengan data sesuai kebutuhan)
    this.statusAktifData = ['Aktif', 'Tidak Aktif'];
    this.jumlahPendudukByTanggalMasuk = [50, 30, 20];

    // Menampilkan grafik
    this.showChartData();
  }

  showChartData() {
    // Bar Chart
    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: this.statusAktifData,
        datasets: [{
          label: 'Jumlah Penduduk',
          data: this.jumlahPendudukByTanggalMasuk,
          backgroundColor: ['blue', 'red'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Pie Chart
    const pieChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(pieChartCanvas, {
      type: 'pie',
      data: {
        labels: this.statusAktifData,
        datasets: [{
          data: this.jumlahPendudukByTanggalMasuk,
          backgroundColor: ['blue', 'red'],
          hoverOffset: 4
        }]
      }
    });
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    // Logic refresh data jika diperlukan

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
