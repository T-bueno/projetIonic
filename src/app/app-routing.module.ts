import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu/menu.page';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }]
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'offre',
    loadChildren: () => import('./offre/offre.module').then( m => m.OffrePageModule)
  },
  {
    path: 'candidatures',
    loadChildren: () => import('./candidatures/candidatures.module').then( m => m.CandidaturesPageModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'menu/:var',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
