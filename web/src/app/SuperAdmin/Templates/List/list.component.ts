import { Component } from '@angular/core';
import { APIService } from 'src/app/api.service';

const metadata = [{
    columnName: 'name',
    dataType: 'string'
}, {
    columnName: 'recievedOn',
    dataType: 'date'
}, {
    columnName: 'processOn',
    dataType: 'date'
}, {
    columnName: 'timeElapsedForProcessing',
    dataType: 'object'
}
];

// const normalizedJSON = {
//     fileDetails: {
//         metadata: [
//             {
//                 columnName: 'name',
//                 dataType: 'string'
//             }, {
//                 columnName: 'recievedOn',
//                 dataType: 'date'
//             }, {
//                 columnName: 'processOn',
//                 dataType: 'date'
//             }, {
//                 columnName: 'timeElapsedForProcessing',
//                 dataType: 'object'
//             }
//         ],
//         data: [
//             {
//                 columnName: 'column1',
//                 dataType: 'string'
//             },
//             {
//                 columnName: 'column2',
//                 dataType: 'string'
//             }, {
//                 columnName: 'column3',
//                 dataType: 'string'
//             }, {
//                 columnName: 'column4',
//                 dataType: 'string'
//             }, {
//                 columnName: 'column5',
//                 dataType: 'string'
//             },
//         ]
//     }
// }

@Component({
    selector: 'normalized-templates-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class SuperAdminNormalizedTemplatesListComponent {
    response = {}
    normalizedJSON = {}
    metaData = []
    columns = []
    updatedColumns = []
    id = ''
    message = '';

    constructor(private service: APIService) {
        console.log(this.columns)
        this.getTemplate();
    }

    getTemplate() {
        this.service.findTemplate().subscribe(data => {
            if (data && data.response_code === 0) {
                this.response = data.response;
                this.normalizedJSON = data.response && data.response.normalizedJson;
                this.id = data.response._id || ''
                let fileDetails = this.normalizedJSON['fileDetails'];
                if (fileDetails) {
                    this.metaData = fileDetails['metaData'] || metadata;
                    this.columns = [...fileDetails.data] || [];
                    this.updatedColumns = [...fileDetails.data] || [];
                } else {
                    this.metaData = metadata;
                    this.columns = [];
                }

            }
        }, error => {
            console.log(error)
        })
    }

    addNewColumn() {
        let data = {
            columnName: '',
            dataType: ''
        }

        this.updatedColumns.push(data);
        // this.columns.push(data);
    }

    updateFieldEmitter(data) {
        let dataIndex = data.index;
        delete data.index;
        this.updatedColumns[dataIndex] = data;
    }

    deleteRecordEmitter(index) {
        console.log(index);
        this.updatedColumns.splice(index, 1);
        this.columns.splice(index, 1);
    }

    updateAll() {
        let data = {
            id: this.id,
            normalizedJson: {
                fileDetails: {
                    metaData: this.metaData,
                    data: this.updatedColumns
                }
            }
        }
        this.service.updateTemplate(data).subscribe(data => {
            this.message = 'successfully updated';
        }, error => {
            this.message = 'Sorry something went wrong';
        })
    }

    downloadNormalizedJSON() {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ normalizedJson: this.normalizedJSON }));
        let link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", "normalizedJSON.json");
        document.body.appendChild(link); // Required for FF
        link.click();
    }
}