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

const Order = {
  ATOMIC: 0,
};
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

ws.setTheme(Blockly.Themes.Zelos);

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

document.getElementById('insertButton').addEventListener('click', function() {
  //get the value from the input
  var inputValue = parseInt(document.getElementById("inputValue").value);
  var name=document.getElementById("inputName").value;

  if (!isNaN(inputValue) && inputValue >= 0) {
      if (!Blockly.Blocks[name]) {
          Blockly.Blocks[name] = {};
      }

      Blockly.Blocks[name].init = function() {
          this.appendDummyInput()
              .appendField(name);

          for (var i = 0; i < inputValue; i++) {
              this.appendValueInput(String(i + 1))
                  .setCheck(null)
                  .appendField("ar" + (i + 1));
          }

          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
      };

  } else {
      console.error("Valore non valido");
      return; 
  }
  var toolboxCategories = toolbox.contents[1].contents; // Control category


var indexToRemove = toolboxCategories.findIndex(block => block.type === name);

if (indexToRemove !== -1) {
    toolboxCategories.splice(indexToRemove, 1);
}

console.log(name);
toolboxCategories.unshift({
    "kind": "block",
    "type": name
});
  
  // Aggiornare il blocco nella toolbox
  ws.updateToolbox(toolbox);


  plutoGenerator.forBlock[name] = function(block, generator) {
    var args='';
    for (var i = 0; i < inputValue; i++) {
        var conditionCode = generator.valueToCode(block, String(i + 1), Order.ATOMIC);
        args+=conditionCode;

        if(i!=inputValue-1){
          args+=', ';
        }
        
    }
   
    return name +  ' ' + args;
  }
});

