import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../models/client.model';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-liste.clients',
  templateUrl: './liste.clients.component.html',
  styleUrl: './liste.clients.component.scss'
})
export class ListeClientsComponent implements OnInit {

  clients!: Observable<IClient[]>;
  errorMsg!: string;
  searchClientFormGroup: FormGroup | undefined;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchClientFormGroup = this.fb.group({
      searchTerm: this.fb.control("")
    });
    this.loadAll();
  }

  onShowCompteForm(client: IClient) {
    this.router.navigate(["admin","comptes", "client", client.idClient], {state: client});
  }

  onEditClient(client: IClient) {
    this.router.navigate(["admin", "clients", client.idClient, "modifie"], {state: client})
  }

  onConfirmDelete(id: number | undefined): void {
    this.delete(id);
  }

  delete(id: number | undefined): void {
    if (id) {
      this.clientService.delete(id).subscribe({
        next: (res: any) => {
          this.loadAll();
        },
        error: (e: any) => {
          console.log("_________________DELETE_ERROR ", e);
        }
      })
    }
  }

  searchClients() {
    let st = this.searchClientFormGroup?.value.searchTerm;
    this.clients = this.clientService.search(st).pipe(
      catchError((error) => {
        this.errorMsg = error.message;
        return throwError(() => new Error(error));
      })
    )
  }

  private loadAll() {
    this.clients = this.clientService.findAll().pipe(
      catchError((error) => {
        this.errorMsg = error.message;
        return throwError(() => new Error(error));
      })
    );
  }
}
