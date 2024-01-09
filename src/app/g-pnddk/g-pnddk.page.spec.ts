import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GPnddkPage } from './g-pnddk.page';

describe('GPnddkPage', () => {
  let component: GPnddkPage;
  let fixture: ComponentFixture<GPnddkPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(GPnddkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
