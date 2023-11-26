import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBillsComponent } from './check-bills.component';

describe('CheckBillsComponent', () => {
  let component: CheckBillsComponent;
  let fixture: ComponentFixture<CheckBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckBillsComponent]
    });
    fixture = TestBed.createComponent(CheckBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
