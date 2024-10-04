import {Component, OnInit} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../../local-storage.service";
import {OrganizationsRes} from "../../../model/organizationsRes";
import {SensorsRes} from "../../../model/sensorsRes";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SensorsControllerService} from "../../../services/sensorsController.service";
import {OrganizationsControllerService} from "../../../services/organizationsController.service";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-sensors',
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
  templateUrl: './create-sensors.component.html',
  styleUrl: './create-sensors.component.scss'
})
export class CreateSensorsComponent implements OnInit {
  protected currentUser: any;
  protected isCreateMode: boolean = true;

  protected sensorReq: SensorsRes = {} as SensorsRes;
  protected organizations: OrganizationsRes[] = [];
  protected id: string;

  formGroup = new FormGroup({
    assignedID: new FormControl('', [Validators.required]),
    softwareVersion: new FormControl(''),
    hardwareVersion: new FormControl(''),
    components: new FormControl(''),
    temperatureError: new FormControl(null),
    moistureMinError: new FormControl(null),
    moistureMaxError: new FormControl(null),
    xerror: new FormControl(null),
    yerror: new FormControl(null),
    zerror: new FormControl(null),
    isInUse: new FormControl(false),
    dateManufactured: new FormControl(''),
    organization: new FormControl(null),
    timing: new FormControl(null),
    nrSumar: new FormControl(null)
  });

  constructor(
    private sensorService: SensorsControllerService,
    private orgService: OrganizationsControllerService,
    private storage: LocalStorageService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isCreateMode = !Boolean(Number(this.id));
      this.orgService.getAllOrganizations().subscribe(data => {
        this.organizations = data;
      });
      if (!this.isCreateMode) {
        this.getSensorById(Number(this.id));
      }
    });
  }

  private getSensorById(id: number) {
    this.sensorService.getSensorByID(id).subscribe(data => {
      this.sensorReq = data;
      this.formGroup.patchValue({
        assignedID: this.sensorReq.assignedID,
        softwareVersion: this.sensorReq.softwareVersion,
        hardwareVersion: this.sensorReq.hardwareVersion,
        components: this.sensorReq.components,
        temperatureError: this.sensorReq.temperatureError,
        moistureMinError: this.sensorReq.moistureMinError,
        moistureMaxError: this.sensorReq.moistureMaxError,
        xerror: this.sensorReq.xerror,
        yerror: this.sensorReq.yerror,
        zerror: this.sensorReq.zerror,
        isInUse: this.sensorReq.isInUse,
        dateManufactured: this.sensorReq.dateManufactured ? String(this.sensorReq.dateManufactured) : '',
        timing: this.sensorReq.timing,
        organization: this.sensorReq.organization?.id
      });

    }, error => {
      alert('Error al cargar el sensor: ' + error.message);
    });
  }


  saveSensor() {
    if (this.formGroup.valid) {
      this.fillSensorReq();
      if (this.isCreateMode) {
        this.sensorService.createSensor(this.sensorReq).subscribe(data => {
          alert('Sensor creado con éxito');
          this.goBack();
        }, error => {
          alert('Error al crear el sensor: ' + error.message);
        });
      } else {
        this.sensorService.updateSensorByID(this.sensorReq, Number(this.id)).subscribe(data => {
          alert('Sensor actualizado con éxito');
          this.goBack();
        }, error => {
          alert('Error al actualizar el sensor: ' + error.message);
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      alert('Por favor, completa los campos requeridos');
    }
  }

  private fillSensorReq() {
    this.sensorReq.assignedID = this.formGroup.get('assignedID').value;
    this.sensorReq.softwareVersion = this.formGroup.get('softwareVersion').value;
    this.sensorReq.hardwareVersion = this.formGroup.get('hardwareVersion').value;
    this.sensorReq.components = this.formGroup.get('components').value;
    this.sensorReq.temperatureError = this.formGroup.get('temperatureError').value;
    this.sensorReq.moistureMinError = this.formGroup.get('moistureMinError').value;
    this.sensorReq.moistureMaxError = this.formGroup.get('moistureMaxError').value;
    this.sensorReq.xerror = this.formGroup.get('xerror').value;
    this.sensorReq.yerror = this.formGroup.get('yerror').value;
    this.sensorReq.zerror = this.formGroup.get('zerror').value;
    this.sensorReq.isInUse = this.formGroup.get('isInUse').value;
    this.sensorReq.dateManufactured = this.formGroup.get('dateManufactured').value ? new Date(this.formGroup.get('dateManufactured').value) : null;
    this.sensorReq.organization = {id: this.formGroup.get('organization').value} as OrganizationsRes;
    this.sensorReq.nrSumar = this.calculateNrSumar();
    this.sensorReq.timing = this.formGroup.get('timing').value;
  }

  goBack() {
    this.location.back();
  }

  private calculateNrSumar() {
    let m = this.sensorReq.timing / 60;
    let crh = m/60;
    let crd = crh/24;
    return crd / 1;
  }
}
