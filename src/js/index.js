(function() {
  class AngularJS {
    constructor() {
      this.directives = {};
    }
    directive(name, func) {
      this.directive[name] = func;
    }
    compile(node) {
      const nodeEl = document.querySelector(node);
      const attrs = nodeEl.attributes;
      const nodeDirectives = {};

      for (let i = 0; i < attrs.length; i++) {
        if ((/[ng-]/).test(attrs[i].name)) {
          nodeDirectives[attrs[i].name] = attrs[i].value;
        }
      }

      for (const dir in nodeDirectives) {
        this.directives[dir.name]();
      }
    }
    bootstrap() {
      const appNode = document.querySelector('[ng-app]');
      const [children] = appNode.children;

      for (let i = 0; i < children.length; i++) {
        this.compile(children[i]);
      }
    }
  }

  window.angular = new AngularJS();
}());