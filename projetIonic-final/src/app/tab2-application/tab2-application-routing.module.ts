import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2ApplicationPage } from './tab2-application.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2ApplicationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2ApplicationPageRoutingModule {}
