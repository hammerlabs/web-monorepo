import _ from 'lodash'
import './style.css'

const simple = {
    component: function() {
        var element = document.createElement('div')
    
        element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
        element.classList.add('hello');
    
        return element
    }
}
export default simple
document.body.appendChild(simple.component())