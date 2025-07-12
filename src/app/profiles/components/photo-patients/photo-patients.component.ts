import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-photo-patients',
  standalone: true,
  templateUrl: './photo-patients.component.html',
  imports: [
    MatGridList,
    MatGridTile
  ],
  styleUrls: ['./photo-patients.component.css']
})
export class PhotoPatientsComponent {
// URL de la imagen predeterminada
  imagenSrc: string = 'https://th.bing.com/th/id/R.8118c65e71a4c667f8de22354f0c0794?rik=kSaBHPfWgjOZPg&pid=ImgRaw&r=0';

  // Función para manejar el evento de selección de archivo
  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Asigna la URL de la imagen seleccionada para mostrar la vista previa
      this.imagenSrc = reader.result as string;
    };

    // Lee el archivo seleccionado como una URL de datos
    reader.readAsDataURL(selectedFile);
  }
}
