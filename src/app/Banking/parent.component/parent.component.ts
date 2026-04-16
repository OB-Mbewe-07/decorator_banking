import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';  
import { BankAccount } from '../modals/account.modal';
import { HighlightDirective } from '../directive/higlight.directive';
import { ChildComponent } from '../child.component/child.component';
import { RandBalancePipe } from '../pipe/rand-balance.pipe';
import { THEME } from '../theme/theme.factory';
import { USER_OBJECT } from '../../core/user.object';
import { NetWorthService } from '../services/net-worth.service';
import { NetworthModel } from '../services/net-worth.model';
import { DataServicesCalls } from '../services/data.services';

@Component({
  selector: `app-bank-parent`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, HighlightDirective, ChildComponent, RandBalancePipe],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit {
  private netWorthService = inject(NetWorthService);
  private apiData = inject(DataServicesCalls);

  theme = inject(THEME);
  loggedIn = inject(USER_OBJECT);

  accounts!: BankAccount[];
  selectedAccount: BankAccount | null = null;
  netWorth: NetworthModel | null = null;
  selectedCurrency: string = 'ZAR';

  ngOnInit() {
    this.apiData.getAccountData().subscribe((data) => {
      this.accounts = data;
      this.calculateNetWorth();
      this.balanceChange();
    });
  }

  calculateNetWorth() {
    if (this.accounts?.length > 0) {
      this.netWorth = this.netWorthService.calculateNetWorth(this.accounts);
      console.log('Net Worth Calculated:', this.netWorth);
    }
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
