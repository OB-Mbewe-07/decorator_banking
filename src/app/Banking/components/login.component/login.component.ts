import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from '../../shared/services/login/login.service';
import { ClientData } from '../../shared/modals/data-service.modal';
import { Subscription } from 'rxjs';
import { DataServicesCalls } from '../../shared/services/data.services';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrl: './login.component.css'
})
export class AppLoginComponent implements OnInit, OnDestroy{
  private router = inject(Router);
  private loginService = inject(UserLoginService)
  email: string = '';
  password: string = '';
  remember: boolean = false;
  users : ClientData[] = [];
allData: ClientData[] = [];
  private loginData = inject(DataServicesCalls);
  private subscribe = new Subscription;
  ngOnInit(): void {
      this.subscribe.add(
      this.loginData.getClients().subscribe({
        next: (data) => {
          console.log(`data`, data);
          this.allData = data;
        },
        error: (err) => {
          console.error(err);
        },
      }),
    );
  }

  onLogin() {
    console.log('login: ',this.loginService.makeLogin(this.email , this.allData));
    this.router.navigate(['/loan-request']);
  }

  ngOnDestroy(): void {
      this.subscribe.unsubscribe();
  }
}
