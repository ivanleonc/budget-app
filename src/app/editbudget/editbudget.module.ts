import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditbudgetPageRoutingModule } from './editbudget-routing.module';

import { EditbudgetPage } from './editbudget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditbudgetPageRoutingModule
  ],
  declarations: [EditbudgetPage]
})
export class EditbudgetPageModule {}
