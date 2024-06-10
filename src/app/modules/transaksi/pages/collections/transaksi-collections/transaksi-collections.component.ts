import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { TransaksiService } from '../../../../../core/services/transaksi.service';
import { Router } from '@angular/router';
import { Transaksi } from '../../../../../core/models/transaksi';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaksi-collections',
  standalone: true,
  imports: [
    CommonModule, TableComponent
  ],
  templateUrl: './transaksi-collections.component.html',
  styleUrls: ['./transaksi-collections.component.scss'],
  providers: [TransaksiService]
})
export class TransaksiCollectionsComponent implements OnInit {

  transaksi!: Transaksi[];

  constructor(
    private readonly router: Router,
    private readonly transaksiService: TransaksiService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.transaksiService.findAll().subscribe({
      next: (response) => {
        this.transaksi = response.data;
      }
    });
  }

  navigate(): void {
    this.router.navigate(['transaksi']);
  }

  onUpdate(id: any): void {
    this.router.navigateByUrl(`/transaksi/update/${id}`);
  }

  onRemove(id: any): void {
    this.transaksiService.remove(id).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {
        window.location.reload();
      }
    });
  }

}
