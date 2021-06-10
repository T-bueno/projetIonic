import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2ApplicationPage } from './tab2-application.page';

import { Tab2ApplicationPageRoutingModule } from './tab2-application-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2ApplicationPageRoutingModule
  ],
  declarations: [Tab2ApplicationPage]
})
export class Tab2ApplicationPageModule {}
