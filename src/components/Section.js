export class Section {
  constructor({items , renderer} , selector) {
    this._item = items;
    this._renderer = renderer;
    this.selector = selector
  }
  renderItems () {
    this._item.forEach((item) => {
      this._renderer(item)
    });
  }
  addItem(DOMelement) {
    this._renderer(DOMelement)
  }
}