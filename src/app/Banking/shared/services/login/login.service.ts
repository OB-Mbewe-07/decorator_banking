import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { DataServicesCalls } from '../data.services';
import { Subscription } from 'rxjs';
import { ClientData } from '../../modals/data-service.modal';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService  {
  private subscribe = new Subscription();
  allData: ClientData[] = [];
  currentUser: string = '';

  makeLogin(email: string, data: ClientData[] ): boolean {
    this.allData = data;
    for (const user of this.allData) {
      if (user.name.toLocaleLowerCase() == email.trim().toLocaleLowerCase()) {
        this.currentUser = user.name;
        return true;
      }
    }
    return false;
  }

  getUser(): string {
    return this.currentUser;
  }
}
