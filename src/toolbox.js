export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
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




