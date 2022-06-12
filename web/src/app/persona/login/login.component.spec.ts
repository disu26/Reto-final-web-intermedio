import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { MockUser } from 'src/app/models/mock-user';
import { ServiceService } from 'src/app/Service/service.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        MessageService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: ServiceService, useClass: ServiceService },
        FormBuilder
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
