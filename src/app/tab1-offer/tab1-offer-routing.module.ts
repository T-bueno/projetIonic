import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1OfferPage } from './tab1-offer.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1OfferPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1OfferPageRoutingModule {}
