import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoshomeComponent } from './atendimentoshome.component';

describe('AtendimentoshomeComponent', () => {
  let component: AtendimentoshomeComponent;
  let fixture: ComponentFixture<AtendimentoshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoshomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendimentoshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
