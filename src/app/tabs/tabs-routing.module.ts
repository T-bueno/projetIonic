import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'offer',
        loadChildren: () => import('../tab1-offer/tab1-offer.module').then(m => m.Tab1OfferPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'application',
        loadChildren: () => import('../tab2-application/tab2-application.module').then(m => m.Tab2ApplicationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'favorite',
        loadChildren: () => import('../tab3-favorite/tab3-favorite.module').then(m => m.Tab3FavoritePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../tab4-profile/tab4-profile.module').then( m => m.Tab4ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'detail-offer/:id',
        loadChildren: () => import('../detail-offer/detail-offer.module').then( m => m.DetailOfferPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/offer',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/offer',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
