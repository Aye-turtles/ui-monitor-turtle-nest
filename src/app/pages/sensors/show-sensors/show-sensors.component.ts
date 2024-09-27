import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, Location, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../../local-storage.service";
import {SensorsRes} from "../../../model/sensorsRes";
import {SensorsControllerService} from "../../../services/sensorsController.service";
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
  selector: 'app-show-sensors',
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
  templateUrl: './show-sensors.component.html',
  styleUrl: './show-sensors.component.css'
})
export class ShowSensorsComponent implements OnInit {
  protected currentUser: any;
  protected sensors: SensorsRes[] = [];


  constructor(private location: Location,
              private sensorService: SensorsControllerService,
              private storage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.getSensors()
  }

  private getSensors() {
    this.sensorService.getAllSensors().subscribe(data => {
      this.sensors = data;
    }, error => {
      alert('Error al buscar sensores: ' + error.message);
    });
  }

  deleteSensor(sensor: SensorsRes) {
    const confirmation = window.confirm(`¿Está seguro de que desea eliminar el sensor con ID ${sensor.assignedID}?`);
    if (confirmation) {
      this.sensorService.deleteSensorByID(sensor.id).subscribe(() => {
        alert(`Sensor con ID ${sensor.assignedID} eliminado.`);
        this.getSensors();
      }, error => {
        alert('Error al eliminar el sensor: ' + error.message);
      });
    } else {
      alert('Eliminación cancelada.');
    }
  }

  goBack() {
    this.location.back();
  }
}
