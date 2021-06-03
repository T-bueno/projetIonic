import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffrePage } from './offre.page';

const routes: Routes = [
  {
    path: '',
    component: OffrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffrePageRoutingModule {}
