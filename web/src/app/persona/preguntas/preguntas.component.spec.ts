import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MockUser } from 'src/app/models/mock-user';
import { User } from 'src/app/models/user';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

import { PreguntasComponent } from './preguntas.component';

describe('PreguntasComponent', () => {
  let component: PreguntasComponent;
  let fixture: ComponentFixture<PreguntasComponent>;

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
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: angularFireStoreStub },
        { provide: ServiceService, useClass: ServiceService },
        QuestionService,
        HttpClientModule
      ],
      declarations: [ PreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
