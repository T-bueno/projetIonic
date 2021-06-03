import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'offre',
        loadChildren: () => import('../offre/offre.module').then(m => m.OffrePageModule)
      },
      {
        path: 'candidatures',
        loadChildren: () => import('../candidatures/candidatures.module').then(m => m.CandidaturesPageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then(m => m.FavorisPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'detailOffre/:id',
        loadChildren: () => import('../detail-offre/detail-offre.module').then( m => m.DetailOffrePageModule)
      },
      {
        path: '',
        redirectTo: '/menu/offre',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/menu/offre',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MenuPageRoutingModule {}
