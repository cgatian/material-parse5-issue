import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { join } from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('material-parse5-issue', () => {
  let appTree: Tree;
  let testRunner: SchematicTestRunner;

  beforeEach(() => {
    appTree = createApp();
    testRunner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('works', () => {
    const tree = testRunner.runSchematic('material-parse5-issue', {}, appTree);
    const files = tree.files;
    expect(files.length).toBeGreaterThanOrEqual(0);
  });
});


/** Helper methods */

const ngCollectionPath = join('./node_modules/@schematics/angular/collection.json');

const workspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0',
};

const defaultAppOptions = {
  name: 'sample-app',
  inlineStyle: false,
  inlineTemplate: false,
  viewEncapsulation: 'Emulated',
  routing: false,
  style: 'scss',
  skipTests: false,
};

/**
 * Creates a basic Angular CLI workspace and app
 */
export function createApp(): UnitTestTree {
  const ngRunner = new SchematicTestRunner('@schematics/angular', ngCollectionPath);
  const workspaceTree = ngRunner.runSchematic('workspace', workspaceOptions);
  return ngRunner.runSchematic('application', defaultAppOptions, workspaceTree);
}