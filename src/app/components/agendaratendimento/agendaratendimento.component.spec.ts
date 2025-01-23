import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaratendimentoComponent } from './agendaratendimento.component';

describe('AgendaratendimentoComponent', () => {
  let component: AgendaratendimentoComponent;
  let fixture: ComponentFixture<AgendaratendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaratendimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaratendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
