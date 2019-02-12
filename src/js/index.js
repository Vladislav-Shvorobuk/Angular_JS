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


  function ngInit(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-init on element', el);
  }

  function ngShow(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-show on element', el);
  }

  function ngModel(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-model on element', el);
  }

  function ngMakeShort(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-make-short on element', el);
  }

  function ngBind(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-bind on element', el);
  }

  const myAngular = new AngularJS();
  myAngular.directive('ng-init', ngInit);
  myAngular.directive('ng-show', ngShow);
  myAngular.directive('ng-model', ngModel);
  myAngular.directive('ng-make-short', ngMakeShort);
  myAngular.directive('ng-bind', ngBind);
  myAngular.bootstrap();

  window.angular = myAngular;
}());