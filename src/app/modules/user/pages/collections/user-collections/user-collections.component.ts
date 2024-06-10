import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/user';
import { TableComponent } from '../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-user-collections',
  standalone: true,
  imports: [
    CommonModule, TableComponent
  ],
  templateUrl: './user-collections.component.html',
  styleUrls: ['./user-collections.component.scss'],
  providers: [UserService]
})
export class UserCollectionsComponent implements OnInit {

  user!: User[]

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.userService.findAll().subscribe({
      next: (response) => {
        this.user = response.data;
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
