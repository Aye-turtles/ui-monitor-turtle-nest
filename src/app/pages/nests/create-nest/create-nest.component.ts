import {Component, OnInit} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {UserReq} from "../../../model/userReq";
import {SensorsReq} from "../../../model/sensorsReq";
import {OrganizationsReq} from "../../../model/organizationsReq";
import {NestsReq} from "../../../model/nestsReq";
import {UserControllersService} from "../../../services/userControllers.service";
import {SensorsControllerService} from "../../../services/sensorsController.service";
import {OrganizationsControllerService} from "../../../services/organizationsController.service";
import {NestsControllerService} from "../../../services/nestsController.service";
import {LocalStorageService} from "../../../local-storage.service";
import {FileComponent} from "../info/file/file.component";

@Component({
  selector: 'app-create-nest',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatButton,
    ReactiveFormsModule,
    FileComponent,
    NgOptimizedImage
  ],
  templateUrl: './create-nest.component.html',
  styleUrl: './create-nest.component.scss'
})
export class CreateNestComponent implements OnInit {
  protected currentUser: any;
  protected isCreateMode: boolean;
  protected nestReq: NestsReq = {} as NestsReq;
  protected organizations: OrganizationsReq[] = [];
  protected sensors: SensorsReq[] = [];
  protected users: UserReq[] = [];
  protected id: string;

  formGroup = new FormGroup({
    assignedID: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    sensor: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    responsible: new FormControl('', [Validators.required]),
    isActive: new FormControl(true),
    eggsQuantity: new FormControl(''),
    hatchlingsQuantity: new FormControl(''),
    depredatedEggsQuantity: new FormControl(''),
    infertileEggs: new FormControl(''),
    zone: new FormControl(''),
    layingDate: new FormControl(''),
    collectionDate: new FormControl(''),
    monitoringStartDate: new FormControl(''),
    monitoringEndDate: new FormControl(''),
    firstHatchingRecordedDate: new FormControl(''),
    lastHatchingRecordedDate: new FormControl(''),
    nestCleaningDate: new FormControl(''),
    nestBehavior: new FormControl('')
  });

  constructor(
    private nestsService: NestsControllerService,
    private orgService: OrganizationsControllerService,
    private sensorService: SensorsControllerService,
    private userService: UserControllersService,
    private storage: LocalStorageService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {}


  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isCreateMode = !Boolean(Number(this.id));
      if (!this.isCreateMode) {
        this.getNestById(Number(this.id));
      }

      this.orgService.getAllOrganizations().subscribe(data => {
        this.organizations = data;
      });
      this.sensorService.getAllSensors().subscribe(data => {
        this.sensors = data;
      });
      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
      });
    });
  }

  private getNestById(id: number) {
    this.nestsService.getNestById(id).subscribe(data => {
      this.nestReq = data;
      this.formGroup.patchValue({
        assignedID: this.nestReq.assignedID,
        latitude: this.nestReq.latitude,
        longitude: this.nestReq.longitude,
        sensor: String(this.nestReq.sensor?.id),
        organization: String(this.nestReq.organization?.id),
        responsible: String(this.nestReq.responsible?.id),
        isActive: this.nestReq.isActive,
        eggsQuantity: this.nestReq.eggsQuantity?.toString(),
        hatchlingsQuantity: this.nestReq.hatchlingsQuantity?.toString(),
        depredatedEggsQuantity: this.nestReq.depredatedEggsQuantity?.toString(),
        infertileEggs: this.nestReq.infertileEggs?.toString(),
        zone: this.nestReq.zone,
        layingDate: this.nestReq.layingDate?.toString(),
        collectionDate: this.nestReq.collectionDate?.toString(),
        monitoringStartDate: this.nestReq.monitoringStartDate?.toString(),
        monitoringEndDate: this.nestReq.monitoringEndDate?.toString(),
        firstHatchingRecordedDate: this.nestReq.firstHatchingRecordedDate?.toString(),
        lastHatchingRecordedDate: this.nestReq.lastHatchingRecordedDate?.toString(),
        nestCleaningDate: this.nestReq.nestCleaningDate?.toString(),
        nestBehavior: this.nestReq.nestBehavior
      });
    }, error => {
      alert('Error al cargar el nido: ' + error.message);
    });
  }

  private convertToDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }


  public saveNest() {
    if (this.formGroup.valid) {
      this.fillNestReq()
      if (this.isCreateMode) {
        this.createNest();
      } else {
        this.nestsService.updateNestByID(this.nestReq, Number(this.id)).subscribe(data => {
          alert('Nido actualizado con éxito');
          this.goBack();
        }, error => {
          alert('Error al actualizar nido: ' + error.message);
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      alert('Por favor, completa los campos requeridos');
    }
  }

  private createNest() {
    this.nestsService.createNest(this.nestReq).subscribe(data => {
      alert('Nido creado con éxito');
      this.goBack();
    }, error => {
      alert('Error al guardar el nido: ' + error.message);
    });
  }

  private fillNestReq() {
    this.nestReq.assignedID = this.formGroup.get('assignedID').value;
    this.nestReq.latitude = this.formGroup.get('latitude').value;
    this.nestReq.longitude = this.formGroup.get('longitude').value;
    this.nestReq.sensor = { id: Number(this.formGroup.get('sensor').value) } as SensorsReq;
    this.nestReq.organization = { id: Number(this.formGroup.get('organization').value) } as OrganizationsReq;
    this.nestReq.responsible = { id: Number(this.formGroup.get('responsible').value) } as UserReq;
    this.nestReq.isActive = this.formGroup.get('isActive').value;
    this.nestReq.eggsQuantity = Number(this.formGroup.get('eggsQuantity').value);
    this.nestReq.hatchlingsQuantity = Number(this.formGroup.get('hatchlingsQuantity').value);
    this.nestReq.depredatedEggsQuantity = Number(this.formGroup.get('depredatedEggsQuantity').value);
    this.nestReq.infertileEggs = Number(this.formGroup.get('infertileEggs').value);
    this.nestReq.zone = this.formGroup.get('zone').value;
    this.nestReq.layingDate = this.formGroup.get('layingDate').value ? new Date(this.formGroup.get('layingDate').value) : null;
    this.nestReq.collectionDate = this.formGroup.get('collectionDate').value ? new Date(this.formGroup.get('collectionDate').value) : null;
    this.nestReq.monitoringStartDate = this.formGroup.get('monitoringStartDate').value ? new Date(this.formGroup.get('monitoringStartDate').value) : null;
    this.nestReq.monitoringEndDate = this.formGroup.get('monitoringEndDate').value ? new Date(this.formGroup.get('monitoringEndDate').value) : null;
    this.nestReq.firstHatchingRecordedDate = this.formGroup.get('firstHatchingRecordedDate').value ? new Date(this.formGroup.get('firstHatchingRecordedDate').value) : null;
    this.nestReq.lastHatchingRecordedDate = this.formGroup.get('lastHatchingRecordedDate').value ? new Date(this.formGroup.get('lastHatchingRecordedDate').value) : null;
    this.nestReq.nestCleaningDate = this.formGroup.get('nestCleaningDate').value ? new Date(this.formGroup.get('nestCleaningDate').value) : null;
    this.nestReq.nestBehavior = this.formGroup.get('nestBehavior').value;
  }


  goBack() {
    this.location.back();
  }
}
