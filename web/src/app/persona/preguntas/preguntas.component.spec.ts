import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { MockUser } from 'src/app/models/mock-user';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
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
