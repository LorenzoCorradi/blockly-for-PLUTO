/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
//import {blocks} from './blocks/text';


import {blocks} from './blocks/pluto';
//import {forBlock} from './generators/javascript';
//import {javascriptGenerator} from 'blockly/javascript';
import {plutoGenerator} from './generators/pluto';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
//Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
//const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {renderer:'zelos', toolbox: toolbox,
zoom:
    {controls: false,
     wheel: true,
     startScale: 1.0,
     maxScale: 3,
     minScale: 0.3,
     scaleSpeed: 1.2,
     pinch: true},
trashcan: true});
//impedisci che anche il toolbox venga zoomato


ws.setTheme(Blockly.Themes.Zelos);
//usa zelos come render dei blocchi


// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
/* const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = '';

  eval(code);
}; */

const runCode = () => {
  const code = plutoGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});


// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()) {
    return;
  }
  runCode();
});


document.getElementById('undoButton').addEventListener('click', function() {
  ws.undo(false);
  
});

document.getElementById('redoButton').addEventListener('click', function() {
  ws.undo(true);
  
});

document.getElementById('zoomInButton').addEventListener('click', function() {
  ws.zoomCenter(1);
  
});

document.getElementById('zoomOutButton').addEventListener('click', function() {
  ws.zoomCenter(-1);
  
});