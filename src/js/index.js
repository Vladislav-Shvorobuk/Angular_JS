(function() {
  class AngularJS {
    constructor() {
      this.directives = {};
      this.watchers = [];
      this.rootScope = window;

      this.rootScope.$watch = (name, watcher) => {
        this.watchers.push({ name, watcher });
      };

      this.rootScope.$apply = () => {
        this.watchers.forEach(({ watcher }) => watcher());
      };
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
      dirs.forEach(dir => dir(this.rootScope, node, otherAttrs, 5));
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
    scope.$watch = (data, () => scope.data);
  }

  function ngShow(scope, node, attrs) {
    console.log('called directive ng-show on element', scope);
    console.log('called directive ng-show on element', node);
    console.log('called directive ng-show on element', attrs);
  }

  function ngHide(scope, node, attrs) {
    console.log('called directive ng-show on element', scope);
    console.log('called directive ng-show on element', node);
    console.log('called directive ng-show on element', attrs);
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
  // myAngular.directive('ng-model', ngModel);
  // myAngular.directive('ng-make-short', ngMakeShort);
  // myAngular.directive('ng-bind', ngBind);
  myAngular.bootstrap();

  window.angular = myAngular;
}());