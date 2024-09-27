import { Component, OnInit } from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from '@angular/common';
import { OrganizationsRes } from '../../../model/organizationsRes';
import { LocalStorageService } from '../../../local-storage.service';
import {OrganizationsControllerService} from "../../../services/organizationsController.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-show-orgs',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './show-orgs.component.html',
  styleUrls: ['./show-orgs.component.css']
})
export class ShowOrgsComponent implements OnInit {
  protected currentUser: any;
  protected organizations: OrganizationsRes[] = [];

  constructor(private location: Location,
              private orgService: OrganizationsControllerService,
              private storage: LocalStorageService) { }

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.getOrganizations();
  }

  // Método para obtener todas las organizaciones
  private getOrganizations() {
    this.orgService.getAllOrganizations().subscribe(data => {
      if (data) {
        this.organizations = data;
      } else {
        alert('Error al buscar organizaciones');
      }
    });
  }

  // Método para regresar a la página anterior
  goBack() {
    this.location.back();
  }

  // Método para eliminar una organización
  deleteOrg(org: OrganizationsRes) {
    const confirmation = window.confirm(`¿Está seguro de que desea eliminar la organización ${org.name}?`);
    if (confirmation) {
      this.orgService.deleteOrgByID(org.id).subscribe(data => {
        alert(`Organización ${org.name} eliminada`);
        this.getOrganizations(); // Actualizar la lista después de eliminar
      }, error => {
        alert(`Error al eliminar la organización ${org.name}`);
      });
    } else {
      alert(`Eliminación de la organización ${org.name} cancelada`);
    }
  }
}
