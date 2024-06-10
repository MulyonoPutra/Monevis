import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { SeparateCapitalWordsPipe } from '../../pipes/separate-capital-words.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule, SeparateCapitalWordsPipe
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() columns: string[] = [];
  @Input() data: { [key: string]: any }[] = [];
  @Output() update = new EventEmitter<{ [key: string]: any }>();
  @Output() delete = new EventEmitter<{ [key: string]: any }>();

  ngOnInit(): void { }

  onRemove(row: { [key: string]: any }) {
    this.delete.emit(row);
  }

  onUpdate(row: { [key: string]: any }) {
    this.update.emit(row);
  }
}
