import * as Blockly from 'blockly';
console.log(Blockly);
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([  {
  "type": "custom",
  "message0": "%1 ",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "custom block"
    },],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},{
  
  "type": "object",
  "message0": "{ %1 %2 }",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "MEMBERS"
    }
  ],
  "output": null,
  "colour": 230,
},
 {
    'type': 'controls_if',
    'message0': '%{BKY_CONTROLS_IF_MSG_IF} %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'IF0',
        'check': 'Boolean',
      },
    ],
    'message1': '%{BKY_CONTROLS_IF_MSG_THEN} %1',
    'args1': [
      {
        'type': 'input_statement',
        'name': 'DO0',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'helpUrl': '%{BKY_CONTROLS_IF_HELPURL}',
    'suppressPrefixSuffix': true,
    'mutator': 'controls_if_mutator',
    'extensions': ['controls_if_tooltip'],
  },
  {
    "type": "wait",
    "message0": "wait until %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    'type': 'text_join',
    'message0': 'eqweqw',
    'output': 'String',
    'style': 'text_blocks',
    'helpUrl': '%{BKY_TEXT_JOIN_HELPURL}',
    'tooltip': '%{BKY_TEXT_JOIN_TOOLTIP}',
    'mutator': 'text_join_mutator',
  },

{
  "type": "member",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "MEMBER_NAME",
      "text": ""
    },
    {
      "type": "field_label",
      "name": "COLON",
      "text": ":"
    },
    {
      "type": "input_value",
      "name": "MEMBER_VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
}]);


Blockly.Blocks['custommm'] = {
  init: function() {
    this.appendValueInput("test")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("test"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = '';
Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN = 'all inputs';
Blockly.Msg.VARIABLES_DEFAULT_NAME = 'itedasda';