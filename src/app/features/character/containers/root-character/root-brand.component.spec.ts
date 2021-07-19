import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCharacterComponent } from './root-character.component';

describe('RootCharacterComponent', () => {
  let component: RootCharacterComponent;
  let fixture: ComponentFixture<RootCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
