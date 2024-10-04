import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SensorsRes} from "../../model/sensorsRes";
import {SensorsControllerService} from "../../services/sensorsController.service";
import {LocalStorageService} from "../../local-storage.service";
import {NestsRes} from "../../model/nestsRes";

import * as PlotlyJS from 'plotly.js-dist-min';
import {PlotlyModule} from 'angular-plotly.js';
import {NestsControllerService} from "../../services/nestsController.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

PlotlyModule.plotlyjs = PlotlyJS;


@Component({
  selector: 'app-nests',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    PlotlyModule,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './nests.component.html',
  styleUrl: './nests.component.scss'
})
export class NestsComponent implements OnInit {
  protected currentUser: any;
  protected nestList: NestsRes[];

  constructor(private location: Location,
              private nestService: NestsControllerService,
              private storage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.storage.currentUser;
    this.nestService.getAllNests().subscribe(data => {
      if (data) {
        this.nestList = data
      }
    })
  }

  goBack() {
    this.location.back();
  }

  constructData(nest: NestsRes) {
    return [{
      type: 'scattermap',
      lat: [nest.latitude],
      lon: [nest.longitude],
      mode: 'markers',
      marker: {
        size: 10
      },
      text: ['Montreal']
    }];
  }
}
