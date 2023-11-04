import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewbudgetPage } from './newbudget.page';

const routes: Routes = [
  {
    path: '',
    component: NewbudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewbudgetPageRoutingModule {}
