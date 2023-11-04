import { Component, OnInit } from '@angular/core';

import { BudgetsService } from './../services/budgets.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Budget } from '../../app/budget';

@Component({
  selector: 'app-editbudget',
  templateUrl: './editbudget.page.html',
  styleUrls: ['./editbudget.page.scss'],
})
export class EditbudgetPage implements OnInit {

  id: any;
  selected!: Budget;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private loadingController: LoadingController,
    private budgetsService: BudgetsService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.route.params.forEach(async (params:Params)=>{
      (await this.budgetsService.getBudgetById(params['id'])).subscribe((selected)=>{
        this.id = params['id'];
        this.selected = selected!;
      });
    });
  }
  back():void{
    this.router.navigate(['tabs/budgets']);
  }
  editBudget():void{
    this.budgetsService.editBudgetOne(this.selected, this.id).then(()=>{
      this.showMessage('Presupuesto actualizado');
      this.back();
    }, err=>{
      this.showMessage('Hubo un error:(');
    });
  }
  showMessage(message:string){
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).then(toast => toast.present());
  }
}
