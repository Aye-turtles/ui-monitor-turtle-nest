import {Component, Input, OnInit} from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import {PlotlyModule, PlotlySharedModule} from 'angular-plotly.js';
import {FileService} from "../../../../services/file.service";
import * as Papa from 'papaparse';
import {CommonModule} from "@angular/common";


PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [
    CommonModule,
    PlotlySharedModule,
    PlotlyModule
  ],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.scss'
})
export class GraficaComponent implements OnInit {
  @Input()
  fileName: string = ""

  public graphTemperature = {
    data: [] as any,
    layout: {
      title:'Temperatura del nido',
      mode:'markers',
      type:'scatter',

      autosize: true,
    }
  };
  public graphEnergy = {
    data: [] as any,
    layout: {
      title:'Energia del nido'
    }
  };
  public graphPosition = {
    data: [] as any,
    layout: {
      title:'Movimiento del sensor dentro del nido'
    }
  };
  constructor(protected fileService: FileService) {
  }

  ngOnInit() {
    this.fileName = this.fileName + ".csv";
    this.fileService.getFile(this.fileName).subscribe(data => {
      this.parseCsv(data);  // Parsear el CSV
    });
  }

  private createPlot(data: any) {

    this.graphTemperature.data = [
      {
        y: data.map((item: any) => item.Temp),  // Eje X, por ejemplo, timestamp
        x: data.map((item: any) => item.day),  // Eje Y, por ejemplo, valores
        type: 'scatter',
        marker: {color: 'blue'}
      }
    ];
    this.graphEnergy.data = [
      {
        y: data.map((item: any) => Math.sqrt(item.Energy)),  // Eje X, por ejemplo, timestamp
        x: data.map((item: any) => item.day),  // Eje Y, por ejemplo, valores
        type: 'scatter',
        marker: {color: 'blue'}
      }
    ];
    this.graphPosition.data = [
      {
        y: data.map((item: any) => Math.sqrt(item.Y)),  // Eje X, por ejemplo, timestamp
        x: data.map((item: any) => Math.sqrt(item.X)),  // Eje Y, por ejemplo, valores
        z: data.map((item: any) => Math.sqrt(item.Z)),  // Eje Y, por ejemplo, valores
        mode: 'lines',
        type: 'scatter3d',opacity: 1,
        marker: {
          color: '#bcbd22',
          size: 12,
          symbol: 'circle',
          line: {
            color: 'rgb(0,0,0)',
            width: 0
          }},
        line: {
          color: '#bcbd22',
          width: 3
        },
      }
    ];
  }

  parseCsv(csvData: string) {
    Papa.parse(csvData, {
      header: true,  // Parsear usando los encabezados de las columnas como claves
      complete: (result) => {
        const data = result.data;  // Array de objetos
        this.createPlot(data);
      },
      error: () => {
        console.error('Error al parsear el CSV:');
      }
    });
  }
}
