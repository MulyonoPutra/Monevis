import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { SeparateCapitalWordsPipe } from '../../pipes/separate-capital-words.pipe';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [CommonModule, SeparateCapitalWordsPipe],
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	@Input() columns: string[] = [];
	@Input() data: { [key: string]: any }[] = [];
	@Output() update = new EventEmitter<number>();
	@Output() delete = new EventEmitter<number>();

	ngOnInit(): void {}

	onRemove(row: number) {
		this.delete.emit(row);
	}

	onUpdate(row: number) {
		this.update.emit(row);
	}
}
