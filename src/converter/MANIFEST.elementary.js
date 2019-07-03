const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.')
  return {
    description: "Elementary that uses an API to Convert currencies",
    slots: [
      {
        slotId: 'base',
        description: 'Code of the currency to be converted',
        type: 'string',
        direction: [
          'input'
        ],
        value: 'EUR'
      },
      {
        slotId: 'foreignCurrency',
        description: 'Code of the target currency for the conversion',
        type: 'string',
        direction: [
          'input'
        ],
        value: 'USD'
      },
      {
        slotId: 'date',
        description: 'Date to be used for the conversion',
        type: 'string',
        direction: [
          'input'
        ]
      },
      {
        slotId: 'conversion',
        description: 'Result of the conversion',
        type: 'number',
        direction: [
          'output'
        ]
      },
      {
        slotId: "conversionArray",
        type: "array",
        direction: [
          "output"
        ]
      }
    ],
    resources: [
      "element.html"
    ],
    runnables: [
      {
        "name": "SHOWROOM",
        "path": "/SHOWROOM.html"
      },
      {
        "name": "DOCS",
        "path": "/DOCS.html"
      }
    ],
    dependencies: [
      { webpackageId: "cubx.core.rte@3.0.0", artifactId: "cubxcomponent" }
    ]
  };
};
