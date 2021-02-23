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

@Component({
    selector: 'company-templates-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class SuperAdminCompanyTemplatesListComponent {
    company = '';
    companyList = [];
    templateResponse = {}
    normalizedJSON = {}
    metaData = []
    columns = []
    updatedColumns = []
    id = ''

    constructor(private service: APIService) {
        this.getCompany();
        this.getTemplate();
    }

    getTemplate() {
        this.service.findTemplate().subscribe(data => {
            if (data && data.response_code === 0) {
                this.templateResponse = data.response;
            } else {
                alert('Sorry something went wrong, please try again')
            }
        }, error => {
            alert(error)
        })
    }

    getCompany() {
        this.service.findCompany().subscribe(data => {
            if (data.response_code === 0) {
                this.companyList = data.response;
                if (this.companyList && this.companyList.length) {
                    this.company = this.companyList[0]._id;
                    this.findCompanySourceConfig();
                }
            } else {
                alert('Sorry something went wrong, please try again')
            }
        }, error => {
            alert(error)
        })
    }

    changeCompany(event) {
        this.company = event.target.value;
        this.findCompanySourceConfig();
    }

    findCompanySourceConfig() {
        this.service.findCompanySourceConfig(this.company).subscribe(data => {
            this.allocateData(data)
        }, error => {
            console.error(error)
        })
    }

    allocateData(data) {
        if (data && data.response_code === 0) {
            this.normalizedJSON = this.templateResponse['normalizedJson'];
            if (data.response && data.response.length) {
                let normalizedJSON = data.response && data.response[0].normalizedJson;
                this.id = data.response.companyId || ''
                let fileDetails = normalizedJSON['fileDetails'];
                if (fileDetails) {
                    this.metaData = fileDetails['metaData'] || metadata;

                    let normalizedfileDetails = this.normalizedJSON['fileDetails'];
                    let normalizedJSONColumns = normalizedfileDetails.data || [];
                    normalizedJSONColumns = normalizedJSONColumns.map(column => {
                        let columns = fileDetails.data;
                        let dataColumn = columns.find(c => c.columnName === column.columnName)
                        if (dataColumn) {
                            return dataColumn;
                        } else {
                            return column;
                        }
                    })

                    this.columns = normalizedJSONColumns;
                    this.updatedColumns = [...this.columns];

                } else {
                    let fileDetails = this.normalizedJSON['fileDetails'];
                    if (fileDetails) {
                        this.metaData = fileDetails['metaData'] || metadata;
                        this.columns = fileDetails.data || [];
                        this.updatedColumns = [...this.columns];
                    } else {
                        this.metaData = metadata;
                        this.columns = [];
                        this.updatedColumns = [];
                    }
                }
            } else {
                let fileDetails = this.normalizedJSON['fileDetails'];
                if (fileDetails) {
                    this.metaData = fileDetails['metaData'] || metadata;
                    this.columns = fileDetails.data || [];
                    this.updatedColumns = [...this.columns];
                } else {
                    this.metaData = metadata;
                    this.columns = [];
                    this.updatedColumns = [];
                }
            }
        }
    }

    updateFieldEmitter(data) {
        let dataIndex = data.index;
        delete data.index;
        this.updatedColumns[dataIndex] = data;
    }

    updateAll() {
        let data = {
            companyId: this.company,
            normalizedJson: {
                fileDetails: {
                    metaData: this.metaData,
                    data: this.updatedColumns
                }
            }
        }

        this.service.updateCompanySourceConfig(data).subscribe(data => {
            if (data.response_code === 0) {
                this.findCompanySourceConfig();
            }
        }, error => {
            console.log(error)
        })
    }

    downloadCompanyTemplateJSON() {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ normalizedJson: this.normalizedJSON }));
        let link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", "normalizedJSON.json");
        document.body.appendChild(link); // Required for FF
        link.click();
    }
}