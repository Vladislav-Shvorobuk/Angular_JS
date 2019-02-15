(function() {
  const rootScope = window;
  const watchers = [];

  rootScope.$watch = watcher => watchers.push(watcher);
  rootScope.$apply = () => watchers.forEach(watcher => watcher());

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
        const dir = this.directives[attrs[i].name];

        if (dir) {
          dirs.push(dir);
        }

        if (!(/[ng-]/).test(attrs[i].name)) {
          otherAttrs.push(attrs[i]);
        }
      }
      dirs.forEach(dir => dir(rootScope, node, otherAttrs));
    }

    bootstrap(node) {
      const baseNode = node || document.querySelector('[ng-app]');
      const nodes = baseNode.querySelectorAll('*');
      this.compile(baseNode);
      nodes.forEach(node => this.compile(node));
    }
  }

  /* eslint-disable no-console, no-eval*/
  function ngInit(scope, node, attrs) {
    const data = eval(node.getAttribute('ng-init'));
    scope[name] = data;
    scope.$apply();
  }


  function ngShow(scope, node, attrs) {
    const data = node.getAttribute('ng-show');
    node.style.display = eval(data) ? 'block' : 'none';
    scope.$watch(() => (node.style.display = eval(data) ? 'block' : 'none'));
  }

  function ngHide(scope, node, attrs) {
    const data = node.getAttribute('ng-hide');
    node.style.display = eval(data) ? 'none' : 'block';
    scope.$watch(() => (node.style.display = eval(data) ? 'none' : 'block'));
  }

  function ngBind(scope, node, attrs) {
    const data = node.getAttribute('ng-bind');
    node.innerHTML = eval(data);
    scope.$watch(() => (node.innerHTML = eval(data)));
  }

  function ngClick(scope, node, attrs) {
    node.addEventListener('click', () => {
      const data = node.getAttribute('ng-click');
      eval(data);
      scope.$watch(() => eval(data));
      scope.$apply();
    });
  }

  function ngModel(scope, node, attrs) {
    node.addEventListener('input', () => {
      eval(`${node.getAttribute('ng-model')} = "${node.value}"`);
      scope.$apply();
    });
  }

  // function ngMakeShort(el) {
  //   console.log('called directive ng-make-short on element', el);
  // }

  const myAngular = new AngularJS();
  myAngular.directive('ng-init', ngInit);
  myAngular.directive('ng-show', ngShow);
  myAngular.directive('ng-hide', ngHide);
  myAngular.directive('ng-bind', ngBind);
  myAngular.directive('ng-click', ngClick);
  myAngular.directive('ng-model', ngModel);
  // myAngular.directive('ng-make-short', ngMakeShort);

  myAngular.bootstrap();

  window.watchers = watchers;
  window.angular = myAngular;
}());