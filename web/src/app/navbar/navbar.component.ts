import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { reload } from '@firebase/auth';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  disabled: boolean = false;

  constructor(public authService: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.traerdatos();
  }

  traerdatos() {
    this.userLogged.subscribe((value) => {    
      if (value?.email == undefined) {
        this.disabled = true;        
      } else {
        this.disabled = false;       
      }
    });
  }

  login() {
    this.route.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
    this.route.navigate(['preguntas']);
  }
}
