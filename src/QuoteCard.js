import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QuoteCard.css'

class QuoteCard extends React.Component {
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
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div id="quote-box">
                <div class="quote-text">
                    <span id="text">{this.state.quote}</span>
                </div>
                <div class="quote-author">
                    <span id="author">{this.state.author}</span>
                </div>

                <div class="buttons">
                    <a id="tweet-quote" title="Share this quote!" target="_top" href={this.state.twitterUrl}>
                        <FontAwesomeIcon class="icon" icon={["fab", "x-twitter"]} />
                    </a>
                    <button id="new-quote" class="button" onClick={this.getRandomQuote.bind(this)}>
                        New quote
                    </button>
                </div>
            </div>
        );
    }
};

export default QuoteCard