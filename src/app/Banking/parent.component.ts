import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from "@angular/core";
import { BankAccount } from "./account.modal";
import { HighlightDirective } from "./higlight.directive";
import { ChildComponent } from "./child.component";
import { RandBalancePipe } from "./rand-balance.pipe";

@Component({
    selector: `app-bank-parent`,
    standalone: true, 
    imports: [CommonModule, HighlightDirective , ChildComponent , RandBalancePipe],
    templateUrl:'./parent.component.html',
})
export class ParentComponent implements OnInit{
    private http = inject(HttpClient);
    accounts !: BankAccount[] ; 
    selectedAccount : BankAccount | null = null; 
    ngOnInit() {
        this.http.get<BankAccount[]>('/assets/account.json').subscribe(data =>{
            this.accounts = data; 
            this.balanceChange();
        });
    };

    balanceChange(){
        setInterval(() => {
            this.accounts = this.accounts.map(acc => ({
                ...acc,
                balance: acc.balance + (Math.random() * 10 - 5),
            }));

            if(this.selectedAccount){
                this.selectedAccount = this.accounts.find(a => a.id === this.selectedAccount?.id) || null;
            }
        }, 3000);
    };

    selectAccount(account: BankAccount){
        this.selectedAccount = account; 
    }

    closeDetail(){
        this.selectedAccount = null;
    }
}