import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { from, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MockUser } from 'src/app/models/mock-user';
import { User } from 'src/app/models/user';
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

  const input: User = {
    uid: '0XsMDFqqaqgwRHAMwb6AGPgfNrI3',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: true,
  }

  const data = from(of(input));

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  }

  const angularFireStoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule
      ],
      providers: [
        MessageService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: angularFireStoreStub },
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
