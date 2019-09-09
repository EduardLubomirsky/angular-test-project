// Vendors
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { AuthenticationService } from 'src/app/shared/services';

// Models
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  public currentUser: User;
  public subscription: Subscription;

  constructor(
    private authService: AuthenticationService
  ) {
    this.subscription = this.authService.currentUser.subscribe((res) => {
      this.currentUser = res;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
