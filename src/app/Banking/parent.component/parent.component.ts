import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { BankAccount } from '../modals/account.modal';
import { HighlightDirective } from '../directive/higlight.directive';
import { ChildComponent } from '../components/child.component/child.component';
import { RandBalancePipe } from '../pipe/rand-balance.pipe';
import { THEME } from '../theme/theme.factory';
import { USER_OBJECT } from '../../core/user.object';
import { NetWorthService } from '../services/net-worth.service';
import { NetworthModel } from '../services/net-worth.model';
import { DataServicesCalls } from '../services/data.services';
import { Subscription } from 'rxjs';

@Component({
  selector: `app-bank-parent`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, HighlightDirective, ChildComponent, RandBalancePipe],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit, OnDestroy {
  private netWorthService = inject(NetWorthService);
  private apiSub = new Subscription();
  private apiData = inject(DataServicesCalls);

  theme = inject(THEME);
  loggedIn = inject(USER_OBJECT);
  private cdr = inject(ChangeDetectorRef);

  accounts!: BankAccount[];
  selectedAccount: BankAccount | null = null;
  netWorth: NetworthModel | null = null;
  selectedCurrency: string = 'ZAR';

  ngOnInit() {
    this.apiSub.add(
      this.apiData.getAccountData().subscribe((data) => {
        this.accounts = data;
        this.calculateNetWorth();
        this.balanceChange();
        this.cdr.detectChanges();
      }),
    );
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
