// report-info.page.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-uang',
  templateUrl: './uang.page.html',
  styleUrls: ['./uang.page.scss'],
})
export class UangPage implements OnInit {
  judulInfoData: any[] = [];
  jumlahInfoByNIK: any[] = [];

  constructor() {}

  ngOnInit() {
    // Dummy data (gantilah dengan data sesuai kebutuhan)
    this.judulInfoData = ['Info A', 'Info B', 'Info C'];
    this.jumlahInfoByNIK = [30, 20, 15];

    // Menampilkan grafik
    this.showChartData();
  }

  showChartData() {
    // Bar Chart
    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: this.judulInfoData,
        datasets: [{
          label: 'Jumlah Info',
          data: this.jumlahInfoByNIK,
          backgroundColor: ['blue', 'red', 'green'],
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
        labels: this.judulInfoData,
        datasets: [{
          data: this.jumlahInfoByNIK,
          backgroundColor: ['blue', 'red', 'green'],
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
