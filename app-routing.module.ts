import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./src/app/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'penduduk',
    loadChildren: () => import('./src/app/penduduk/penduduk.module').then( m => m.PendudukPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./src/app/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./src/app/iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'blok',
    loadChildren: () => import('./src/app/blok/blok.module').then( m => m.BlokPageModule)
  },
  {
    path: 'pesan',
    loadChildren: () => import('./src/app/pesan/pesan.module').then( m => m.PesanPageModule)
  },
  

  {
    path: 'e-penduduk',
    loadChildren: () => import('./src/app/e-penduduk/e-penduduk.module').then( m => m.EPendudukPageModule)
  },
  {
    path: 'e-info',
    loadChildren: () => import('./src/app/e-info/e-info.module').then( m => m.EInfoPageModule)
  },
  {
    path: 't-info',
    loadChildren: () => import('./src/app/t-info/t-info.module').then( m => m.TInfoPageModule)
  },
  {
    path: 'e-info',
    loadChildren: () => import('./src/app/e-info/e-info.module').then( m => m.EInfoPageModule)
  },
  {
    path: 't-info',
    loadChildren: () => import('./src/app/t-info/t-info.module').then( m => m.TInfoPageModule)
  },
  {
    path: 'update-penduduk',
    loadChildren: () => import('./src/app/update-penduduk/update-penduduk.module').then( m => m.UpdatePendudukPageModule)
  },
  {
    path: 'tambah-penduduk',
    loadChildren: () => import('./src/app/tambah-penduduk/tambah-penduduk.module').then( m => m.TambahPendudukPageModule)
  },
  {
    path: 'tambah-blok',
    loadChildren: () => import('./src/app/tambah-blok/tambah-blok.module').then( m => m.TambahBlokPageModule)
  },
  {
    path: 'update-blok',
    loadChildren: () => import('./src/app/update-blok/update-blok.module').then( m => m.UpdateBlokPageModule)
  },
  {
    path: 'tambah-iuran',
    loadChildren: () => import('./src/app/tambah-iuran/tambah-iuran.module').then( m => m.TambahIuranPageModule)
  },
  {
    path: 'update-iuran',
    loadChildren: () => import('./src/app/update-iuran/update-iuran.module').then( m => m.UpdateIuranPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
