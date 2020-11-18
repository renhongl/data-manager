import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToutiaoComponent } from './toutiao.component';

describe('ToutiaoComponent', () => {
  let component: ToutiaoComponent;
  let fixture: ComponentFixture<ToutiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToutiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToutiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
