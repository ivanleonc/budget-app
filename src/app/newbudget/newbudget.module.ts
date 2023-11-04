import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewbudgetPageRoutingModule } from './newbudget-routing.module';

import { NewbudgetPage } from './newbudget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewbudgetPageRoutingModule
  ],
  declarations: [NewbudgetPage]
})
export class NewbudgetPageModule {}
