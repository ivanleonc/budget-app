import { Component, OnInit } from '@angular/core';
import { Budget } from '../../app/budget';
import { BudgetsService } from './../services/budgets.service';
import { Observable, map } from 'rxjs';

import { ToastController, NavController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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
  // async generateAndDownloadPDFOne(budget: Budget): Promise<void> {
  //   const documentDefinition = {
  //     content: [
  //       //{ text: 'Presupuesto', style: 'header' },
  //       { text: `Producto: ${budget.name_product}` },
  //       { text: `Valor: ${budget.product_value} USD` },
  //       { text: `Cantidad: ${budget.product_quantity}` },
  //       { text: `Peso: ${budget.product_weight} g` },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 10, 0, 10] as [number, number, number, number],
  //       },
  //     },
  //   };

  //   pdfMake.createPdf(documentDefinition).download();
  // }
  async generateAndDownloadPDFAll(): Promise<void> {
    const budgetsObservable = await this.budgetsService.getBudget();
    const budgets = await budgetsObservable.toPromise();
    console.log("generateAndDownloadPDFAll");
    // Verificar si budgets es undefined y asignar un array vacío en su lugar
    const budgetsArray = budgets || [];
  
    // Crear filas para la tabla
    const tableRows = budgetsArray.map(budget => [
      { text: budget.name_product, alignment: 'left' },
      { text: budget.product_weight, alignment: 'center' },
      { text: budget.product_quantity, alignment: 'center' },
      { text: budget.product_value, alignment: 'right' },
    ]);
  
    // Agregar encabezados de la tabla
    const tableHeader = [
      { text: 'Producto', style: 'tableHeader', alignment: 'left' },
      { text: 'Peso (gramos)', style: 'tableHeader', alignment: 'center' },
      { text: 'Cantidad', style: 'tableHeader', alignment: 'center' },
      { text: 'Valor', style: 'tableHeader', alignment: 'right' },
    ];
  
    // Agregar una línea para mostrar el total
    const totalRow = [
      { text: 'Total del presupuesto completo', colSpan: 3, style: 'tableHeader', alignment: 'right' },
      {},
      {},
      { text: this.getTotalFormatted(budgetsArray), alignment: 'right' },
    ];
  
    const fileName = `budget-all-${this.getFormattedDateTime()}.pdf`;
    const formattedDateTime = this.getFormattedDateTime();
    // Definir estilos, incluido el estilo para el encabezado de la tabla
    const documentDefinition = {
      content: [
        { text: 'Presupuestos', style: 'header' },
        { text: `Fecha y hora: ${formattedDateTime}`, style: 'right'},
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [tableHeader, ...tableRows, totalRow],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] as [number, number, number, number] },
        tableHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 10] as [number, number, number, number] },
      },
    };
  
    // Generar y descargar el PDF
    pdfMake.createPdf(documentDefinition).download(fileName);
  }
  getTotalFormatted(budgets: Budget[]): string {
    const totalValue = budgets ? budgets.reduce((acc, budget) => acc + parseFloat(budget.product_value), 0) : 0;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalValue);
  }
  getFormattedDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
