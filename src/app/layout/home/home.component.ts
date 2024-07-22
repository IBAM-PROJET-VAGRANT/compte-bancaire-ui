
// home.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  searchTransaction() {
    // Logique pour rechercher une transaction
    console.log('Rechercher une transaction');
  }

  addTransaction() {
    // Logique pour ajouter une transaction
    console.log('Ajouter une transaction');
  }
}

