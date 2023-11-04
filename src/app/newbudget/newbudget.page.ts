import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Budget } from '../../app/budget';

import { BudgetsService } from './../services/budgets.service';

@Component({
  selector: 'app-newbudget',
  templateUrl: './newbudget.page.html',
  styleUrls: ['./newbudget.page.scss'],
})
export class NewbudgetPage implements OnInit {

  newBudget = {} as Budget;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private loadingController: LoadingController,
    private budgetsService: BudgetsService,
    private router: Router,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }
  newBudgetOne(newBudget:any){
    this.showMessage('Guardando...');
    this.budgetsService.createNewBudget(this.newBudget).then(()=>{
      this.router.navigateByUrl('tabs/budgets');
      this.showMessage('Presupuesto Registrado');
    }, err =>{
      this.showMessage('Hubo un error:(');
    });
  }
  showMessage(message:string){
    this.toastCtrl.create({
      message: message,
      duration:2000
    }).then(toast => toast.present());
  }

}
