import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../../../../core/services/master.service';
import { Bulan } from '../../../../../core/models/bulan';
import { TableComponent } from '../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-bulan',
  standalone: true,
  imports: [
    CommonModule, TableComponent
  ],
  templateUrl: './bulan.component.html',
  styleUrls: ['./bulan.component.scss'],
  providers: [MasterService]
})
export class BulanComponent implements OnInit {

  bulan!: Bulan[];
  columns = ['id', 'namaBulan']

  constructor(
    private readonly router: Router,
    private readonly masterService: MasterService
  ) {

  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.masterService.findAllBulan().subscribe({
      next: (response) => {
        this.bulan = response.data;
      }
    })
  }

  navigate(): void {
    this.router.navigate(['/master/bulan-form']);
  }

  onUpdate(event: any): void {
    console.log('update : ' + event)
  }

  onRemove(event: any): void {
    console.log('remove : ' + event)
  }

}
