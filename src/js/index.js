(function() {
  class AngularJS {
    constructor() {
      this.directives = {};
    }

    directive(name, func) {
      this.directives[name] = func;
    }

    compile(nodeEl) {
      const attrs = nodeEl.attributes;
      const nodeDirectives = {};

      for (let i = 0; i < attrs.length; i++) {
        if ((/[ng-]/).test(attrs[i].name)) {
          nodeDirectives[attrs[i].name] = attrs[i].value;
        }
      }

      for (const directive in nodeDirectives) {
        const dir = this.directives[directive];

        if (dir) {
          dir(nodeEl);
        }
      }
    }

    bootstrap(node = '[ng-app]') {
      const parentNode = document.querySelector(node);
      const childNodes = parentNode.querySelectorAll('*');
      this.compile(parentNode);

      for (let i = 0; i < childNodes.length; i++) {
        this.compile(childNodes[i]);
      }
    }
  }


  function test(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-show on element', el);
  }

  const myAngular = new AngularJS();
  myAngular.directive('ng-init', test);
  myAngular.directive('ng-show', test);
  myAngular.directive('ng-model', test);
  myAngular.directive('ng-make-short', test);
  myAngular.directive('ng-bind', test);
  myAngular.bootstrap();

  window.angular = myAngular;
}());