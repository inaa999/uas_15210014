import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
})
export class PengaturanPage {

  constructor(
    private router: Router,
    private storage :Storage,
    private navCtrl: NavController,
    private authService: ApiserviceService
  ) {}

  goToSearchHistory() {
    // Navigasi ke halaman histori pencarian
    this.router.navigate(['/search-history']);
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }
  async confirmLogout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }
}

