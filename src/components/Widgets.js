import React from 'react';

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        console.log('props:')
        console.log(this.state)
        this.state = {
            guesses: this.props.guesses,
            matches: this.props.matches
        }
    }

    render() {

        return (
            <div className="widgets container">
            
                <div className="btn-shuffle" onClick={this.props.drawCards}>
                    Shuffle
                </div>

                <div className="col">
                    <div>Guesses</div>
                    <div>Right: {this.props.matches.length}</div>
                    <div>Wrong: {this.props.guesses - this.props.matches.length}</div>
                    <div>Total: {this.props.guesses}</div>
                </div>

                <div className="col">
                    <div>right / wrong ratio</div>
                    <div>
                        {
                            ( 
                                (this.props.matches.length) && (this.props.guesses) 
                            ) ? 
                                (this.props.matches.length / this.props.guesses).toFixed(3) :
                                '-'
                        }
                    </div>
                </div>

                <div class="col">
                    <div>Remaining pairs</div>
                    <div>{26 - this.props.matches.length}</div>
                </div>


            </div>
        )
    }
}