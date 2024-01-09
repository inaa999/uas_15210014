import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UangPage } from './uang.page';

describe('UangPage', () => {
  let component: UangPage;
  let fixture: ComponentFixture<UangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
