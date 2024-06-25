import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToursComponent } from './user-tours.component';

describe('UserToursComponent', () => {
  let component: UserToursComponent;
  let fixture: ComponentFixture<UserToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
