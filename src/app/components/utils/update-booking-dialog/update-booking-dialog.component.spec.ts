import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingDialogComponent } from './update-booking-dialog.component';

describe('UpdateBookingDialogComponent', () => {
  let component: UpdateBookingDialogComponent;
  let fixture: ComponentFixture<UpdateBookingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBookingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
