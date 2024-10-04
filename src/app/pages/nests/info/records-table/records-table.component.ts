import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../../../services/file.service";
import * as Papa from 'papaparse';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

export interface TableData {
  recordNumber: string;
  Temp: string;
  Energy: string;
  X: string;
  Y: string;
  Z: string;
}
@Component({
  selector: 'app-records-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginatorModule  // Importar el módulo de paginación

  ],
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss'
})
export class RecordsTableComponent implements OnInit{
  @Input()
  fileName: string = ""
  displayedColumns: string[] = ['recordNumber', 'Temp', 'Energy', 'X', 'Y', 'Z'];  // Columnas de la tabla
  dataSource = new MatTableDataSource<TableData>([]);  // Inicializamos MatTableDataSource
  @ViewChild(MatPaginator) paginator: MatPaginator;  // Referencia al paginador

  constructor(protected fileService: FileService) {}

  ngOnInit() {
    this.fileName = this.fileName + ".csv";
    this.fileService.getFile(this.fileName).subscribe(csvData => {
      this.parseCsv(csvData);  // Parsear el CSV
    });
  }

  // Método para parsear el CSV y llenar la tabla
  parseCsv(csvData: string) {
    Papa.parse(csvData, {
      header: true,  // Parsear usando los encabezados de las columnas como claves
      complete: (result) => {
        this.dataSource.data = result.data as TableData[];  // Asignar los datos parseados a la tabla
        this.dataSource.paginator = this.paginator;  // Conectar la tabla con el paginador
      },
      error: () => {
        console.error('Error al parsear el CSV:');
      }
    });
  }
}
