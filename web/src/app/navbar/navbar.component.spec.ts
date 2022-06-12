import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MockUser } from '../models/mock-user';
import { ServiceService } from '../Service/service.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const authState: MockUser = {
    displayName: '',
    isAnonymous: true,
    uid: '0XsMDFqqaqgwRHAMwb6AGPgfNrI3'
  }

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInAnonymusly': Promise.reject({
        code: 'auth/operation-not-allowed'
      }),
    }),
    authState : of(authState)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: ServiceService, useClass: ServiceService }
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
