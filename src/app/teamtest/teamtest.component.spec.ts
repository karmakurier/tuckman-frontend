import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamtestComponent } from './teamtest.component';

describe('TeamtestComponent', () => {
  let component: TeamtestComponent;
  let fixture: ComponentFixture<TeamtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
