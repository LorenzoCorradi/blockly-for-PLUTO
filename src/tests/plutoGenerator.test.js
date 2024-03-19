// test.js
const assert = require('assert'); 

const myModule = require('../generators/pluto'); 
const Blockly = require('blockly');
const { plutoGenerator } = require('../generators/pluto');

describe('Pluto Generator', () => {
  it('should generate null for logic_null block', () => {
    const workspace = new Blockly.Workspace();
    const block = workspace.newBlock('logic_null');
    const generatedCode = plutoGenerator.blockToCode(block);
    expect(generatedCode).toStrictEqual(['null', 0]);
  });
});