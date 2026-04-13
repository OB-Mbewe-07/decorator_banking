import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from "@angular/core";
import { BankAccount } from "./account.modal";
import { HighlightDirective } from "./higlight.directive";
import { ChildComponent } from "./child.component";
import { RandBalancePipe } from "./rand-balance.pipe";
import { USER_OBJECT } from "../core/user.object";
import { NetworthModel } from "./services/net-worth.model";
import { NetWorthService } from "./services/net-worth.service";

@Component({
    selector: `app-bank-parent`,
    standalone: true, 
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, HighlightDirective , ChildComponent , RandBalancePipe],
    templateUrl:'./parent.component.html',
    styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit{
    private http = inject(HttpClient);
    private netWorthService = inject(NetWorthService);
    loggedIn = inject(USER_OBJECT);

    accounts !: BankAccount[] ; 
    selectedAccount : BankAccount | null = null; 
    selectedCurrency: string = 'ZAR';
    netWorth: NetworthModel | null = null;
Object: any;
    
    ngOnInit() {
        this.http.get<BankAccount[]>('/assets/account.json').subscribe(data =>{
            this.accounts = data; 
            console.log(data);
            this.calculateNetWorth();
            this.balanceChange();
        });
    };

    calculateNetWorth(){
        if(this.accounts && this.accounts.length > 0){
            this.netWorth = this.netWorthService.calculateNetWorth(this.accounts);
            console.log("net worth is: " + this.netWorth);
        }else{
            console.warn("No accounts in here");
        }
    }


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

    switchCurrency(currency: string){
        this.selectedCurrency = currency;
    }
}