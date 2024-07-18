import { Component, OnInit } from '@angular/core';
import { CompteService } from '../../../services/compte.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { ICompte } from '../../../models/compte.model';

@Component({
  selector: 'app-liste.comptes',
  templateUrl: './liste.comptes.component.html',
  styleUrl: './liste.comptes.component.scss'
})
export class ListeComptesComponent implements OnInit {

  comptes!: Observable<ICompte[]>;
  searchCompteFormGroup: FormGroup | undefined;
  errorMsg!: string;

  constructor(
    private compteService: CompteService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.searchCompteFormGroup = this.fb.group({
      searchTerm: this.fb.control("")
    });
    this.loadAll();
  }

  onShowCompteDetails(compte: ICompte) {
    this.router.navigate(["admin","comptes", compte.idCompteBanque, "details"], {state: compte});
  }

  onEditCompte(compte: ICompte) {
    this.router.navigate(["admin", "comptes", compte.idCompteBanque, "modifie"], {state: compte.clientDTO})
  }

  // onConfirmDelete(id: number | undefined): void {
  //   this.delete(id);
  // }

  // delete(id: number | undefined): void {
  //   if (id) {
  //     this.compteService.delete(id).subscribe({
  //       next: (res: any) => {
  //         this.loadAll();
  //       },
  //       error: (e: any) => {
  //         console.log("_________________DELETE_ERROR ", e);
  //       }
  //     })
  //   }
  // }

  searchComptes() {
    let st = this.searchCompteFormGroup?.value.searchTerm;
    this.comptes = this.compteService.search(st).pipe(
      catchError((error) => {
        this.errorMsg = error.message;
        return throwError(() => new Error(error));
      })
    )
  }

  private loadAll() {
    this.comptes = this.compteService.findAll().pipe(
      catchError((error) => {
        this.errorMsg = error.message;
        return throwError(() => new Error(error));
      })
    );
    console.log(this.comptes);
  }

}
