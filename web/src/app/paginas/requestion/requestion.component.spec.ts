import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MockUser } from 'src/app/models/mock-user';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

import { RequestionComponent } from './requestion.component';

describe('RequestionComponent', () => {
  let component: RequestionComponent;
  let fixture: ComponentFixture<RequestionComponent>;

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
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: ServiceService, useClass: ServiceService },
        QuestionService,
        ActivatedRoute
      ],
      declarations: [ RequestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
