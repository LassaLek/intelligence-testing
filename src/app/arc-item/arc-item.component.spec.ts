import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcItemComponent } from './arc-item.component';

describe('ArcItemComponent', () => {
  let component: ArcItemComponent;
  let fixture: ComponentFixture<ArcItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
