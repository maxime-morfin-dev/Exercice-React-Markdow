import './App.css';
import {Component} from "react";
import {sampleText} from "./sampleText";
import {marked} from "marked";

class App extends Component{
  state = {
    text: sampleText
  }

  handleChange = e => {
    let text = e.target.value
    this.setState({text})
  }

  renderText = text => {
    let __html = marked(text, {sanitize : true})
    return { __html }
  }

  componentDidMount() {
    let text = localStorage.getItem('text')
    if(text){
      this.setState({text})
    }else {
      this.setState({text : sampleText})
    }
  }

  componentDidUpdate() {
    let { text } = this.state
    localStorage.setItem('text', text)
  }

  render() {
    return <div className="container mt-4">
      <div className="row">
        <div className="col-sm-6">
          <textarea className="form-control" rows="35" value={this.state.text} onChange={this.handleChange} />
        </div>
        <div className="col-sm-6">
          <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
        </div>
      </div>
    </div>
  }
}

export default App;
