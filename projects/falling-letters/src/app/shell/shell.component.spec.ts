import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ShellComponent } from './shell.component';

let loader: HarnessLoader;
let fixture: ComponentFixture<ShellComponent>;

describe('ShellComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule, MatToolbarModule],
        declarations: [ShellComponent, MockGameBoardComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(ShellComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    })
  );

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Typing Games'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Typing Games');
  });

  it('should render title', async () => {
    const toolbarHarness = await loader.getHarness(MatToolbarHarness);
    const title = await toolbarHarness.getRowsAsText();
    expect(title).toContain('Typing Games');
  });
});

@Component({ selector: 'tyg-game-board', template: '' })
class MockGameBoardComponent {}
