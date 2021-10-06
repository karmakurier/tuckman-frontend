import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotchartComponent } from './dotchart.component';

describe('DotchartComponent', () => {
  let component: DotchartComponent;
  let fixture: ComponentFixture<DotchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
