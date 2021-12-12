import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRoomDetailsComponent } from './print-room-details.component';

describe('PrintRoomDetailsComponent', () => {
  let component: PrintRoomDetailsComponent;
  let fixture: ComponentFixture<PrintRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRoomDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
