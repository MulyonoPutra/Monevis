import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-page-not-found-404',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './page-not-found-404.component.html',
	styleUrls: ['./page-not-found-404.component.scss'],
})
export class PageNotFound404Component implements OnInit {
	ngOnInit(): void {}
}
