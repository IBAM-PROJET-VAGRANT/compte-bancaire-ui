import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errMsg!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("admin", [Validators.required]),
      password: this.fb.control("admin", [Validators.required]),
    })
  }


  onSubmitLoginForm() {
    const login: string = this.loginForm.value.username;
    const pwd: string = this.loginForm.value.password;
    if("admin" === login && "admin" === pwd) {
      this.router.navigate(["admin"]);
    } else {
      this.errMsg = "Identifiants incorrects."
    }
  }

  closeAlert() {
    this.errMsg = "";
  }
}
