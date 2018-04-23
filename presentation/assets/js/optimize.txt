class InputField extends Component {
  state = { value: '' }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        placeholder="Enter your name here"
        onChange={(e) => {
          this.setState({ value: e.target.value })
          if (this.props.onChange) {
            this.props.onChange(e.target.value)
          }
        }}
      />
    )
  }
}

class OuterComponent extends Component {
  state = { greeting: '' }

  render() {
    return (
      <div>
        Well, hello there {this.state.greeting || '...'}
        <br />
        <InputField onChange={(value) => this.setState({ greeting: value })} />
      </div>
    )
  }
}

render(
  <OuterComponent />,
  mountNode
)