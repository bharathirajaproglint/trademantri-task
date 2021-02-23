import { Component } from '@angular/core';
import { APIService } from 'src/app/api.service';

@Component({
    selector: 'company-templates-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class SuperAdminCompanyTemplatesUploadComponent {
    fileBstr = '';
    fileName = ''
    constructor(private service: APIService) {

    }

    fileUpload(fileInput) {
        let file = fileInput.files[0];
        this.fileName = file.name
        let reader = new FileReader();
        reader.onload = () => {
            this.fileBstr = reader.result.toString().split('base64,')[1];
        }
        reader.readAsDataURL(file);
    }

    submit() {
        let data = {
            bstr: this.fileBstr,
            fileName: this.fileName
        }
        this.service.uploadFile(data).subscribe(data => {
            console.log(data)
        }, error => {
            console.error(error);
        });
    }
}