import _ from 'lodash';
import SimpleLib from 'simple-library'
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  console.log(SimpleLib);
  element.innerHTML = SimpleLib;

  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
