import {Component, OnInit} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SensorsRes} from "../../model/sensorsRes";
import {SensorsControllerService} from "../../services/sensorsController.service";
import {LocalStorageService} from "../../local-storage.service";

@Component({
  selector: 'app-nests',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink

  ],
  templateUrl: './nests.component.html',
  styleUrl: './nests.component.css'
})
export class NestsComponent implements OnInit {
  protected currentUser: any;
  protected sensors: SensorsRes[] = [];


  constructor(private location: Location,
              private sensorService: SensorsControllerService,
              private storage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
  }

  goBack() {
    this.location.back();
  }
}
