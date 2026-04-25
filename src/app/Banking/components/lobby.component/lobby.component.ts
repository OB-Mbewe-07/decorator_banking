import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DataServicesCalls } from '../../shared/services/data.services';
import { ClientData } from '../../shared/modals/data-service.modal';
import { BankAccount } from '../../shared/modals/account.modal';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BankingStoreServices } from '../../store/loans.service';
import { AsyncPipe } from '@angular/common';
import { RandBalancePipe } from '../../shared/pipe/rand-balance.pipe';
import { LoanService } from '../../shared/services/server-data/server-data.service';
import { UserLoginService } from '../../shared/services/login/login.service';
import { Loan } from '../../store/loans.model';

@Component({
  selector: 'app-lobby-page',
  imports: [FormsModule, AsyncPipe, RandBalancePipe],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyPageComponent implements OnInit, OnDestroy {
  private apiData = inject(DataServicesCalls);
  private loanService = inject(LoanService);
  private clientSub = new Subscription();
  private cdr = inject(ChangeDetectorRef);
  private loanState = inject(BankingStoreServices);
  private loginService = inject(UserLoginService);

  clientData: ClientData[] = [];
  accounts: BankAccount[] = [];

  //state management
  amount: number = 0;
  purpose: string = '';
  selectedId: string = '';

  loans$ = this.loanState.loans$;
  submitting$ = this.loanState.submitting$;
  error$ = this.loanState.error$;
  successMessage: string | null = null;
  user: string = '';
  userLoans: Loan[] = [];

  ngOnInit(): void {
    this.loanState.loadLoans();
    this.user = this.loginService.getUser();

    this.clientSub.add(
      this.apiData.getClients().subscribe({
        next: (data) => {
          this.clientData = data.filter(
            (x) => x.name === this.loginService.getUser(),
          );
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      }),
    );

    this.clientSub.add(
      this.loanService.getLoans().subscribe({
        next: (data) => {
          this.userLoans = data.filter(
            (x) => x.applicantName === this.loginService.getUser(),
          );
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      }),
    );

    this.clientSub.add(
      this.apiData.getAccountData().subscribe({
        next: (data) => {
          this.accounts = data;
          this.cdr.detectChanges();
        },
      }),
    );
  }

  onSubmitLoan() {
    this.successMessage = null;
    const applicantName = this.clientData[0]?.name;

    this.clientSub.add(
      this.loanService
        .applyForLoan({
          applicantName,
          amount: this.amount,
          purpose: this.purpose.trim(),
        })
        .subscribe({
          next: () => {
            this.successMessage = 'Loan request submitted successfully!';
            console.log(this.successMessage);
          },
          error: (err) => {
            console.log('error in the system', err);
          },
        }),
    );
  }

  hasUnsavedChanges(): boolean {
    return this.amount > 0 || this.purpose !== '';
  }
  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
    console.log('cleaned');
  }
}
