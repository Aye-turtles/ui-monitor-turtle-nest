import {Component, OnInit} from '@angular/core';
import {OrganizationsRes} from "../../../model/organizationsRes";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrganizationsControllerService} from "../../../services/organizationsController.service";
import {LocalStorageService} from "../../../local-storage.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserControllersService} from "../../../services/userControllers.service";
import {OrganizationsReq} from "../../../model/organizationsReq";
import {UserRes} from "../../../model/userRes";
import {UserReq} from "../../../model/userReq";

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
export class CreateOrgsComponent implements OnInit{
  protected isCreateMode: boolean;
  protected orgReq: OrganizationsRes = {} as OrganizationsRes;
  protected users: UserRes[] = [];
  protected currentUser: UserRes;
  protected id: string;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    dateActive: new FormControl(''),
    dateInactive: new FormControl(''),
    isActive: new FormControl(true),
    members: new FormArray([]) // Agrega un FormArray para manejar los miembros
  });

  constructor(
    private orgService: OrganizationsControllerService,
    private storage: LocalStorageService,
    private userService: UserControllersService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isCreateMode = !Boolean(Number(params.get('id')));
      if (!this.isCreateMode) {
        this.getOrganizationById(Number(this.id));
      }
      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
      });
    });
  }

  private getOrganizationById(id: number) {
    this.orgService.getOrgByID(id).subscribe(data => {
      this.orgReq = data;

      // Agrega los miembros seleccionados al FormArray
      this.orgReq.members.forEach(member => {
        this.members.push(new FormControl(member.id));
      });

      this.formGroup.patchValue({
        name: this.orgReq.name,
        contact: String(this.orgReq.contact?.id),
        dateActive: String(this.orgReq.dateActive),
        dateInactive: String(this.orgReq.dateInactive),
        isActive: this.orgReq.isActive
      });
    }, error => {
      alert('Error al cargar la organización: ' + error.message);
    });
  }

  // Método para manejar la selección de miembros
  onMemberSelectionChange(event: any, userId: number) {
    const members = this.formGroup.get('members') as FormArray;
    if (event.target.checked) {
      members.push(new FormControl(userId));
    } else {
      const index = members.controls.findIndex(control => control.value === userId);
      if (index !== -1) {
        members.removeAt(index);
      }
    }
  }

  saveOrg() {
    if (this.formGroup.valid) {
      this.fillOrgReq();
      if (this.isCreateMode) {
        this.createOrg();
      } else {
        this.orgService.updateOrgByID(this.orgReq, Number(this.id)).subscribe(data => {
          alert('Organización actualizada con éxito');
          this.goBack();
        }, error => {
          alert('Error al actualizar organización: ' + error.message);
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      alert('Por favor, completa los campos requeridos');
    }
  }

  private fillOrgReq() {
    this.orgReq.name = this.formGroup.get("name").value;
    this.orgReq.dateActive = this.convertToDate(this.formGroup.get("dateActive").value);
    this.orgReq.dateInactive = this.convertToDate(this.formGroup.get("dateInactive").value);
    this.orgReq.isActive = this.formGroup.get("isActive").value;
    this.orgReq.contact = { id: Number(this.formGroup.get("contact").value) } as UserRes;
    this.orgReq.members = this.formGroup.get('members').value.map(id => ({ id } as UserRes));
  }

  private convertToDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }
  private createOrg() {
    this.orgService.createOrg(this.orgReq).subscribe(data => {
      alert('Organización creada con éxito');
      this.goBack();
    }, error => {
      alert('Error al guardar organización: ' + error.message);
    });
  }

  goBack() {
    this.location.back();
  }

  get members(): FormArray {
    return this.formGroup.get('members') as FormArray;
  }

  isUserSelected(userId: number): boolean {
    return this.orgReq.members ? this.orgReq.members.some(member => member.id === userId) : false;
  }
}
