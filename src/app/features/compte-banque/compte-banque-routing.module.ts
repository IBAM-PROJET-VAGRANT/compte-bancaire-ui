import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, ResolveFn, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import { ListeComptesComponent } from './liste.comptes/liste.comptes.component';
import { CreerModifierCompteComponent } from './creer-modifier.compte/creer-modifier.compte.component';
import { DetailsCompteComponent } from './details.compte/details.compte.component';
import {ICompte} from "../../models/compte.model";
import {CompteService} from "../../services/compte.service";
export const compteResove: ResolveFn<ICompte | null> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
  let compteId: number = Number(route.paramMap.get('id'));
  if(compteId) {
    return inject(CompteService).find(compteId);
  }
  return null
}

const routes: Routes = [
  {
    path:'',
    component: ListeComptesComponent
  },
  {
    path: 'nouveau',
    component: CreerModifierCompteComponent
  },
  {
    path: ':id/modifie',
    component: CreerModifierCompteComponent,
    resolve: {compte: compteResove}
  },
  {
    path: 'client/:id-client',
    component: CreerModifierCompteComponent
  },
  {
    path: ':id/details',
    component: DetailsCompteComponent,
    resolve: {compte: compteResove}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteBanqueRoutingModule { }
