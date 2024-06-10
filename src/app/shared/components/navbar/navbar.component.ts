import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuItems = [
    {
      title: "Transaksi",
      icon: "../../../../assets/icons/money.svg",
      route: "/transaksi"
    },
    {
      title: "Group",
      icon: "../../../../assets/icons/group.svg",
      route: "/group"
    },
    {
      title: "User Management",
      icon: "../../../../assets/icons/user.svg",
      route: "/user"
    },
    {
      title: "Master",
      icon: "../../../../assets/icons/data.svg",
      route: "/master/bulan",
      children: [
        {
          title: "Bulan",
          icon: "../../../../assets/icons/moon.svg",
          route: "//master/bulan"
        },
        {
          title: "Unit",
          icon: "../../../../assets/icons/money.svg",
          route: "/master/unit"
        },
      ]
    },
  ];
}
