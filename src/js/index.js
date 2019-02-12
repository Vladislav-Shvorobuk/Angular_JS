(function() {
  class AngularJS {
    constructor() {
      this.directives = [];
    }
    directive(name, func) {
      this.directive.push([name, func]);
    }
    compile() {
      // write code
    }
    bootstrap() {
      // write code
    }
  }

  window.angular = new AngularJS();
}());