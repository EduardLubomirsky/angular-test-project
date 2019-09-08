import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService, CartService } from '../../services';
import { User } from '../../models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription;
  private subscription2: Subscription;
  public currentUser: User;
  public cartCount: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private router: Router
  ) {
    this.subscription2 = this.authenticationService.currentUser.subscribe((res) => {
      this.currentUser = res;
    });

    this.subscription = this.cartService.dataSource.subscribe((res) => {
      this.cartCount = res.length
    });
  }

  ngAfterViewInit() {
    if (this.currentUser) {
      this.cartService.getCartCount(this.currentUser.id).subscribe((res) => {
        this.cartCount = res;
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription.unsubscribe();
    }
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['auth/logon']);
  }

}
