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

@Component({
  selector: 'app-lobby-page',
  imports: [FormsModule, AsyncPipe, RandBalancePipe],
  templateUrl: './lobby.component.html',
})
export class LobbyPageComponent implements OnInit, OnDestroy {
  private apiData = inject(DataServicesCalls);
  private clientSub = new Subscription();
  private cdr = inject(ChangeDetectorRef);
  private loanState = inject(BankingStoreServices);

  clientData: ClientData[] = [];
  accounts: BankAccount[] = [];
  selectedAccountId: number | null = null;
  loanAmount: number = 0;
  loanReason: string = '';

  //state management
  amount: number = 0;
  purpose: string = '';
  selectedId: string = '';

  loans$ = this.loanState.loans$;
  submitting$ = this.loanState.submitting$;
  error$ = this.loanState.error$;

  ngOnInit(): void {
    this.loanState.loadLoans();
    this.clientSub.add(
      this.apiData.getClients().subscribe({
        next: (data) => {
          this.clientData = data;
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

  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
    console.log('cleaned');
  }

  onSubmitLoan() {
    console.log("Loan Submitted");
    console.log("Amount: ",this.amount);
    console.log("id: ",this.selectedId);
    if (this.amount > 0 && this.selectedId) {
      this.loanState.submitLoan(this.amount, this.selectedId, this.purpose);
      this.amount = 0;
      this.purpose = '';
      this.selectedId = '';
    }
  }

  hasUnsavedChanges(): boolean {
    return this.loanAmount > 0 || this.loanReason !== '';
  }
}
