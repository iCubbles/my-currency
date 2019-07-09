const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.')
  return {
    description: "A simple compound component.",
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
      { artifactId: `${webpackageName}-converter` },
      { webpackageId: "com.incowia.lib.chart-library@1.0.0", artifactId: "bar-chart" }
    ],
    slots: [
      { slotId: "outerMessage", type: "string", direction: ["input", "output"] }
    ],
    // member declarations
    members: [
      { artifactId: `${webpackageName}-converter`, memberId: "currencyConverter" },
      { artifactId: 'bar-chart', memberId: "chart" }
    ],
    // connection declarations
    connections: [
      {
        connectionId: 'data-connection',
        source: {
          memberIdRef: 'currencyConverter',
          slot: 'conversionArray'
        },
        destination: {
          memberIdRef: 'chart',
          slot: 'dataColumns'
        }
      }
    ]
  };
};
