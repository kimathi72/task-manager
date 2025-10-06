import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: `./dashboard.html`,
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  refreshTrigger = 0;

  constructor(private router: Router) {}

  logout(): void {
    // Remove JWT and any other user info
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');

    // Optionally call backend logout endpoint (optional for JWT stateless)
    // this.http.post('/api/auth/logout', {}).subscribe();

    // Redirect to login
    this.router.navigate(['/login']);
  }
  onTaskCreated(_: any) {
    this.refreshTrigger++;
  }
}
