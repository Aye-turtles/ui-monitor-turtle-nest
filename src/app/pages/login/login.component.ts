import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../local-storage.service";
import {AuthControllerService} from "../../services/authController.service";
import {LoginReq} from "../../model/loginReq";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  protected correctCredentials = true;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });


  constructor(private formBuilder: FormBuilder,
              private authService: AuthControllerService,
              private router: Router,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login({ "email": email, "password": password}).subscribe(data =>{
        if (data){
          this.localStorage.email = email;
          this.localStorage.isUserLogin = true;
          this.router.navigate(['/homepage'])
        }else{
          this.correctCredentials = !this.correctCredentials;
        }
      })
    }
  }
}
