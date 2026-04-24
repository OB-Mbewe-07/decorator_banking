import { Injectable } from "@angular/core";
import { LoanRequest } from "./loanRequest.modal";

@Injectable({
    providedIn: 'root'
})
export class LoanService{
    private loanRequest: LoanRequest[] = [];

    submitLoanRequest(loan: LoanRequest){
        loan.id = Date.now();
        this.loanRequest.push(loan);
        console.log('New loan requwest: ', loan);
    }

    getAllLoanRequests(){
        return this.loanRequest;
    }
}