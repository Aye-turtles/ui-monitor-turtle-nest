import {Component, Input, input, OnInit} from '@angular/core';
import {NestsRes} from "../../../../model/nestsRes";
import {CommonModule} from "@angular/common";
import * as PlotlyJS from 'plotly.js-dist-min';
import {PlotlyModule} from 'angular-plotly.js';


PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    CommonModule,
    PlotlyModule,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit{
  @Input()
  nest: NestsRes ={} as NestsRes;

  constructor() {

  }
  ngOnInit() {
  }
}
