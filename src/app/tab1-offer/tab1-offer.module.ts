import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1OfferPage } from './tab1-offer.page';

import { Tab1OfferPageRoutingModule } from './tab1-offer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1OfferPageRoutingModule
  ],
  declarations: [Tab1OfferPage]
})
export class Tab1OfferPageModule {}
