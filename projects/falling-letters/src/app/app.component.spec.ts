import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let loader: HarnessLoader;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule, MatToolbarModule],
        declarations: [AppComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(AppComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    })
  );

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Typing Games'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Typing Games');
  });

  it('should render title', async () => {
    const toolbarHarness = await loader.getHarness(MatToolbarHarness);
    const title = await toolbarHarness.getRowsAsText();
    expect(title).toContain('Fallende Buchstaben');
  });
});
