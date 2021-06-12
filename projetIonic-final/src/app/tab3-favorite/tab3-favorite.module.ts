import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3FavoritePage } from './tab3-favorite.page';

import { Tab3FavoritePageRoutingModule } from './tab3-favorite-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3FavoritePage }]),
    Tab3FavoritePageRoutingModule,
  ],
  declarations: [Tab3FavoritePage]
})
export class Tab3FavoritePageModule {}
