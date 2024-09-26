import {Component, OnInit} from '@angular/core';
import {UserRes} from "../../../model/userRes";
import {LocalStorageService} from "../../../local-storage.service";
import {UserControllersService} from "../../../services/userControllers.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserReq} from "../../../model/userReq";
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-users',
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
    MatButton,
    RouterLink
  ],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.css'
})
export class CreateUsersComponent implements OnInit {

  protected currentUser: UserRes;
  protected userRes: UserRes;
  protected userReq: UserReq = {};
  protected id: string;
  protected isCreateUser: boolean;


  formGroup = new FormGroup({
    name: new FormControl(this.userReq.name, [
      Validators.required
    ]),
    lastName:  new FormControl(this.userReq.lastName, [
      Validators.required
    ]),
    isActive:  new FormControl(this.userReq.isActive, [
      Validators.required
    ]),
    title:  new FormControl(this.userReq.title),
    phone:  new FormControl(this.userReq.phone),
    email:  new FormControl(this.userReq.email, [
      Validators.required,
      Validators.email
    ]),
    password:  new FormControl(this.userReq.password),
    tempPassword:  new FormControl(this.userReq.tempPassword),
    isAdministrator:  new FormControl(this.userReq.isAdministrator)

  });

  constructor(private lstorage: LocalStorageService,
              private userService: UserControllersService,
              private router: Router,
              private location: Location,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = this.lstorage.currentUser
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.isCreateUser = !params.has('id');
    })
    if (this.id != null) {
      this.userService.getUserByID(Number(this.id)).subscribe(data => {
        this.userRes = data;

        this.userReq.id = this.userRes.id
        this.userReq.name = this.userRes.name
        this.userReq.lastName = this.userRes.lastName
        this.userReq.isActive = this.userRes.isActive
        this.userReq.title = this.userRes.title
        this.userReq.phone = this.userRes.phone
        this.userReq.email = this.userRes.email
        this.userReq.isAdministrator = this.userRes.isAdministrator

        this.formGroup.patchValue({
          name: this.userRes.name,
          lastName: this.userRes.lastName,
          isActive: this.userRes.isActive,
          title: this.userRes.title,
          phone: this.userRes.phone,
          email: this.userRes.email,
          isAdministrator: this.userRes.isAdministrator
        });
      })
    }
  }
  goBack() {
    this.location.back();
  }
  saveUser() {
    if (this.formGroup.valid) {

      if (this.isCreateUser) {
        this.userService.createUsers(this.formGroup.value).subscribe(response => {
          alert('Usuario guardado con éxito');
          this.goBack();
          }, error => {
          alert('Error al guardar el usuario: '+ error.message);
        });
      } else {
        this.userService.updateUsersByID(this.formGroup.value, Number(this.id)).subscribe(response => {
          alert('Usuario actualizado con éxito');
          this.goBack();
        }, error => {
          alert('Error al actualizado el usuario:'+ error.message);
        });
      }


    } else {
      console.error('Formulario no válido');
      this.formGroup.markAllAsTouched();
    }
  }

  protected readonly Number = Number;
}
