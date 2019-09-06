import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { User } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x
    });
  }

  ngOnInit() {
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['auth/logon']);
  }

}
