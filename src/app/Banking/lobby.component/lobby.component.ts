import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DataServicesCalls } from '../services/data.services';
import { ClientData } from '../modals/data-service.modal';
import { BankAccount } from '../modals/account.modal';
import { LoanService } from '../services/loan.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lobby-page',
  imports: [FormsModule],
  template: `
    <div class="lobby-container">
      <h1 class="page-title">Loan Request Portal</h1>
      <p class="subtitle">
        Select a client and request a loan from their account
      </p>

      <div class="client-container">
        @for (client of this.clientData; track $index) {
          <div class="client-card">
            <div class="card-header">
              <h2>{{ client.name }}</h2>
              <span class="status-badge">Active Client</span>
            </div>

            <hr />

            <div class="details">
              <p><strong>Birth Year:</strong> {{ client.birth_year }}</p>
              <p><strong>Gender:</strong> {{ client.gender }}</p>
              <p><strong>Physical Traits:</strong></p>
              <ul>
                <li>Height: {{ client.height }}cm</li>
                <li>Mass: {{ client.mass }}kg</li>
                <li>Hair: {{ client.hair_color }}</li>
                <li>Eyes: {{ client.eye_color }}</li>
                <li>Skin: {{ client.skin_color }}</li>
              </ul>
            </div>

            <div class="loan-request-section">
              <h3>Request Loan</h3>

              <div class="form-row">
                <select [(ngModel)]="selectedAccountId" class="account-select">
                  <option value="" disabled selected>
                    -- Select Account --
                  </option>
                  @for (account of accounts; track account.id) {
                    <option [value]="account.id">
                      {{ account.accountType }} — {{ account.accountNumber }}
                    </option>
                  }
                </select>

                <input
                  type="number"
                  [(ngModel)]="loanAmount"
                  class="amount-input"
                  placeholder="Loan Amount (ZAR)"
                  min="1000"
                />
              </div>

              <textarea
                [(ngModel)]="loanReason"
                class="reason-textarea"
                placeholder="Reason for loan (e.g. Business expansion, Vehicle purchase...)"
              >
              </textarea>

              <button class="loan-btn" (click)="submitLoanRequest()">
                Submit Loan Request
              </button>
            </div>
          </div>
        } @empty {
          <p class="no-data">No client data found.</p>
        }
      </div>
    </div>
  `,
})
export class LobbyPageComponent implements OnInit, OnDestroy {
  private apiData = inject(DataServicesCalls);
  private clientSub = new Subscription();
  private loanService = inject(LoanService);
  private cdr = inject(ChangeDetectorRef);

  clientData: ClientData[] = [];
  accounts: BankAccount[] = [];

  selectedAccountId: number | null = null;
  loanAmount: number = 0;
  loanReason: string = '';

  ngOnInit(): void {
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

  hasUnsavedChanges(): boolean {
    return this.loanAmount > 0 || this.loanReason !== '';
  }

  submitLoanRequest() {
    if (!this.selectedAccountId || this.loanAmount <= 0) {
      alert('Please select an account and enter a valid amount');
      return;
    }

    const selectedAccount = this.accounts.find(
      (a) => a.id === this.selectedAccountId,
    );

    this.loanService.submitLoanRequest({
      accountId: this.selectedAccountId,
      accountNumber: selectedAccount?.accountNumber || '',
      amount: this.loanAmount,
      reason: this.loanReason,
      status: 'pending',
      requestDate: new Date(),
    });

    alert('Loan request submitted successfully!');

    this.loanAmount = 0;
    this.loanReason = '';
    this.selectedAccountId = null;
  }
}
