(function() {
  class AngularJS {
    constructor() {
      this.directives = {};
    }

    directive(name, func) {
      if (this.directives[name]) {
        throw Error('This directive has already registered.');
      }
      this.directives[name] = func;
    }

    compile(node) {
      const attrs = node.attributes;
      const dirs = [];
      const otherAttrs = [];

      for (let i = 0; i < attrs.length; i++) {
        if ((/[ng-]/).test(attrs[i].name)) {
          const dir = this.directives[attrs[i].name];

          if (dir) {
            dirs.push(dir);
          }
        } else {
          otherAttrs.push(attrs[i]);
        }
      }

      dirs.forEach(dir => dir(node, otherAttrs));
    }

    bootstrap(node) {
      const parentNode = node ? node : document.querySelector('[ng-app]');
      const childNodes = parentNode.querySelectorAll('*');
      this.compile(parentNode);
      childNodes.forEach(node => this.compile(node));
    }
  }

  /* eslint-disable no-console */
  function ngInit(el) {
    console.log('called directive ng-init on element', el);
  }

  function ngShow(el) {
    console.log('called directive ng-show on element', el);
  }

  function ngModel(el) {
    console.log('called directive ng-model on element', el);
  }

  function ngMakeShort(el) {
    console.log('called directive ng-make-short on element', el);
  }

  function ngBind(el) {
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