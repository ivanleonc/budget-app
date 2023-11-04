import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'budgets',
    loadChildren: () => import('./budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'newbudget',
    loadChildren: () => import('./newbudget/newbudget.module').then( m => m.NewbudgetPageModule)
  },
  {
    path: 'editbudget',
    loadChildren: () => import('./editbudget/editbudget.module').then( m => m.EditbudgetPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
