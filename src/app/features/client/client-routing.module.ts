import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeClientsComponent } from './liste.clients/liste.clients.component';
import { CreerModifierClientComponent } from './creer-modifier.client/creer-modifier.client.component';
import { DetailsClientComponent } from './details.client/details.client.component';

const routes: Routes = [
  {
    path: '',
    component: ListeClientsComponent
  },
  {
    path: 'nouveau',
    component: CreerModifierClientComponent
  },
  {
    path: ':id/modifie',
    component: CreerModifierClientComponent
  },
  {
    path: ":id/details",
    component: DetailsClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
