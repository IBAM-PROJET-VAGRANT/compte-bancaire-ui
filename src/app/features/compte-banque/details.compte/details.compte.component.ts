import {Component, OnInit} from '@angular/core';
import {CompteService} from "../../../services/compte.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IVirement, Virement} from "../../../models/virement.model";
import {Depot, IDepot} from "../../../models/depot.model";
import {IRetrait, Retrait} from "../../../models/retrait.model";
import {catchError, Observable, throwError} from "rxjs";
import {IHistorique} from "../../../models/historique-compte.model";
import {OperationService} from "../../../services/operation.service";
import {ICompte} from "../../../models/compte.model";

@Component({
  selector: 'app-details.compte',
  templateUrl: './details.compte.component.html',
  styleUrl: './details.compte.component.scss'
})
export class DetailsCompteComponent implements OnInit {

  compteForm!: FormGroup;
  operationForm!: FormGroup;
  virement: IVirement = new Virement("", "", 0, "");
  depot: IDepot = new Depot("", 0,"");
  retrait: IRetrait = new Retrait("", 0,"");
  currentPage : number =0;
  pageSize : number =5;
  historique!: Observable<IHistorique>;
  errorMsg! :string ;
  constructor(
    private compteService: CompteService,
    private operationService: OperationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    const compte: ICompte = this.route.snapshot.data['compte'];
    this.compteForm = this.fb.group({
      numero: this.fb.control(compte.numero)
    });
    this.handleSearchCompte();
    this.createOperationForm();
  }

  handleSearchCompte() {
    let numCompte : string =this.compteForm.value.numero;
    this.historique=this.operationService.search(numCompte,this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMsg=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchCompte();
  }

  private createOperationForm(): void {
    this.operationForm = this.fb.group({
      type : this.fb.control(null, [Validators.required]),
      montant : this.fb.control(null, [Validators.required]),
      description : this.fb.control(null),
      compteDestination : this.fb.control(null)
    })
  }

  handleOperationSubmit() {
    const numeroCompte: string = this.compteForm.value.numero;
    const typeOperation: string = this.operationForm.value.type;
    const montant: number = this.operationForm.value.montant as number;
    const description: string = this.operationForm.value.description;
    if ("CREDIT" === typeOperation) {
      this.depot.numeroCompte = numeroCompte;
      this.depot.montant = montant;
      this.depot.description = description;
      this.operationService.depot(this.depot).subscribe({
        next: () => {
          this.handleSearchCompte();
          this.resetForm();
        },
        error: (err) => {
          console.log((err));
        }
      });
    } else if ("DEBIT" === typeOperation) {
      this.retrait.numeroCompte = numeroCompte;
      this.retrait.montant = montant;
      this.retrait.description = description;
      this.operationService.retrait(this.retrait).subscribe({
        next: () => {
          this.handleSearchCompte();
          this.resetForm();
        },
        error: (err) => {
          console.log((err));
        }
      });
    } else if ("TRANSFER" === typeOperation) {
      this.virement.numeroCompteSource = numeroCompte;
      this.virement.montant = montant;
      this.virement.numeroCompteDestination = this.operationForm.value.compteDestination;
      this.virement.description = description;
      this.operationService.virement(this.virement).subscribe({
        next: () => {
          this.handleSearchCompte();
          this.resetForm();
        },
        error: (err) => {
          console.log((err));
        }
      });
    }
  }

  checkType() {
    console.log("TRANSFER")
    const ctrlType = this.operationForm.get("type");
    const ctrlDestination = this.operationForm.get("compteDestination");
    if(ctrlType?.value == "TRANSFER") {
      ctrlDestination?.setValidators(Validators.required);
    } else {
      ctrlDestination?.setValidators(null);
    }
  }

  resetForm() {
    this.createOperationForm();
  }
}
