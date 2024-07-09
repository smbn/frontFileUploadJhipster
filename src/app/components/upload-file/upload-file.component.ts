import { Component } from '@angular/core';
import { UploadFileService } from '../../shared/services/upload-file.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  codeEtu!: string;
  file!: File ;
  message!: any;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
      formData.append('file', this.file);
      formData.append('codeEtu', this.codeEtu);

      this.http.post('http://localhost:8081/services/microservicegir/api/information-personnelles/upload', formData, { responseType: 'text' }).subscribe(
        response => {
          console.log('Photo uploaded successfully:', response);
          this.message = response;
        },
        error => {
          console.error('Error uploading photo:', error.error);
          this.message = error.error;
        }
      );
  }
}
