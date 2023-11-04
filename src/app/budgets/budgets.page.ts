import { Component, OnInit, inject } from '@angular/core';
import { Budget } from '../../app/budget';
import { BudgetsService } from './../services/budgets.service';
import { Observable, map } from 'rxjs';

import { ToastController, NavController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budgets$!: Budget[];

  constructor(
    private budgetsService: BudgetsService,
    private route: ActivatedRoute,
    private nav: NavController,
    private loadingController: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  async getBudgets(): Promise<void>{
    //metodo que consulta a la base de datos (Firebase)
    (await this.budgetsService.getBudget()).subscribe((budgets)=>{
      this.budgets$ = budgets;
    });
  }
  ionViewDidEnter(){
    //actualiza la lista, cada vez que ingresa a la lista
    this.getBudgets();
  }
  async selectBudget(budget:any){
    let actionSheet = await this.actionSheetCtrl.create({
      header: "Que desea hacer?",
      buttons:[{
        text: "Borrar presupuesto",
        role: "destructive",
        handler:()=>{
          this.deleteBudget(budget);
        }
      },
    {
      text: "Modificar presupuesto",
      handler:()=>{
        this.editBudget(budget);
      }
    },
  {
    text:"Cancelar",
    role: "cancel",
    handler:()=>{
      console.log('cancelado');
    }
  }]
    });
    await actionSheet.present();
  }
  async deleteBudget(budget:any){
    const alert = await this.alertCtrl.create({
      header: "Borrar!",
      message: "Esta seguro?",
      buttons:[{
        text: "Si",
        handler:()=>{
          this.budgetsService.deleteBudgetOne(budget);
          this.getBudgets();
          this.showMessage("Presupuesto eliminado!!!");
        }
    },
  {
    text: "No",
    role: "cancel",
    cssClass: "secondary"
  }]
    });
    await alert.present();
  }
  showMessage(message:string){
    this.toastCtrl.create({
      message:message,
      duration:2000
    }).then(toast=> toast.present());
  }
  async editBudget(budget:any){
    this.router.navigate(["tabs/editbudget",budget]);
  }
}
