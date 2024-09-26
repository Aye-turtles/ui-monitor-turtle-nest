import {Component} from '@angular/core';
import {OrganizationsRes} from "../../../model/organizationsRes";
import {FormControl, FormGroup, ReactiveFormsModule, Validators, ɵValue} from "@angular/forms";
import {OrganizationsControllerService} from "../../../services/organizationsController.service";
import {LocalStorageService} from "../../../local-storage.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserControllersService} from "../../../services/userControllers.service";
import {OrganizationsReq} from "../../../model/organizationsReq";
import {UserRes} from "../../../model/userRes";
import {UserReq} from "../../../model/userReq";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-create-orgs',
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
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './create-orgs.component.html',
  styleUrl: './create-orgs.component.css'
})
export class CreateOrgsComponent {


  protected  isCreateMode: boolean;
  protected orgReq: OrganizationsReq = {}
  protected orgRes: OrganizationsRes = {}
  protected users: [UserRes]
  protected  currentUser: UserRes;
  protected id: string;

  formGroup = new FormGroup({
    name: new FormControl(this.orgReq.name, [Validators.required]),
    contact: new FormControl(this.orgReq.contact.email, [Validators.required]),
    dateActive: new FormControl(this.orgReq.dateActive),
    dateInactive: new FormControl(this.orgReq.dateInactive),
    isActive: new FormControl(this.orgReq.isActive)
  });

  constructor(
    private orgService: OrganizationsControllerService,
    private storage: LocalStorageService,
    private userService: UserControllersService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isCreateMode = !params.has('id');
    });
    if (!this.isCreateMode) {
      this.orgService.getOrgByID(Number(this.id)).subscribe(data => {
        this.orgRes = data;
        this.orgReq.id = this.orgRes.id;
        this.orgReq.name = this.orgRes.name;
        this.orgReq.contact = this.orgRes.contact;
        this.orgReq.dateActive = this.orgRes.dateActive;
        this.orgReq.dateInactive = this.orgRes.dateInactive;
        this.orgReq.isActive = this.orgRes.isActive;
        this.orgReq.members = this.orgRes.members;
      })
    }
  }

  private getOrganizationById(id: number) {
    this.orgService.getOrgByID(id).subscribe(data => {
      this.orgReq = data
    }, error => {
      alert('Error al cargar la organización: ' + error.message);
    });
  }

  // Metodo para guardar o actualizar la organización
  saveOrg() {
    if (this.formGroup.valid) {
      if (this.isCreateMode) {
        this.orgService.createOrg(this.orgReq).subscribe(data => {
          alert('Organización creada con éxito');
          this.goBack()
        }, error => {
          alert('Error al guardar organización: ' + error.message);
        });
      } else {
        this.orgService.updateOrgByID(this.orgReq, Number(this.id)).subscribe(data => {
          alert('Organización actualizada con éxito');
          this.goBack()
        }, error => {
          alert('Error al actualizar organización: ' + error.message);
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      alert('Por favor, completa los campos requeridos');
    }
  }

  goBack() {
    this.location.back();
  }

  onMemberSelectionChange(id: number) {
    let userRes: UserRes = this.users.find(us => us.id == id);
    this.orgReq.members.push(userRes);
  }
}
