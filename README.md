                          Implementation of my own AngularJS
  The module in which the object is exported with the following methods:

directive - takes the name and function and registers (pushes itself into an array of directives);

compile - accepts a node,  checks for directives and applies everything one by one;

bootstrap - when calling this method, we initialize the start of our application - by clinging either
            to the node that was passed or to the node with the 'ng-app' attribute and then calling
            compile for all the nodes.

    Registered directives:

ng-show
ng-hide
ng-bind 
ng-click
ng-modelё
ng-repeat
ng-make-short 
ng-random-color

Use npm start for start application.