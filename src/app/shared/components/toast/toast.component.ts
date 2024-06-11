import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../../core/models/toast';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
	ngOnInit(): void {}

	toasts: Toast[] = [];
}
