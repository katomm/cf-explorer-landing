import React from "react";

const screens = Object.freeze({
  transaction: 'transaction',
  epoch: 'epoch',
  block: 'block',
})

class DeepLinkResolver {

  constructor(path, query) {
    this.mode = path.split("/").reverse()[0].replace('.html','');
    this.query = query;
  }

  getCExplorerLink (baseLink) {
    var link = baseLink;
    switch (this.mode) {
      case "epoch":
        link += `epoch/${this.getValue()}`;
        break;
      case "block":
        link += `block/${this.getValue()}`;
        break;
      case "transaction":
        link += `tx/${this.getValue()}`;
        break;
    }
    return link;
  }

  getCardanoScanLink(baseLink) {
    var link = baseLink;
    switch (this.mode) {
      case "epoch":
        link += `epoch/${this.getValue()}`;
        break;
      case "block":
        link += `search?filter=blocks&value=/${this.getValue()}`;
        break;
      case "transaction":
        link += `transaction/${this.getValue()}`;
        break;
    }
    return link;
  }

  getCFBetaExplorerLink(baseLink) {
    var link = baseLink;
    switch (this.mode) {
      case "epoch":
        link += `epoch/${this.getValue()}`;
        break;
      case "block":
        link += `block/${this.getValue()}`;
        break;
      case "transaction":
        link += `tx/${this.getValue()}`;
        break;
    }
    return link;
  }

  getValue() {
    switch (this.mode) {
      case "epoch":
        return this.query.get("number");
      case "block":
        return this.query.get("id");
      case "transaction":
        return this.query.get("id");
    }
  }
}

export default DeepLinkResolver;