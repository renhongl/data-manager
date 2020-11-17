import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DubokuComponent } from './duboku.component';

describe('DubokuComponent', () => {
  let component: DubokuComponent;
  let fixture: ComponentFixture<DubokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DubokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DubokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
