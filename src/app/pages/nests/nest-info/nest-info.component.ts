import {Component, OnInit} from '@angular/core';
import {Location, NgForOf, NgOptimizedImage} from "@angular/common";
import {PlotlySharedModule} from "angular-plotly.js";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NestsRes} from "../../../model/nestsRes";
import {NestsControllerService} from "../../../services/nestsController.service";
import {LocalStorageService} from "../../../local-storage.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-nest-info',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    PlotlySharedModule,
    RouterLink,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './nest-info.component.html',
  styleUrl: './nest-info.component.scss'
})
export class NestInfoComponent implements OnInit {
  protected currentUser: any;
  protected nest: NestsRes;
  protected id: number

  constructor(private location: Location,
              private nestService: NestsControllerService,
              private storage: LocalStorageService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
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
    });
  }
}
