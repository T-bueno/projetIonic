import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffrePageRoutingModule } from './offre-routing.module';

import { OffrePage } from './offre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffrePageRoutingModule
  ],
  declarations: [OffrePage]
})
export class OffrePageModule {}
