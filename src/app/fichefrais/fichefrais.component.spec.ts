import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichefraisComponent } from './fichefrais.component';

describe('FichefraisComponent', () => {
  let component: FichefraisComponent;
  let fixture: ComponentFixture<FichefraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichefraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichefraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
