import { ApiserviceService } from './../apiservice.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  tahun_pengeluaran: any[] = [];
  total_pengeluaran: any[] = [];

  constructor(
    private _apiService: ApiserviceService,
  ) { }

  ngOnInit() {
    this.fetchUangData();
  }

  async fetchUangData() {
    try {
      const res = await this._apiService.getuang();

      if (res.msg === 'ok') {
        // Extracting year from each date
        const groupedData = this.groupDataByYear(res.data);

        // Extracting data for pie chart
        this.tahun_pengeluaran = Object.keys(groupedData);
        
        // Explicitly cast the result to any[] to resolve type error
        this.total_pengeluaran = (Object.values(groupedData) as any[]).map((expenses: any[]) =>
          expenses.reduce((total: number, expense: any) => total + expense.kd_pengeluaran, 0)
        );

        // Show charts
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

  groupDataByYear(data: any[]) {
    return data.reduce((acc: any, item: any) => {
      const year = new Date(item.tanggal_keluar).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
  }

  showChartData() {
    // Bar Chart
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.tahun_pengeluaran,
        datasets: [{
          label: 'Total Pengeluaran',
          data: this.total_pengeluaran,
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
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.tahun_pengeluaran,
        datasets: [{
          data: this.total_pengeluaran,
          backgroundColor: [
            'red', 'blue', 'green', 'orange', 'purple', 'yellow', 'pink', 'brown', 'grey', 'cyan'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}
