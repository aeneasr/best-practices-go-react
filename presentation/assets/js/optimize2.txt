const InputField = ({ onChange, value }) => (
  <input
    type="text"
    value={value}
    placeholder="Enter your name here"
    onChange={onChange}
  />
)

class OuterComponent extends Component {
  state = { greeting: '' }

  onChange = (key) => (e) => {
    this.setState({[key]: e.target.value})
  }

  render() {
    return (
      <div>
        Well, hello there {this.state.greeting || '...'}
        <br />
        <InputField onChange={this.onChange('greeting')} value={this.state.greeting} />
      </div>
    )
  }
}

render(
  <OuterComponent />,
  mountNode
)