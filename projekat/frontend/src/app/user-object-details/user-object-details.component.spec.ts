import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserObjectDetailsComponent } from './user-object-details.component';

describe('UserObjectDetailsComponent', () => {
  let component: UserObjectDetailsComponent;
  let fixture: ComponentFixture<UserObjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserObjectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
