import {Component, OnInit} from '@angular/core';
import {CompteService} from "../../../services/compte.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IClient} from "../../../models/client.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICompte} from "../../../models/compte.model";

@Component({
  selector: 'app-creer-modifier.compte',
  templateUrl: './creer-modifier.compte.component.html',
  styleUrl: './creer-modifier.compte.component.scss'
})
export class CreerModifierCompteComponent implements OnInit{

  clientId!: number;
  client!: IClient;
  compteForm!: FormGroup;
  compte!: ICompte;
  compteId!: number;
  dateCreation!: Date;
  statut!: string;
  constructor(
    private compteService: CompteService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.client = this.router.getCurrentNavigation()?.extras.state as IClient;
  }
  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['client-id'];
    this.compteId = this.route.snapshot.params['id'];
    if(this.compteId) {
      this.compte = this.route.snapshot.data['compte'];
      this.client = this.compte.clientDTO;
      this.dateCreation = this.compte.dateCreation;
      this.statut = this.compte.statut;
    }
    this.createForm();
  }

  handleCompteFormSubmit() {
    this.compte = this.compteForm.value;
    if(this.client) {
      if(this.compteId) {
        this.compte.idCompteBanque = this.compteId;
        this.compte.dateCreation = this.dateCreation;
        this.compte.statut = this.statut;
      }
      this.compte.clientDTO = this.client;
      const calledMethode = this.compte?.idCompteBanque ? this.compteService.update(this.compte) : this.compteService.create(this.compte);
      calledMethode.subscribe({
        next: (res: ICompte) => {
          console.log(res);
          this.router.navigate(["admin", "comptes"]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  resetForm() {
    this.createForm();
  }

  getFullName(): string {
    if(this.client) {
      return this.client.nom + " " + this.client?.prenom + " - " + this.client?.telephone;
    }
    return "";
  }

  checkType() {
    const ctrlType = this.compteForm.get("type");
    const ctrlDecouvert = this.compteForm.get("decouvert");
    const ctrlTx = this.compteForm.get("tauxInteret");
    if(ctrlType?.value == "CC") {
      ctrlDecouvert?.setValidators(Validators.required);
      ctrlTx?.setValidators(null);
    } else if(ctrlType?.value == "CE") {
      ctrlDecouvert?.setValidators(null);
      ctrlTx?.setValidators(Validators.required);
    } else {
      ctrlDecouvert?.setValidators(null);
      ctrlTx?.setValidators(null);
    }
  }
  private createForm() {
    this.compteForm = this.fb.group({
      decouvert: this.fb.control(this.compte?.decouvert, [Validators.nullValidator]),
      numero: this.fb.control(this.compte?.numero, [Validators.required, Validators.maxLength(20)]),
      solde: this.fb.control(this.compte?.solde, [Validators.required]),
      tauxInteret: this.fb.control(this.compte?.tauxInteret, [Validators.nullValidator]),
      type: this.fb.control(this.compte?.type, [Validators.required]),
    })
  }
}
