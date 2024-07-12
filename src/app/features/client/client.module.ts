import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ListeClientsComponent } from './liste.clients/liste.clients.component';
import { CreerModifierClientComponent } from './creer-modifier.client/creer-modifier.client.component';
import { DetailsClientComponent } from './details.client/details.client.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListeClientsComponent,
    CreerModifierClientComponent,
    DetailsClientComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
