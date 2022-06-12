import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { from, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MockUser } from 'src/app/models/mock-user';
import { User } from 'src/app/models/user';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

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
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: angularFireStoreStub },
        { provide: ServiceService, useClass: ServiceService },
        QuestionService,
        MessageService,
        HttpClientModule
      ],
      declarations: [ EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
