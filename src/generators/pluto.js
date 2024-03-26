const Blockly = require('blockly');
const plutoGenerator = new Blockly.Generator('JSON');
module.exports = { plutoGenerator};
const Order = {
    ATOMIC: 0,
  };


  plutoGenerator.forBlock['logic_null'] = function(block) {
    return ['null', Order.ATOMIC];
  };
  plutoGenerator.forBlock['testtt'] = function(block) {
    return '';
  };
  plutoGenerator.forBlock['procedures_defnoreturn'] = function(block) {
    return "";
  };
  plutoGenerator.forBlock['procedures_callnoreturn'] = function(block) {
    const textValue = block.getFieldValue('NAME');
    console.log(textValue);
    return textValue;
  };

  plutoGenerator.forBlock['custom'] = function(block, generator) {
    var text_name = block.getFieldValue('NAME');
    var code = text_name;
    return code;
  };


  plutoGenerator.forBlock['custommm'] = function(block, generator) {
    var text_name = block.getFieldValue('NAME');
    var code = text_name;
    return code;
  };


  plutoGenerator.forBlock['text_join'] = function(block, generator) {
    
    return '';
  };

  plutoGenerator.forBlock['text'] = function(block) {
    const textValue = block.getFieldValue('TEXT');
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
  };


  plutoGenerator.forBlock['math_number'] = function(block) {
    const code = String(block.getFieldValue('NUM'));
    return [code, Order.ATOMIC];
  };



  plutoGenerator.forBlock['logic_boolean'] = function(block) {
    const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
    return [code, Order.ATOMIC];
  };


  plutoGenerator.forBlock['member'] = function(block, generator) {
    const name = block.getFieldValue('MEMBER_NAME');
    const value = generator.valueToCode(
        block, 'MEMBER_VALUE', Order.ATOMIC);
    const code = `"${name}": ${value}`;
    return code;
  };

  plutoGenerator.forBlock['wait'] = function(block, generator) {
    let conditionCode;
    conditionCode = generator.valueToCode(block, 'NAME', Order.ATOMIC) || 'False';
    const code = 'wait until ' + conditionCode;
    return code; 
  };

  plutoGenerator.forBlock['logic_compare'] = function(block, generator) {
    // Comparison operator.
    const OPERATORS =
    {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='};
const operator = OPERATORS[block.getFieldValue('OP')];
    const order = Order.ATOMIC;
    const argument0 = generator.valueToCode(block, 'A', order) || '0';
    const argument1 = generator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  };
  
  plutoGenerator.forBlock['lists_create_with'] = function(block, generator) {
    const values = [];
    for (let i = 0; i < block.itemCount_; i++) {
      const valueCode = generator.valueToCode(block, 'ADD' + i,
          Order.ATOMIC);
      if (valueCode) {
        values.push(valueCode);
      }
    }
    const valueString = values.join(',\n');
    const indentedValueString =
        generator.prefixLines(valueString, generator.INDENT);
    const codeString = '[\n' + indentedValueString + '\n]';
    return [codeString, Order.ATOMIC];
  };

  plutoGenerator.forBlock['object'] = function(block, generator) {
    const statementMembers =
        generator.statementToCode(block, 'MEMBERS');
    const code = '{\n' + statementMembers + '\n}';
    return [code, Order.ATOMIC];
  };

  plutoGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + '\n' + plutoGenerator.blockToCode(nextBlock);
    }
    return code;
  };


  plutoGenerator.forBlock['controls_if'] = function(block, generator) {
  // If/elseif/else condition.
    let n = 0;
    let code = '',
      branchCode,
      conditionCode;

    console.log(generator.STATEMENT_PREFIX);
    if (generator.STATEMENT_PREFIX) {
      // Automatic prefix insertion is switched off for this block.  Add manually.
      //code += generator.injectId(generator.STATEMENT_PREFIX, block);
    }
    do {
      conditionCode = generator.valueToCode(block, 'IF' + n, Order.ATOMIC) || 'False';
      branchCode = generator.statementToCode(block, 'DO' + n) || generator.PASS;
      if (generator.STATEMENT_SUFFIX) {
        branchCode =
          generator.prefixLines(
            generator.injectId(generator.STATEMENT_SUFFIX, block),
            generator.INDENT,
          ) + branchCode;
      }
      code += (n === 0 ? 'if ' : 'elif ') + conditionCode + ' then\n' + branchCode + '\n';
      n++;
    } while (block.getInput('IF' + n));
  
    if (block.getInput('ELSE') || generator.STATEMENT_SUFFIX) {
      branchCode = generator.statementToCode(block, 'ELSE') || generator.PASS;
      if (generator.STATEMENT_SUFFIX) {
        branchCode =
          generator.prefixLines(
            generator.injectId(generator.STATEMENT_SUFFIX, block),
            generator.INDENT,
          ) + branchCode;
      }
      code += 'else\n' + branchCode + '\n';
    }
    code += 'end if;'
    console.log(code);
    return code;
  };


  plutoGenerator.forBlock['logic_operation'] = function(block, generator) {
    // Operations 'and', 'or'.
    const operator = block.getFieldValue('OP');
    const order = Order.ATOMIC;
    const argument0 = generator.valueToCode(block, 'A', order).toUpperCase() || 'FALSE';    
    const argument1 = generator.valueToCode(block, 'B', order).toUpperCase() || 'FALSE';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];

  }