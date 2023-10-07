import { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QuoteCard.css'

class QuoteCard extends Component {
    state = {
        quote: "",
        author: "",
        twitterUrl: "",
    }

    componentDidMount() {
        this.getRandomQuote();
    }

    getRandomQuote() {
        axios
            .get("https://api.quotable.io/random")
            .then(response => {
                console.log(response.data)
                const quote = response.data.content
                const author = response.data.author
                const url = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote + "\" - " + author)}`
                this.setState({
                    quote,
                    author,
                    twitterUrl: url,
                });
                this.props.setColor();
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div id="quote-box" style={{ backgroundColor: this.props.bW }}>
                <div class="quote-text">
                    <span style={{ color: this.props.color }} id="text">{`"${this.state.quote}"`}</span>
                </div>
                <div class="quote-author">
                    <span id="author" style={{ color: this.props.color }}>{`- ${this.state.author}`}</span>
                </div>

                <div class="buttons">
                    <div class="icon" style={{ backgroundColor: this.props.color }}>
                        <a id="tweet-quote" title="Share this quote!" target="_top" href={this.state.twitterUrl}>
                            <FontAwesomeIcon style={{ color: this.props.bW }} icon={["fab", "x-twitter"]} />
                        </a>
                    </div>

                    <button id="new-quote" style={{ backgroundColor: this.props.color, color: this.props.bW }} class="button" onClick={this.getRandomQuote.bind(this)}>
                        New quote
                    </button>
                </div>
            </div >
        );
    }
};

export default QuoteCard