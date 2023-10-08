import { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './QuoteCard.css';
import { Comment } from 'react-loader-spinner';
import { throttle } from 'lodash';

class QuoteCard extends Component {
    state = {
        quote: "You should always default your props.",
        author: "Ed Simmons",
        twitterUrl: "https://twitter.com/intent/tweet",
        isLoading: true,
    }

    componentDidMount() {
        this.getRandomQuote();
    }

    getRandomQuote = throttle(() => {
        this.setState({ isLoading: true });
        axios
            .get("https://api.quotable.io/random")
            .then(response => {
                console.log(response.data)
                setTimeout(() => {
                    const quote = response.data.content;
                    const author = response.data.author;
                    const url = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote + "\" - " + author)}`;
                    this.setState({
                        quote,
                        author,
                        twitterUrl: url,
                        isLoading: false,
                    });
                    this.props.setColor();
                }, 400);
            })
            .catch(error => {
                console.log(error)
            });
    }, 1000, { trailing: false });

    render() {
        let content;
        if (this.state.isLoading) {
            content =
                <Comment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color={this.props.bW}
                    backgroundColor={this.props.color}
                />
        } else {
            content =
                <div>
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
                </div>
        }
        return (
            <div id="quote-box" style={{ backgroundColor: this.props.bW, width: this.state.isLoading ? 'auto' : '50vw' }}>
                {content}
            </div >
        )
    }
};

export default QuoteCard