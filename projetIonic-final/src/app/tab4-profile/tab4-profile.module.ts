import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4ProfilePageRoutingModule } from './tab4-profile-routing.module';

import { Tab4ProfilePage } from './tab4-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4ProfilePageRoutingModule
  ],
  declarations: [Tab4ProfilePage]
})
export class Tab4ProfilePageModule {}
