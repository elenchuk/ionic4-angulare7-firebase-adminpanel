import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDialogPage } from './avatar-dialog.page';

describe('AvatarDialogPage', () => {
  let component: AvatarDialogPage;
  let fixture: ComponentFixture<AvatarDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarDialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
