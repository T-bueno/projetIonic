import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailOffrePageRoutingModule } from './detail-offre-routing.module';

import { DetailOffrePage } from './detail-offre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailOffrePageRoutingModule
  ],
  declarations: [DetailOffrePage]
})
export class DetailOffrePageModule {}
