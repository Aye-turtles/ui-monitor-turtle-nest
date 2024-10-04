import {Component, OnInit} from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import {PlotlyModule} from 'angular-plotly.js';


PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.scss'
})
export class GraficaComponent implements OnInit{


  constructor() {
  }

  ngOnInit() {
  }
}
