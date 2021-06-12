import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4ProfilePage } from './tab4-profile.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4ProfilePageRoutingModule {}
