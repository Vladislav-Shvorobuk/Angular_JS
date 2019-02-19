(function() {
  const rootScope = window;
  const watchers = [];

  rootScope.$watch = (name, watcher) => watchers.push({ name, watcher });
  rootScope.$apply = () => watchers.forEach(({ watcher }) => watcher());

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
      const otherAttrs = {};

      for (let i = 0; i < attrs.length; i++) {
        const dir = this.directives[attrs[i].name];

        if (dir) {
          dirs.push(dir);
        }

        if (!(/ng-/).test(attrs[i].name)) {
          otherAttrs[attrs[i].name] = attrs[i].nodeValue;
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
    eval(node.getAttribute('ng-init'));
  });

  myAngular.directive('ng-show', (scope, node, attrs) => {
    const data = node.getAttribute('ng-show');
    const show = () => (node.style.display = eval(data) ? 'block' : 'none');
    show();
    scope.$watch(eval(data), show);
  });

  myAngular.directive('ng-hide', (scope, node, attrs) => {
    const data = node.getAttribute('ng-hide');
    const hide = () => (node.style.display = eval(data) ? 'none' : 'block');
    hide();
    scope.$watch(eval(data), hide);
  });

  myAngular.directive('ng-bind', (scope, node, attrs) => {
    const data = node.getAttribute('ng-bind');
    const bind = () => (node.innerText = eval(data));
    bind();
    scope.$watch(data, bind);
  });

  myAngular.directive('ng-click', (scope, node, attrs) => {
    node.addEventListener('click', () => {
      eval(node.getAttribute('ng-click'));
      scope.$apply();
    });
  });

  myAngular.directive('ng-model', (scope, node, attrs) => {
    const data = node.getAttribute('ng-model');
    const setValue = () => (node.value = eval(`${data}`));

    node.addEventListener('input', () => {
      rootScope[data] = node.value;
      scope.$apply();
    });
    setValue();
    scope.$watch(data, setValue);
  });

  myAngular.directive('ng-repeat', (scope, node, attrs) => {
    const parentEl = node.parentNode;
    const data = node.getAttribute('ng-repeat').split(' ')[2];

    function repeat() {
      const strForReapet = eval(data);
      const nodeList = document.querySelectorAll('[ng-repeat]');

      for (const char of strForReapet) {
        const clonedEl = node.cloneNode(false);
        clonedEl.innerText = char;
        parentEl.appendChild(clonedEl);
      }
      nodeList.forEach(el => el.remove());
    }
    repeat();
    scope.$watch(eval(data), repeat);
  });

  myAngular.directive('ng-make-short', (scope, node, attrs) => {
    function makeShort() {
      const strLength = attrs.length || 20;
      const cutString = node.innerText.slice(0, strLength);
      node.innerText = `${cutString}...`;
    }
    makeShort();
    scope.$watch(attrs.length, makeShort);
  });

  myAngular.directive('ng-random-color', (scope, node, attrs) => {
    node.addEventListener('click', () => {
      const createColor = () => Math.random() * 255;
      node.style.background = `rgb(${createColor()}, ${createColor()}, ${createColor()})`;
    });
  });

  myAngular.bootstrap();
  window.angular = myAngular;
}());