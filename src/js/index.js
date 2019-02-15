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

  /* eslint-disable no-eval*/
  const myAngular = new AngularJS();

  myAngular.directive('ng-init', (scope, node, attrs) => {
    scope[name] = eval(node.getAttribute('ng-init'));
    scope.$apply();
  });

  myAngular.directive('ng-show', (scope, node, attrs) => {
    function hide() {
      const data = node.getAttribute('ng-show');
      node.style.display = eval(data) ? 'block' : 'none';
    }
    hide();
    scope.$watch(hide);
  });

  myAngular.directive('ng-hide', (scope, node, attrs) => {
    function hide() {
      const data = node.getAttribute('ng-hide');
      node.style.display = eval(data) ? 'none' : 'block';
    }
    hide();
    scope.$watch(hide);
  });

  myAngular.directive('ng-bind', (scope, node, attrs) => {
    function bind() {
      const data = node.getAttribute('ng-bind');
      node.innerHTML = eval(data);
    }
    bind();
    scope.$watch(bind);
  });

  myAngular.directive('ng-click', (scope, node, attrs) => {
    node.addEventListener('click', () => {
      eval(node.getAttribute('ng-click'));
      scope.$apply();
    });
  });

  myAngular.directive('ng-model', (scope, node, attrs) => {
    node.addEventListener('input', () => {
      eval(`${node.getAttribute('ng-model')} = "${node.value}"`);
      scope.$apply();
    });
  });

  myAngular.directive('ng-repeat', (scope, node, attrs) => {
    const parentEl = node.parentNode;

    function repeat() {
      const data = node.getAttribute('ng-repeat');
      const str = eval(data.split(' ')[2]);
      const nodeList = document.querySelectorAll('[ng-repeat]');

      for (const char of str) {
        const clonedEl = node.cloneNode(false);
        clonedEl.innerText = char;
        parentEl.appendChild(clonedEl);
      }
      nodeList.forEach(el => el.remove());
    }
    repeat();
    scope.$watch(repeat);
  });

  myAngular.directive('ng-make-short', (scope, node, attrs) => {
    function makeShort() {
      const length = node.getAttribute('length');
      const text = node.innerText;
      node.innerText = `${text.slice(0, length)}...`;
    }
    makeShort();
    scope.$watch(makeShort);
  });

  myAngular.directive('ng-random-color', (scope, node, otherAttrs) => {
    node.addEventListener('input', () => {
      const createColor = () => Math.random() * 255;
      node.style.background = `rgb(${createColor()}, ${createColor()}, ${createColor()})`;
    });
  });

  myAngular.bootstrap();
  window.angular = myAngular;
}());