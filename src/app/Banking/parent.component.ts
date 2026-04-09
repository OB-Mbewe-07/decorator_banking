import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit} from "@angular/core";
import { BankAccount } from "./account.modal";

@Component({
    selector: `app-bank-parent`,
    standalone: true, 
    imports: [CommonModule],
    template:``
})
export class ParentComponent implements OnInit{
    private http = inject(HttpClient);
    accounts !: BankAccount[] ; 
    selectedAccount : BankAccount | null = null; 
    ngOnInit() {
        this.http.get<BankAccount[]>('/assets/account.json').subscribe(data =>{
            this.accounts = data; 
        });
    }

    selectAccount(account: BankAccount){
        this.selectedAccount = account; 
    }
}