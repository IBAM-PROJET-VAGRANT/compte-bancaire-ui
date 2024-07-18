import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../models/client.model';
import {catchError, map, Observable, throwError} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {IApiResponse} from "../../../models/api-response.model";

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
  onConfirmDelete(client: IClient): void {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer!",
      cancelButtonText: "Annuler!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(client);
      }
    });
  }
  delete(client: IClient): void {
    if (client.idClient) {
      this.clientService.delete(client.idClient).subscribe({
        next: (res: IApiResponse) => {
          console.log("DELETE_RESPONSE ", res);
          this.clients=this.clients.pipe(
            map(data=>{
              let index=data.indexOf(client);
              data.slice(index,1);
              return data;
            })
          );
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
