import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoundcomponentComponent } from './pagenotfoundcomponent.component';

describe('PagenotfoundcomponentComponent', () => {
  let component: PagenotfoundcomponentComponent;
  let fixture: ComponentFixture<PagenotfoundcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotfoundcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfoundcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
