import { Component } from 'react';
import './App.css';
import QuoteCard from './QuoteCard';

class App extends Component {
  state = {
    color: "rgb(40, 44, 52)",
    bW: "#ffffff",
  }

  setColor() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    const l = this.calculateLuminance(r, g, b);
    console.log("luminance: ", l, l > 0.179 ? "black" : "white");
    const c = l > 0.179 ? "#000000" : "#ffffff";
    if (c !== this.state.bW) {
      this.setState({
        color: `rgb(${r},${g},${b})`,
        bW: c,
      });
    } else {
      this.setState({
        color: `rgb(${r},${g},${b})`,
      });
    }
  }

  calculateLuminance(r, g, b) {
    let bg = [r, g, b];
    let lu = [];
    bg.forEach(c => {
      let i = c / 255.0;
      if (i <= 0.04045) {
        i = i / 12.92
      }
      else {
        i = ((i + 0.055) / 1.055) ** 2.4;
      }
      lu.push(i);
    });
    return (0.2126 * lu[0]) + (0.7152 * lu[1]) + (0.0722 * lu[2]);
  }

  render() {
    return (
      <div style={{ backgroundColor: this.state.color }} className="App">
        <QuoteCard setColor={this.setColor.bind(this)} color={this.state.color} bW={this.state.bW} />
      </div>
    );
  }
}

export default App;
