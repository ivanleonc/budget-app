import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditbudgetPage } from './editbudget.page';

const routes: Routes = [
  {
    path: '',
    component: EditbudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditbudgetPageRoutingModule {}
