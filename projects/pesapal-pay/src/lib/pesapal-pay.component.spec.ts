import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesapalPayComponent } from './pesapal-pay.component';

describe('PesapalPayComponent', () => {
  let component: PesapalPayComponent;
  let fixture: ComponentFixture<PesapalPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesapalPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesapalPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
