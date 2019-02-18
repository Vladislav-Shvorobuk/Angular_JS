  <h1 align='center'> Implementation of my own AngularJS </h1>
  There is module which contains object with following methods:

directive - takes the name and function and registers (pushes them into directives);

compile - accepts a node,  checks for directives and applies everything one by one;

bootstrap - when calling this method, we initialize the start of our application - by clinging either
            to the node that was passed or to the node with the 'ng-app' attribute and then calling
            compile for all the nodes.

 <h3> Registered directives: </h3> 

ng-show <br>
ng-hide <br>
ng-bind <br>
ng-click <br>
ng-modelё <br>
ng-repeat <br>
ng-make-short <br>
ng-random-color <br>

 <h5> Use npm start for start application. <h5>