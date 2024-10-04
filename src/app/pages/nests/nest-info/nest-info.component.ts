import {Component, OnInit} from '@angular/core';
import {DecimalPipe, Location, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PlotlySharedModule} from "angular-plotly.js";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NestsRes} from "../../../model/nestsRes";
import {NestsControllerService} from "../../../services/nestsController.service";
import {LocalStorageService} from "../../../local-storage.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EvaluateNestService} from "../../../services/evaluate-nest.service";
import {GraficaComponent} from "../info/grafica/grafica.component";
import {RecordsTableComponent} from "../info/records-table/records-table.component";
import {GeneralComponent} from "../info/general/general.component";
import {FileComponent} from "../info/file/file.component";

@Component({
  selector: 'app-nest-info',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    PlotlySharedModule,
    RouterLink,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    GraficaComponent,
    RecordsTableComponent,
    GeneralComponent,
    FileComponent,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './nest-info.component.html',
  styleUrl: './nest-info.component.scss'
})
export class NestInfoComponent implements OnInit {
  protected currentUser: any;
  protected nest: NestsRes;
  protected id: number;
  recordsId: string = "";
  uploadForm: FormGroup;
  selectedFile: File;
  percentage: number = 0

  constructor(private location: Location,
              private nestService: NestsControllerService,
              private storage: LocalStorageService,
              private router: Router,
              private evaluateService: EvaluateNestService,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.getNestById(this.id);

    });
    this.currentUser = this.storage.currentUser;

  }

  goBack() {
    this.location.back();
  }

  private getNestById(nestID: number) {
    this.nestService.getNestById(nestID).subscribe(data => {
      if (data.id == null) {
        alert("Error obteniendo datos del nido")
        return;
      }
      this.nest = data;
      let sensor = this.nest.sensor;
      let sensorAssignedID = sensor.assignedID;
      let assignedID = this.nest.assignedID;
      this.recordsId = assignedID + "-" + sensorAssignedID;
      this.evaluateService.evaluateNest(assignedID, sensorAssignedID).subscribe(data => {
        if (data.clas == 1) {
          this.nest.nestBehavior = "Normal"
        }else{
          this.nest.nestBehavior = "Anomalia detectada"
        }
        this.percentage = data.result
      })
    });
  }

  onSubmit() {

  }

  onFileSelected($event: Event) {

  }
}
