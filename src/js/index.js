(function() {
  class AngularJS {
    constructor() {
      this.directives = {};
      this.watchers = [];
      this.rootScope = window;

      // this.rootScope.$watch = (name, watcher) => {
      //   this.watchers.push({ name, watcher });
      // };

      // this.rootScope.$apply = () => {
      //   this.watchers.forEach(({ watcher }) => watcher());
      // };
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
        const dir = this.directives[attrs[i].name];

        if (dir) {
          dirs.push(dir);
        }

        if (!(/[ng-]/).test(attrs[i].name)) {
          otherAttrs.push(attrs[i]);
        }
      }
      dirs.forEach(dir => dir(this.rootScope, node, otherAttrs));
    }

    bootstrap(node) {
      const baseNode = node || document.querySelector('[ng-app]');
      const nodes = baseNode.querySelectorAll('*');
      this.compile(baseNode);
      nodes.forEach(node => this.compile(node));
    }
  }

  /* eslint-disable no-console */
  /*  eslint-disable no-eval */
  function ngInit(scope, node, attrs) {
    const data = eval(node.getAttribute('ng-init'));
    scope.$watch = (name, () => {
      scope[name] = data;
    });
  }

  function ngShow(scope, node, attrs) {
    const data = eval(node.getAttribute('ng-show'));
    node.style.display = data ? 'block' : 'none';
  }

  function ngHide(scope, node, attrs) {
    const data = eval(node.getAttribute('ng-hide'));
    node.style.display = data ? 'none' : 'block';
  }

  function ngBind(scope, node, attrs) {
    node.innerHTML = eval(node.getAttribute('ng-bind'));
  }

  // function ngModel(el) {
  //   console.log('called directive ng-model on element', el);
  // }

  // function ngMakeShort(el) {
  //   console.log('called directive ng-make-short on element', el);
  // }

  // function ngBind(el) {
  //   console.log('called directive ng-bind on element', el);
  // }

  const myAngular = new AngularJS();
  myAngular.directive('ng-init', ngInit);
  myAngular.directive('ng-show', ngShow);
  myAngular.directive('ng-hide', ngHide);
  myAngular.directive('ng-bind', ngBind);
  // myAngular.directive('ng-model', ngModel);
  // myAngular.directive('ng-make-short', ngMakeShort);

  myAngular.bootstrap();

  window.angular = myAngular;
}());