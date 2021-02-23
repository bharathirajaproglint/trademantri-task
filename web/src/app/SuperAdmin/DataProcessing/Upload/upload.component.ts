import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/api.service';

@Component({
    selector: 'normalized-templates-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class SuperAdminDataProcessingUploadComponent {
    @ViewChild('fileInput')
    fileInputVariable: ElementRef;

    fileBstr = '';
    fileName = '';

    companyList = [];
    dataList = [];
    company = '';

    progressing = false;
    processingAction = ''
    processingPercentage = 0;
    constructor(private service: APIService) {
        this.getCompany();
    }

    getCompany() {
        this.service.findCompany().subscribe(data => {
            if (data.response_code === 0) {
                this.companyList = data.response;
                if (this.companyList && this.companyList.length) {
                    this.company = this.companyList[0]._id;
                }
                if(this.company) {
                    this.getDataList()
                }
            }
        }, error => {
            console.log(error)
        })
    }

    getDataList() {
        this.service.findDataList(this.company).subscribe(data => {
            if (data.response_code === 0) {
                this.dataList = data.response;
                console.log(data)
            }
        }, error => {
            console.log(error)
        })
    }

    changeCompany(event) {
        this.company = event.target.value;
        this.getDataList()
    }

    fileUpload(event) {
        let file = event.files[0];
        this.fileName = file.name
        let reader = new FileReader();
        reader.onload = () => {
            this.fileBstr = reader.result.toString().split('base64,')[1];
        }
        reader.readAsDataURL(file);
    }

    submit() {
        let data = {
            companyId: this.company,
            bstr: this.fileBstr,
            fileName: this.fileName
        }
        this.service.uploadFile(data).subscribe(data => {
            if (data.type === HttpEventType.Sent) {
                this.progressing = true;
                this.processingAction = 'Initiating';
                this.processingPercentage = 100;
            }

            if (data.type === HttpEventType.UploadProgress) {
                this.progressing = true;
                this.processingAction = 'Uploading';
                let percentage = Math.round((data.loaded / data.total) * 100);
                this.processingPercentage = percentage;
            }

            if (data.type === HttpEventType.ResponseHeader) {
                this.progressing = true;
                this.processingAction = 'Download Initiated';
                this.processingPercentage = 100;
            }

            if (data.type === HttpEventType.DownloadProgress) {
                this.progressing = true;
                this.processingAction = 'Downloading';
                let percentage = Math.round((data.loaded / data.total) * 100);
                this.processingPercentage = percentage;
            }

            if (data.type === HttpEventType.Response) {
                this.progressing = false;
                this.processingAction = '';
                this.processingPercentage = 0;
                this.fileBstr = '';
                this.fileName = '';
                this.fileInputVariable.nativeElement.value = '';
                console.log(data)
                if (data && data.body && data.body.response && data.body.response.fileDetails) {
                    this.downloadJSON(data.body.response.fileDetails)
                    this.getDataList()
                }
            }
        }, error => {
            this.progressing = false;
            this.processingAction = '';
            this.processingPercentage = 0;
            this.fileBstr = '';
            this.fileName = '';
            this.fileInputVariable.nativeElement.value = '';
        });
    }

    downloadJSON(data) {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        let link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", "data.json");
        document.body.appendChild(link); // Required for FF
        link.click();
    }
}