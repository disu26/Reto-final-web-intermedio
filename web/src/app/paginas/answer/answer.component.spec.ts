import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { MockUser } from 'src/app/models/mock-user';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

import { AnswerComponent } from './answer.component';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

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
        HttpClientModule
      ],
      providers: [
        NgbModal,
        QuestionService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: ServiceService, useClass: ServiceService },
        MessageService,
        HttpClientModule,
        FormBuilder
      ],
      declarations: [ AnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
