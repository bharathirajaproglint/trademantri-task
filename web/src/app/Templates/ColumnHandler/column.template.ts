import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'column-handler',
    templateUrl: './column.template.html'
})
export class ColumnHandlerComponent {
    @Input() columnName: String;
    @Input() dataType: String;
    @Input() index: number;
    @Output() updateFieldEmitter = new EventEmitter();
    @Output() deleteRecordEmitter = new EventEmitter();

    updateField(event) {
        this[event.target.name] = event.target.value;
        let data = {
            columnName: this.columnName,
            dataType: this.dataType,
            index: this.index
        }
        this.updateFieldEmitter.emit(data);
    }

    deleteColumn() {
        this.deleteRecordEmitter.emit(this.index);
    }
}
