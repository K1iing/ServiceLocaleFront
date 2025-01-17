import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokentrueComponent } from './tokentrue.component';

describe('TokentrueComponent', () => {
  let component: TokentrueComponent;
  let fixture: ComponentFixture<TokentrueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokentrueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokentrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
