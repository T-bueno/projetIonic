import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutPage } from './logout.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutPage,
    children :[
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutPageRoutingModule {}
