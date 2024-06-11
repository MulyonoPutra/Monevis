import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TransaksiRoutingModule } from './transaksi-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, TransaksiRoutingModule, HttpClientModule],
})
export class TransaksiModule {}
