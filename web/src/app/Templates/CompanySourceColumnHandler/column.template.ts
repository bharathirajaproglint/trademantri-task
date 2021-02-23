import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'company-source-column-handler',
    templateUrl: './column.template.html'
})
export class CompanySourceColumnHandlerComponent {
    @Input() columnName: String;
    @Input() dataType: String;
    @Input() sourceColumnName: String;
    @Input() index: number;
    @Output() updateFieldEmitter = new EventEmitter();
    @Output() deleteRecordEmitter = new EventEmitter();

    updateField(event) {
        this[event.target.name] = event.target.value;
        let data = {
            columnName: this.columnName,
            dataType: this.dataType,
            sourceColumnName: this.sourceColumnName,
            index: this.index
        }
        this.updateFieldEmitter.emit(data);
    }
}
