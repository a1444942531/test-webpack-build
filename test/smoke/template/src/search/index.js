'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { add } from '../helloworld'

import './search.less'
import img from './images/001.jpg'

class Search extends React.Component {
  render() {

    return <div className="search-text">
      HelloWorldasdasdasd你好世界{add(1, 3)}

      <img src={img} />
    </div>
  }
}

ReactDOM.render(
  <Search></Search>,
  document.getElementById('root')
)