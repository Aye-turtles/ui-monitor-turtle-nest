import { Component } from '@angular/core';
import {FileService} from "../../../../services/file.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [
    CommonModule

  ],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent {
  constructor(private fileService: FileService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Subir el archivo al servidor y a GitHub
    this.fileService.uploadFile(file).subscribe(
      response => {
        console.log('Archivo subido:', response);
      },
      error => {
        console.error('Error al subir el archivo:', error);
      }
    );
  }
}
