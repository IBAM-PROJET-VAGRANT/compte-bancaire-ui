import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteBanqueRoutingModule } from './compte-banque-routing.module';
import { CreerModifierCompteComponent } from './creer-modifier.compte/creer-modifier.compte.component';
import { ListeComptesComponent } from './liste.comptes/liste.comptes.component';
import { DetailsCompteComponent } from './details.compte/details.compte.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreerModifierCompteComponent,
    ListeComptesComponent,
    DetailsCompteComponent
  ],
  imports: [
    CommonModule,
    CompteBanqueRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompteBanqueModule { }
