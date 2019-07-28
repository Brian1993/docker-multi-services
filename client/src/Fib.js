import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
  state = {
    seenIndexs: [],
    values: {},
    index: ''
  }

  componentDidMount () {
    this.fetchValues()
    this.fetchIndexes()
  }

  async fetchValue() {
    const values = await axios.get('/api/values/current')
    this.setState({ values: values.data })
  }

  async fetchIndexes() {
    const seenIndexs = await axios.get('./api/values/all')
    this.setState({
      seenIndexs: seenIndexs.data
    })
  }

  renderValues () {
    const entries = []
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[keys]}
        </div>
      )
    }

    return entries
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('/api/values', {
      index: this.state.index
    })

    this.setState({ index: '' })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index: </label>
          <input 
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexs I have seen:</h3>
        {
          this.state.seenIndexs
            .map(({ number }) => number)
            .join(', ')
        }
        <h3>Calculated values: </h3>
        {
          this.renderValues()
        }
      </div>
    )
  }
}

export default Fib
