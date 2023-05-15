import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenaiViewComponent } from './openai-view.component';

describe('OpenaiViewComponent', () => {
  let component: OpenaiViewComponent;
  let fixture: ComponentFixture<OpenaiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenaiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenaiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
