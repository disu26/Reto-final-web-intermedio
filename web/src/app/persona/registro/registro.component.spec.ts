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

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

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
        AppRoutingModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: angularFireStoreStub },
        { provide: ServiceService, useClass: ServiceService },
        MessageService,
        FormBuilder
      ],
      declarations: [ RegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Correo Invalido', () => {
    const email = component.form.controls['email'];
    email.setValue('pepito')
    expect(email.valid).toBeFalsy();
  })

  it('Correo Vacio', () => {
    const email = component.form.controls['email'];
    email.setValue('')
    expect(email.valid).toBeFalsy();
  })

  it('Correo Valido', () => {
    const email = component.form.controls['email'];
    email.setValue('pepito@gmail.com')
    expect(email.valid).toBeTruthy();
  })
  

  it('Contraseña invalida', () => {
    const password = component.form.controls['password'];
    password.setValue('1234')
    expect(password.valid).toBeFalsy();
  })

  it('Contraseña vacia', () => {
    const password = component.form.controls['password'];
    password.setValue('1234')
    expect(password.valid).toBeFalsy();
  })

  it('Contraseña valida', () => {
    const password = component.form.controls['password'];
    password.setValue('1234567895')
    expect(password.valid).toBeTruthy();
  })

  it('Formulario Valido', () => {
    const form = component.form;
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    email.setValue('pepito@gmail.com')
    password.setValue('1234567895')
    expect(form.valid).toBeTruthy();
  })
});
