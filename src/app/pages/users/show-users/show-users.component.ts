import {Component, OnInit} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {UserRes} from "../../../model/userRes";
import {UserControllersService} from "../../../services/userControllers.service";
import {LocalStorageService} from "../../../local-storage.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatButton
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss'
})
export class ShowUsersComponent implements OnInit{
  protected currentUser: UserRes;
  protected users: UserRes[];

  isLargeList(): boolean {
    return this.users.length > 10;
  }
  constructor(private location: Location,
              private userService: UserControllersService,
              private storage: LocalStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser
    this.getUserData();
  }

  private getUserData() {
    this.userService.getAllUsers().subscribe(data => {
      if (data) {
        this.users = data
      } else {
        alert("Error al buscar usuarios")
      }
    });
  }

  goBack() {
    this.location.back();
  }

  deleteUser(user: UserRes) {
    const confirmation = window.confirm(`¿Está seguro de que desea eliminar a ${user.name} ${user.lastName}?`);
    if (confirmation) {
      this.userService.deleteUsersByID(user.id).subscribe(data =>{
        alert(`Usuario ${user.name} ${user.lastName} eliminado`);
        this.getUserData();
      })
    } else {
      alert(`Eliminación de ${user.name} cancelada`);
    }
  }
}
