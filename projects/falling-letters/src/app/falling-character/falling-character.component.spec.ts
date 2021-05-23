import { FallingCharacterComponent } from './falling-character.component';

describe('FallingCharacterComponent', () => {
  it('should create', () => {
    const component = setup().default().build();
    expect(component).toBeTruthy();
  });
});

interface TestSetupBuilder {
  default(): TestSetupBuilder;
  build(): FallingCharacterComponent;
}

function setup(): TestSetupBuilder {
  const builder = {
    default(): TestSetupBuilder {
      return builder;
    },
    build(): FallingCharacterComponent {
      return new FallingCharacterComponent();
    },
  };
  return builder;
}
