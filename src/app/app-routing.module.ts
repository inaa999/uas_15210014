import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/penduduk',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'penduduk',
    loadChildren: () => import('./penduduk/penduduk.module').then( m => m.PendudukPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'pesan',
    loadChildren: () => import('./pesan/pesan.module').then( m => m.PesanPageModule)
  },
  {
    path: 'updatependuduk',
    loadChildren: () => import('./updatependuduk/updatependuduk.module').then( m => m.UpdatependudukPageModule)
  },
  {
    path: 'updateinfo',
    loadChildren: () => import('./updateinfo/updateinfo.module').then( m => m.UpdateinfoPageModule)
  },
  {
    path: 'addpenduduk',
    loadChildren: () => import('./addpenduduk/addpenduduk.module').then( m => m.AddpendudukPageModule)
  },
  {
    path: 'updateiuran',
    loadChildren: () => import('./updateiuran/updateiuran.module').then( m => m.UpdateiuranPageModule)
  },
  {
    path: 'addinfo',
    loadChildren: () => import('./addinfo/addinfo.module').then( m => m.AddinfoPageModule)
  },
  {
    path: 'blok',
    loadChildren: () => import('./blok/blok.module').then( m => m.BlokPageModule)
  },
  {
    path: 'suratkeluar',
    loadChildren: () => import('./suratkeluar/suratkeluar.module').then( m => m.SuratkeluarPageModule)
  },
  {
    path: 'updatesurat',
    loadChildren: () => import('./updatesurat/updatesurat.module').then( m => m.UpdatesuratPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'updateuser',
    loadChildren: () => import('./updateuser/updateuser.module').then( m => m.UpdateuserPageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./adduser/adduser.module').then( m => m.AdduserPageModule)
  },
  {
    path: 'addblok',
    loadChildren: () => import('./addblok/addblok.module').then( m => m.AddblokPageModule)
  },
  {
    path: 'addpesan',
    loadChildren: () => import('./addpesan/addpesan.module').then( m => m.AddpesanPageModule)
  },
  {
    path: 'addsurat',
    loadChildren: () => import('./addsurat/addsurat.module').then( m => m.AddsuratPageModule)
  },
  {
    path: 'updatepesan',
    loadChildren: () => import('./updatepesan/updatepesan.module').then( m => m.UpdatepesanPageModule)
  },
  {
    path: 'updateblok',
    loadChildren: () => import('./updateblok/updateblok.module').then( m => m.UpdateblokPageModule)
  },
  {
    path: 'pengeluaran',
    loadChildren: () => import('./pengeluaran/pengeluaran.module').then( m => m.PengeluaranPageModule)
  },
  {
    path: 'uangkeluar',
    loadChildren: () => import('./uangkeluar/uangkeluar.module').then( m => m.UangkeluarPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
 
  {
    path: 'pengaturan',
    loadChildren: () => import('./pengaturan/pengaturan.module').then( m => m.PengaturanPageModule)
  },
  {
    path: 'e-pengeluaran',
    loadChildren: () => import('./e-pengeluaran/e-pengeluaran.module').then( m => m.EPengeluaranPageModule)
  },
  {
    path: 't-pengeluaran',
    loadChildren: () => import('./t-pengeluaran/t-pengeluaran.module').then( m => m.TPengeluaranPageModule)
  },
  {
    path: 't-pemasukan',
    loadChildren: () => import('./t-pemasukan/t-pemasukan.module').then( m => m.TPemasukanPageModule)
  },
  
  {
    path: 'uang',
    loadChildren: () => import('./uang/uang.module').then( m => m.UangPageModule)
  },
  {
    path: 'e-uang',
    loadChildren: () => import('./e-uang/e-uang.module').then( m => m.EUangPageModule)
  },
  {
    path: 'adduang',
    loadChildren: () => import('./adduang/adduang.module').then( m => m.AdduangPageModule)
  },
  {
    path: 'addiuran',
    loadChildren: () => import('./addiuran/addiuran.module').then( m => m.AddiuranPageModule)
  },
  {
    path: 'g-pnddk',
    loadChildren: () => import('./g-pnddk/g-pnddk.module').then( m => m.GPnddkPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'r-pnddk',
    loadChildren: () => import('./r-pnddk/r-pnddk.module').then( m => m.RPnddkPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
