import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../Components/button/button.component';
import { AuthService } from '../Services/auth.service';
import { PageloadService } from '../pageload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  pageLoad = inject(PageloadService);
  router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.pageLoad.isPageLoad.set(false);
    }, 700);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
