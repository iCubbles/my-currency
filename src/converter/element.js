(function() {
  "use strict";

  CubxComponent({
    is: "/* @echo elementName */",

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function() {},

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function() {},

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    connected: function() {},

    /**
     * Manipulate an element’s local DOM when the element is dettached to the document.
     */
    disconnected: function() {},

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function() {
      this.$.base.setAttribute("value", this.getBase());
      this.$.foreign.setAttribute("value", this.getForeignCurrency());
      let today = new Date();
      this.setDate(today.toISOString().substr(0, 10));
      this.$.date.setAttribute("value", this.getDate());
      this.$.date.setAttribute("max", this.getDate());
      today.setMonth(today.getMonth() - 12);
      this.$.date.setAttribute("min", today.toISOString().substr(0, 10));

      this.sendQuery();

      this.$.convertBtn.addEventListener(
        "click",
        function() {
          this.getFormValuesAndSendQuery();
        }.bind(this)
      );
      this.$.convertBtn.removeAttribute("disabled");
    },

    /**
     * Observe the 'base' slot to update the view of this component and then
     * send the request to the fixer-io api
     * @param {string} newValue - new value of the slot
     */
    modelBaseChanged: function(newValue) {
      // update the view
      this.$.base.setAttribute("value", newValue);
    },
    /**
     * Observe the 'date' slot to update the view of this component and then
     * send the request to the fixer-io api
     * @param {string} newValue - new value of the slot ('yyyy-mm-dd' format)
     */
    modelDateChanged: function(newValue) {
      // update the view
      this.$.date.setAttribute("value", newValue);
    },
    /**
     * Observe the slot 'foreignCurrency' to update the view of this component
     * and then send the request to the fixer-io api.
     * @param {string} newValue - new value of the slot
     */
    modelForeignCurrencyChanged: function(newValue) {
      // update the view
      this.$.foreign.setAttribute("value", newValue);
    },
    /**
     * Observe the slot 'conversion' to update the view of this component
     * @param {string} newValue - new value of the slot
     */
    modelConversionChanged: function(newValue) {
      let resultText;
      if (newValue) {
        // update the view
        resultText = `1 ${this.getBase()} -> <b>${newValue}</b> ${this.getForeignCurrency()} on ${this.getDate()}`
      } else {
        resultText = 'Invalid inputs.'
      }
      this.$.result.innerHTML = resultText;
    },
    /**
     * Update the Component-Model and then send the request
     * to the fixer-io api.
     * @param event
     */
    getFormValuesAndSendQuery: function() {
      // Update the Cubbles component model slots the setters
      this.setBase(this.$.base.value);
      this.setDate(this.$.date.value);
      this.setForeignCurrency(this.$.foreign.value);

      this.sendQuery();
    },

    /**
     * Send the request a to the fixer-io api.
     */
    sendQuery: function() {
      // Makes sure all slots are defined
      if (this.getBase() && this.getForeignCurrency()) {
        var baseUrl = "https://api.exchangeratesapi.io";
        var queryUrl = `${baseUrl}/${this.getDate()}?base=${this.getBase()}&symbols=${this.getForeignCurrency()}`;
        var self = this;

        function processRespond(data) {
          var converted;
          if (data) {
            // Update the Cubbles component model slots using the setters
            converted = data.rates[self.getForeignCurrency()];
          }
          self.setConversion(converted);
          if (converted) {
            self.setConversionArray([
              [self.getBase(), 1],
              [self.getForeignCurrency(), converted]
            ]);
          } else {
            self.setConversionArray([]);
            }
        }

        this.makeRequest(queryUrl, processRespond);
      }
    },

    /**
     * Make the ajax request
     */
    makeRequest: function(queryUrl, processRespond) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(xhttp.responseText);
          processRespond(data);
        } else {
          processRespond();
        }
      };
      xhttp.open("GET", queryUrl, true);
      xhttp.send();
    }
  });
})();
