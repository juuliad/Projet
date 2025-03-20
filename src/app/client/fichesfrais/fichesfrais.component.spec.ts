import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheFraisComponent } from './fichesfrais.component';

describe('FichesfraisComponent', () => {
  let component: FicheFraisComponent;
  let fixture: ComponentFixture<FicheFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheFraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
