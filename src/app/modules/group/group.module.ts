import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GroupRoutingModule,
    HttpClientModule,
  ]
})
export class GroupModule { }
