import _ from 'lodash'
import './style.css'

export default {
    component: function() {
        var element = document.createElement('div')
    
        element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
        element.classList.add('hello');
    
        return element
    }
}