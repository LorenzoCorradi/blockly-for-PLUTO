export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Functions",
      "custom": "PROCEDURE",
      "contents": [
        {
          "kind": "block",
          "type": "procedures_defnoreturn",
          "hidden": "true"
        },
      
      ]
    },
   
    {
      "kind": "category",
      "name": "Control",
      "colour": "210",
      
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          'kind': 'block',
          'type': 'wait'
        },
        {
          'kind': 'block',
          'type': 'custom'
        },
      ]
    },
    {
      "kind": "category",
      "name": "Logic",
      "categorystyle": "logic_category",
      "contents": [
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Math",
      "categorystyle": "math_category",
      "contents": [
        {
          'kind': 'block',
          'type': 'math_number'
        }
      ]
    }
  ]
}




