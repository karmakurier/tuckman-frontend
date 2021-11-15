import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFinishComponent } from './question-finish.component';

describe('QuestionFinishComponent', () => {
  let component: QuestionFinishComponent;
  let fixture: ComponentFixture<QuestionFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
