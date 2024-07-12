import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComptesComponent } from './liste.comptes/liste.comptes.component';
import { CreerModifierCompteComponent } from './creer-modifier.compte/creer-modifier.compte.component';
import { DetailsCompteComponent } from './details.compte/details.compte.component';

const routes: Routes = [
  {
    path:'',
    component: ListeComptesComponent
  },
  {
    path: 'client/:id-client',
    component: CreerModifierCompteComponent
  },
  {
    path: ':id/details',
    component: DetailsCompteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteBanqueRoutingModule { }
