import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOfferPage } from './detail-offer.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOfferPageRoutingModule {}
