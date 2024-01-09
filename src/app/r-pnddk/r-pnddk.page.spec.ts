import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RPnddkPage } from './r-pnddk.page';

describe('RPnddkPage', () => {
  let component: RPnddkPage;
  let fixture: ComponentFixture<RPnddkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RPnddkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
