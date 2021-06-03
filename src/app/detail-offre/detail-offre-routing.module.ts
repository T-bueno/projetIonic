import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOffrePage } from './detail-offre.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOffrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOffrePageRoutingModule {}
