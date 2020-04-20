import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenadoresListComponent } from './ordenadores-list.component';

describe('OrdenadoresListComponent', () => {
  let component: OrdenadoresListComponent;
  let fixture: ComponentFixture<OrdenadoresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenadoresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenadoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
