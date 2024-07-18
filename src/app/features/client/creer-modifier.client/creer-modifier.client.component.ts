import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IClient} from "../../../models/client.model";

@Component({
  selector: 'app-creer-modifier.client',
  templateUrl: './creer-modifier.client.component.html',
  styleUrl: './creer-modifier.client.component.scss'
})
export class CreerModifierClientComponent implements OnInit {

  clientForm!: FormGroup;
  client!: IClient;
  clientId!: number;
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.client = this.router.getCurrentNavigation()?.extras.state as IClient;
  }
  ngOnInit(): void {
    this.createForm();
    this.clientId = this.route.snapshot.params['id'];
  }

  handleClientFormSubmit() {
    this.client = this.clientForm.value;
    let calledMethode = this.clientService.create(this.client)
    if(this.clientId) {
      this.client.idClient = this.clientId;
      this.clientService.update(this.client)
    }
    calledMethode.subscribe({
      next: (res: IClient) => {
        console.log(res);
        this.router.navigate(["admin", "clients"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  resetForm() {
    this.createForm();
  }

  private createForm() {
    this.clientForm = this.fb.group({
      email: this.fb.control( this.client?.email, [Validators.email]),
      nom: this.fb.control(this.client?.nom, [Validators.required, Validators.maxLength(100)]),
      prenom: this.fb.control(this.client?.prenom, [Validators.required, Validators.maxLength(100)]),
      telephone: this.fb.control(this.client?.telephone, [Validators.required, Validators.maxLength(20)]),
    })
  }
}
