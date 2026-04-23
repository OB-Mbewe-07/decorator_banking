import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { BankAccount } from '../../shared/modals/account.modal';
import { HighlightDirective } from '../../shared/directive/higlight.directive';
import { ChildComponent } from '../child.component/child.component';
import { RandBalancePipe } from '../../shared/pipe/rand-balance.pipe';
import { THEME } from '../../shared/theme/theme.factory';
import { USER_OBJECT } from '../../../core/user.object';
import { NetWorthService } from '../../shared/services/net-worth.service';
import { NetworthModel } from '../../shared/services/net-worth.model';
import { DataServicesCalls } from '../../shared/services/data.services';
import { Observable, Subscription } from 'rxjs';
import { BankingStoreServices } from '../../store/loans.service';
import { LoanService } from '../../shared/services/server-data/server-data.service';
import { Loan } from '../../store/loans.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: `app-bank-parent`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, HighlightDirective, ChildComponent, RandBalancePipe , FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit, OnDestroy {
  private netWorthService = inject(NetWorthService);
  private loanService = inject(LoanService);
  private apiSub = new Subscription();
  private apiData = inject(DataServicesCalls);
  private loanState = inject(BankingStoreServices);

  theme = inject(THEME);
  loggedIn = inject(USER_OBJECT);
  private cdr = inject(ChangeDetectorRef);

  accounts!: BankAccount[];
  selectedAccount: BankAccount | null = null;
  netWorth: NetworthModel | null = null;
  selectedCurrency: string = 'ZAR';

  //state managament
  loans$!: Observable<Loan[]>;
  submitting$ = this.loanState.submitting$;
  error$ = this.loanState.error$;
  loansData : Loan[] | null = null; 
  rejectionReasons: { [loanId: string]: string } = {};

  ngOnInit() {
    this.apiSub.add(
      this.apiData.getAccountData().subscribe((data) => {
        this.accounts = data;
        this.calculateNetWorth();
        this.balanceChange();
        this.cdr.detectChanges();
      }),
    );

    this.loadLoans();
  }

  loadLoans() {
    this.loans$ = this.loanService.getLoans();
    this.loans$.subscribe({
      next: (data) => {
        this.loansData = data;
      }
    })
  }

  ngOnDestroy(): void {
    this.apiSub.unsubscribe();
  }

  calculateNetWorth() {
    if (this.accounts?.length > 0) {
      this.netWorth = this.netWorthService.calculateNetWorth(this.accounts);
      console.log('Net Worth Calculated:', this.netWorth);
    }
  }

  seeLoans() {
    this.loanService.getLoans().subscribe({
      next: (data) => {
        console.log('Loan Application: ', data);
      },
      error: (err) => {
        console.log('There was an error in the code', err);
      },
    });
  }

  approveLoan(id: string) {
    this.loanService.approveLoan(id).subscribe({
      next: () => {
        console.log('loan approved');
        this.loadLoans();
      },
      error: (err) => console.error(err)
    });
  }
  declineLoan(id: string, reason?: string) {
    this.loanService.rejectLoan(id , reason).subscribe({
      next: () => {
        console.log('loan rejected');
        this.loadLoans();
      },
      error: (err) => console.error(err)
    });
  }

  pendingLoans() {
    return this.loansData?.filter(x => x.status === 'pending') ?? [];
  }

  balanceChange() {
    setInterval(() => {
      this.accounts = this.accounts.map((acc) => ({
        ...acc,
        balance: acc.balance + (Math.random() * 10 - 5),
      }));

      if (this.selectedAccount) {
        this.selectedAccount =
          this.accounts.find((a) => a.id === this.selectedAccount?.id) || null;
      }
    }, 3000);
  }

  selectAccount(account: BankAccount) {
    this.selectedAccount = account;
  }

  closeDetail() {
    this.selectedAccount = null;
  }

  switchCurrency(currency: string) {
    this.selectedCurrency = currency;
  }
}
