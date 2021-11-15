import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWelcomeComponent } from './question-welcome.component';

describe('QuestionWelcomeComponent', () => {
  let component: QuestionWelcomeComponent;
  let fixture: ComponentFixture<QuestionWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
