import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataServicesCalls } from '../services/data.services';
import { ClientData } from '../modals/data-service.modal';
import { BankAccount } from '../modals/account.modal';
import { LoanService } from '../services/loan.service';

@Component({
    selector: 'app-lobby-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="client-container">
            @for (client of clientData; track client.name) {
                <div class="client-card">
                    <h2>{{ client.name }}</h2>
                    <hr>
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
                    <div class="request">
                        <select name="" id="">
                            @for(account of accounts; track account.id){
                                <option value="">
                                    {{account.accountType}}
                                </option>
                            }
                        </select>
                        <button>
                            Ask for a loan
                        </button>
                        <input type="text" placeholder="R 00.00">
                    </div>
                    
                </div>
            } @empty {
                <p>No client data found.</p>
            }
        </div>
    `
})
export class LobbyPageComponent implements OnInit{
    private apiData = inject(DataServicesCalls);
    private loanService = inject(LoanService); 
    
    clientData : ClientData[] = [] ;
    accounts : BankAccount[] = [];
    selectedAccountId: number | null = null;
    loanAmount : number = 0;
    loanReason : string = '';

    ngOnInit(): void {
        this.apiData.getClients().subscribe({
            next: (data) => {
                this.clientData = data;
            },
            error: (err) => {
                console.log(err);
            }
        });

        this.apiData.getAccountData().subscribe({
            next: (data) => {
                this.accounts = data;
            }
        })
    }

    submitLoanRequest() {
        if (!this.selectedAccountId || this.loanAmount <= 0) {
            alert("Please select an account and enter a valid amount");
            return;
        }

        const selectedAccount = this.accounts.find(a => a.id === this.selectedAccountId);

        this.loanService.submitLoanRequest({
            accountId: this.selectedAccountId,
            accountNumber: selectedAccount?.accountNumber || '',
            amount: this.loanAmount,
            reason: this.loanReason,
            status: 'pending',
            requestDate: new Date()
        });

        alert('Loan request submitted successfully!');
        
        this.loanAmount = 0;
        this.loanReason = '';
        this.selectedAccountId = null;
    }
}