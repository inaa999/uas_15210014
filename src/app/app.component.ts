// Import yang diperlukan
import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Referensi ke IonMenu
  @ViewChild(IonMenu) menu!: IonMenu;

  // Daftar halaman menu
  public appPages = [
    { title: 'Penduduk', url: '/penduduk', icon: 'people' },
    { title: 'Info', url: '/info', icon: 'information' },
    { title: 'Iuran', url: '/iuran', icon: 'cash' },
    { title: 'Pesan', url: '/pesan', icon: 'chatbox' },
    { title: 'Blok', url: '/blok', icon: 'home' },
    { title: 'Surat', url: '/suratkeluar', icon: 'wallet' },
    { title: 'User', url: '/user', icon: 'person' },
    { title: 'Pengeluaran', url: '/pengeluaran', icon: 'keypad' },
    { title: 'Uangkeluar', url: '/uangkeluar', icon: 'cash' },
    { title: 'Report', url: '/report', icon: 'cart' },
    { title: 'Pengaturan', url: '/pengaturan', icon: 'settings' },

    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private storage : Storage,
    private platform: Platform,
    private router : Router
    
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    await this.storage.create();
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault(); // Uncomment if you have StatusBar
    });

    this.storage.get('isLoggedIn').then((val) => {
      if (val === null || val === undefined || val === '') {
        this.router.navigateByUrl('/login'); // Navigasi ke halaman splash
      } else {
        this.router.navigateByUrl('/penduduk'); // Navigasi ke halaman tab1
      }
    });
  }
}