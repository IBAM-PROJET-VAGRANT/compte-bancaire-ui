import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'clients',
        loadChildren: ()=> import('../features/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'comptes',
        loadChildren: () => import('../features/compte-banque/compte-banque.module').then(m => m.CompteBanqueModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
