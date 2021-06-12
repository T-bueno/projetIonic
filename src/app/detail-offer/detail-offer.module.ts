import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailOfferPageRoutingModule } from './detail-offer-routing.module';

import { DetailOfferPage } from './detail-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailOfferPageRoutingModule
  ],
  declarations: [DetailOfferPage]
})
export class DetailOfferPageModule {}
