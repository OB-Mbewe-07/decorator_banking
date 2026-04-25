import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrl: './login.component.css'
})
export class AppLoginComponent {
  private router = inject(Router);
  email: string = '';
  password: string = '';
  remember: boolean = false;

  onLogin() {
    console.log('Login:', this.email, this.password);
    this.router.navigate(['/loan-request']);
  }
}
