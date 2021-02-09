import propertiesFormTransformer from '../blocks/propertiesFormTransformer';
import propertiesGetterTransformer from '../blocks/propertiesGetterTransformer';
import defaultValueTransformer from '../blocks/defaultValueTransformer';

const schema = {
  schema: {
    properties: {
      type: 'object',
      additionalProperties: false,
      properties: {
        field: {
          type: 'object',
          description: 'description',
          docs: {
            displayType: 'yaml',
          },
        },
      },
    },
  },
};

test('yaml propertiesFormTransformer', () => {
  expect(propertiesFormTransformer(schema)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "block.properties.field",
        "layout": Object {
          "_global": "settings_input_layout",
        },
        "properties": Object {
          "autoSize": Object {
            "minRows": 2,
          },
          "label": Object {
            "align": "right",
            "extra": "description",
            "span": 8,
          },
          "placeholder": "Type YAML here",
          "size": "small",
          "title": "field",
        },
        "required": false,
        "type": "TextArea",
      },
    ]
  `);
});

test('yaml propertiesGetterTransformer', () => {
  expect(propertiesGetterTransformer(schema)).toMatchInlineSnapshot(`
    Object {
      "_object.assign": Array [
        Object {
          "_state": "block.properties",
        },
        Object {
          "field": Object {
            "_yaml.parse": Object {
              "_if_none": Array [
                Object {
                  "_state": "block.properties.field",
                },
                "",
              ],
            },
          },
        },
      ],
    }
  `);
});

test('yaml defaultValueTransformer', () => {
  expect(defaultValueTransformer(schema)).toMatchInlineSnapshot(`Object {}`);
  const schemaDV = {
    schema: {
      properties: {
        type: 'object',
        additionalProperties: false,
        properties: {
          field: {
            type: 'object',
            default: 'value',
            description: 'description',
            docs: {
              displayType: 'yaml',
            },
          },
        },
      },
    },
  };
  expect(defaultValueTransformer(schemaDV)).toMatchInlineSnapshot(`
    Object {
      "field": "value",
    }
  `);
});

const schemaNested = {
  schema: {
    properties: {
      type: 'object',
      additionalProperties: false,
      properties: {
        obj: {
          type: 'object',
          description: 'obj description',
          properties: {
            field: {
              type: 'object',
              description: 'field description',
              docs: {
                displayType: 'yaml',
              },
            },
          },
        },
      },
    },
  },
};

test('yaml schemaNested propertiesFormTransformer', () => {
  expect(propertiesFormTransformer(schemaNested)).toMatchInlineSnapshot(`
    Array [
      Object {
        "blocks": Array [
          Object {
            "id": "block.properties.obj.field",
            "layout": Object {
              "_global": "settings_input_layout",
            },
            "properties": Object {
              "autoSize": Object {
                "minRows": 2,
              },
              "label": Object {
                "align": "right",
                "extra": "field description",
                "span": 8,
              },
              "placeholder": "Type YAML here",
              "size": "small",
              "title": "field",
            },
            "required": false,
            "type": "TextArea",
          },
        ],
        "id": "block.properties.obj",
        "layout": Object {
          "contentGutter": 0,
        },
        "properties": Object {
          "bodyStyle": Object {
            "padding": 0,
          },
          "size": "small",
          "title": "obj:",
        },
        "type": "Card",
      },
    ]
  `);
});

test('yaml schemaNested propertiesGetterTransformer', () => {
  expect(propertiesGetterTransformer(schemaNested)).toMatchInlineSnapshot(`
    Object {
      "_object.assign": Array [
        Object {
          "_state": "block.properties",
        },
        Object {
          "obj": Object {
            "_object.assign": Array [
              Object {
                "_state": "block.properties.obj",
              },
              Object {
                "field": Object {
                  "_yaml.parse": Object {
                    "_if_none": Array [
                      Object {
                        "_state": "block.properties.obj.field",
                      },
                      "",
                    ],
                  },
                },
              },
            ],
          },
        },
      ],
    }
  `);
});

test('yaml schemaNested defaultValueTransformer', () => {
  expect(defaultValueTransformer(schemaNested)).toMatchInlineSnapshot(`Object {}`);
  const schemaDV = {
    schema: {
      properties: {
        type: 'object',
        additionalProperties: false,
        properties: {
          obj: {
            type: 'object',
            description: 'obj description',
            properties: {
              field: {
                type: 'object',
                default: { a: 1 },
                description: 'field description',
                docs: {
                  displayType: 'yaml',
                },
              },
            },
          },
        },
      },
    },
  };
  expect(defaultValueTransformer(schemaDV)).toMatchInlineSnapshot(`
    Object {
      "obj": Object {
        "field": Object {
          "a": 1,
        },
      },
    }
  `);
});

const schemaYamlInArray = {
  schema: {
    properties: {
      type: 'object',
      additionalProperties: false,
      properties: {
        arr: {
          type: 'array',
          description: 'arr description',
          items: {
            type: 'object',
            description: 'yaml description',
            docs: {
              displayType: 'yaml',
            },
          },
        },
      },
    },
  },
};

test('yaml schemaYamlInArray propertiesFormTransformer', () => {
  expect(propertiesFormTransformer(schemaYamlInArray)).toMatchInlineSnapshot(`
    Array [
      Object {
        "blocks": Array [
          Object {
            "id": "block.properties.arr.$",
            "layout": Object {
              "_global": "settings_input_layout",
            },
            "properties": Object {
              "autoSize": Object {
                "minRows": 2,
              },
              "label": Object {
                "disabled": true,
              },
              "placeholder": "Type YAML here",
              "size": "small",
              "title": "$",
            },
            "required": false,
            "type": "TextArea",
          },
        ],
        "id": "block.properties.arr",
        "layout": Object {
          "contentGutter": 0,
        },
        "properties": Object {
          "itemStyle": Object {
            "padding": 0,
          },
          "size": "small",
          "title": "arr:",
        },
        "type": "ControlledList",
      },
    ]
  `);
});

test('yaml schemaYamlInArray propertiesGetterTransformer', () => {
  expect(propertiesGetterTransformer(schemaYamlInArray)).toMatchInlineSnapshot(`
    Object {
      "_object.assign": Array [
        Object {
          "_state": "block.properties",
        },
        Object {
          "arr": Object {
            "_array.map": Object {
              "callback": Object {
                "_function": Object {
                  "__yaml.parse": Object {
                    "__if_none": Array [
                      Object {
                        "__args": "0",
                      },
                      "",
                    ],
                  },
                },
              },
              "on": Object {
                "_if_none": Array [
                  Object {
                    "_state": "block.properties.arr",
                  },
                  Array [],
                ],
              },
            },
          },
        },
      ],
    }
  `);
});

test('yaml schemaYamlInArray defaultValueTransformer', () => {
  expect(defaultValueTransformer(schemaYamlInArray)).toMatchInlineSnapshot(`
    Object {
      "arr": Array [],
    }
  `);
  const schemaYamlInArrayDV = {
    schema: {
      properties: {
        type: 'object',
        additionalProperties: false,
        properties: {
          arr: {
            type: 'array',
            default: [{ a: 1 }],
            description: 'arr description',
            items: {
              type: 'object',
              description: 'yaml description',
              docs: {
                displayType: 'yaml',
              },
            },
          },
        },
      },
    },
  };
  expect(defaultValueTransformer(schemaYamlInArrayDV)).toMatchInlineSnapshot(`
    Object {
      "arr": Array [
        Object {
          "a": 1,
        },
      ],
    }
  `);
});

const schemaYamlInObjectInArray = {
  schema: {
    properties: {
      type: 'object',
      additionalProperties: false,
      properties: {
        arr: {
          type: 'array',
          description: 'arr description',
          items: {
            type: 'object',
            description: 'obj description',
            properties: {
              yaml: {
                type: 'object',
                description: 'yaml description',
                docs: {
                  displayType: 'yaml',
                },
              },
            },
          },
        },
      },
    },
  },
};

test('yaml schemaYamlInObjectInArray propertiesFormTransformer', () => {
  expect(propertiesFormTransformer(schemaYamlInObjectInArray)).toMatchInlineSnapshot(`
    Array [
      Object {
        "blocks": Array [
          Object {
            "blocks": Array [
              Object {
                "id": "block.properties.arr.$.yaml",
                "layout": Object {
                  "_global": "settings_input_layout",
                },
                "properties": Object {
                  "autoSize": Object {
                    "minRows": 2,
                  },
                  "label": Object {
                    "align": "right",
                    "extra": "yaml description",
                    "span": 8,
                  },
                  "placeholder": "Type YAML here",
                  "size": "small",
                  "title": "yaml",
                },
                "required": false,
                "type": "TextArea",
              },
            ],
            "id": "block.properties.arr.$",
            "layout": Object {
              "contentGutter": 0,
            },
            "properties": Object {
              "bodyStyle": Object {
                "padding": 0,
              },
              "size": "small",
              "title": false,
            },
            "type": "Card",
          },
        ],
        "id": "block.properties.arr",
        "layout": Object {
          "contentGutter": 0,
        },
        "properties": Object {
          "itemStyle": Object {
            "padding": 0,
          },
          "size": "small",
          "title": "arr:",
        },
        "type": "ControlledList",
      },
    ]
  `);
});

test('yaml schemaYamlInObjectInArray propertiesGetterTransformer', () => {
  expect(propertiesGetterTransformer(schemaYamlInObjectInArray)).toMatchInlineSnapshot(`
    Object {
      "_object.assign": Array [
        Object {
          "_state": "block.properties",
        },
        Object {
          "arr": Object {
            "_array.map": Object {
              "callback": Object {
                "_function": Object {
                  "__object.assign": Array [
                    Object {
                      "__args": "0",
                    },
                    Object {
                      "yaml": Object {
                        "__yaml.parse": Object {
                          "__if_none": Array [
                            Object {
                              "__args": "0.yaml",
                            },
                            "",
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              "on": Object {
                "_if_none": Array [
                  Object {
                    "_state": "block.properties.arr",
                  },
                  Array [],
                ],
              },
            },
          },
        },
      ],
    }
  `);
});

test('yaml schemaYamlInObjectInArray defaultValueTransformer', () => {
  expect(defaultValueTransformer(schemaYamlInObjectInArray)).toMatchInlineSnapshot(`
    Object {
      "arr": Array [],
    }
  `);
  const schemaYamlInObjectInArrayDV = {
    schema: {
      properties: {
        type: 'object',
        additionalProperties: false,
        properties: {
          arr: {
            type: 'array',
            description: 'arr description',
            default: [{ yaml: { b: 1 } }],
            items: {
              type: 'object',
              description: 'obj description',
              properties: {
                yaml: {
                  type: 'object',
                  description: 'yaml description',
                  docs: {
                    displayType: 'yaml',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  expect(defaultValueTransformer(schemaYamlInObjectInArrayDV)).toMatchInlineSnapshot(`
    Object {
      "arr": Array [
        Object {
          "yaml": Object {
            "b": 1,
          },
        },
      ],
    }
  `);
});