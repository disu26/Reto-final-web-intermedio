import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';
import { MockUser } from '../models/mock-user';
import { User } from '../models/user';
import { ServiceService } from '../Service/service.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let authState: MockUser = {
    displayName: '',
    isAnonymous: true,
    uid: ''
  }

  let mockAngularFireAuth: any = null;

  let input: User = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: true,
  }

  let angularFireStoreStub: any = null;

  beforeEach(() => {
    authState = {
      displayName: '',
      isAnonymous: true,
      uid: '0XsMDFqqaqgwRHAMwb6AGPgfNrI3'
    }
  
    mockAngularFireAuth = {
      auth: jasmine.createSpyObj('auth', {
        'signInAnonymusly': Promise.reject({
          code: 'auth/operation-not-allowed'
        }).catch(err => console.log(err)),
      }),
      authState : of(authState)
    };
  
    input = {
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
  
    angularFireStoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    }
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: angularFireStoreStub },
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
