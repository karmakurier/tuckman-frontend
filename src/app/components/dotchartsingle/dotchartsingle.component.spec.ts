import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotchartsingleComponent } from './dotchartsingle.component';

describe('DotchartsingleComponent', () => {
  let component: DotchartsingleComponent;
  let fixture: ComponentFixture<DotchartsingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotchartsingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotchartsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
