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
    ngOnInit() {
        this.http.get<BankAccount[]>('assets/accounts.json').subscribe(data =>{
            console.log(data); 
            this.accounts = data; 
        });
    }
}