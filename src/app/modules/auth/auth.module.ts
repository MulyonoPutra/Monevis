import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [],
	imports: [CommonModule, AuthRoutingModule, HttpClientModule],
})
export class AuthModule {}
