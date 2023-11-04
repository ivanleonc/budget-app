import { Injectable, inject } from '@angular/core';

import {updateDoc, deleteDoc, Firestore, collection, addDoc, getDoc,
CollectionReference, DocumentReference, query, getDocs, DocumentData, doc} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { Budget } from '../../app/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  public firestore: Firestore = inject(Firestore);
  listcbudgets!: DocumentData[];
  budgetsCollection: CollectionReference;

  constructor() { 
    this.budgetsCollection = collection(this.firestore, 'budgets');
  }
  async createNewBudget(budget: Budget): Promise<DocumentReference>{
    let documentReference1:DocumentReference;
    documentReference1 = await addDoc(this.budgetsCollection, budget);
    return documentReference1;
  }
  async getBudget():Promise<Observable<Budget[]>>{
    let budgets = Array();
    (await getDocs(query(collection(this.firestore, 'budgets')))).docs.map((budget)=>{
      const data = budget.data();
      data["id"] = budget.id;
      budgets.push(data);
    });
    return of(budgets as Budget[]);
  }
  deleteBudgetOne(id:any){
    let budgetRef:DocumentReference;
    budgetRef = doc(this.firestore, "budgets", id);
    deleteDoc(budgetRef).then(()=>{
      console.log("Presupuesto eliminado: "+id);
    }).catch(err =>{
      console.log(err);
    });
  }
  async getBudgetById(id:string):Promise<Observable<Budget | undefined>>{
    let budget: Budget;
    const docRef = doc(this.firestore, "budgets", id);
    const docSnap = (await getDoc(docRef));
    budget = docSnap.data() as Budget;
    console.log(docSnap.data());
    return of(budget);
  }

  async editBudgetOne(budget:Budget, id:any): Promise<void>{
    let budgetRef:DocumentReference;
    budgetRef = doc(this.firestore, "budgets", id);
    await updateDoc(budgetRef,{
      name_product:budget.name_product,
      product_quantity: budget.product_quantity,
      product_value: budget.product_value,
      product_weight: budget.product_weight
    }).then(()=>{
      console.log("Presupuesto actualizado: "+id);
    }).catch(err=>{
      console.log(err);
    });
  }
}
