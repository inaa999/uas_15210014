import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdduangPage } from './adduang.page';

describe('AdduangPage', () => {
  let component: AdduangPage;
  let fixture: ComponentFixture<AdduangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdduangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

