import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3FavoritePage } from './tab3-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3FavoritePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3FavoritePageRoutingModule {}
