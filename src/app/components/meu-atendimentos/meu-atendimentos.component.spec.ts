import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuAtendimentosComponent } from './meu-atendimentos.component';

describe('MeuAtendimentosComponent', () => {
  let component: MeuAtendimentosComponent;
  let fixture: ComponentFixture<MeuAtendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuAtendimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
