import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTopComponent } from './event-top.component';

describe('EventTopComponent', () => {
  let component: EventTopComponent;
  let fixture: ComponentFixture<EventTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
