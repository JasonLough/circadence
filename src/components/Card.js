import React from 'react';


export default class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showBack: true,
            value: this.props.data.value,
            inPlay: true,
            selected: false,
            selectionCB: this.props.selectionCB
        }
    }

    /*
        reset() is passed to the parent so that the parent can reset this card
    */
    reset(inPlay = true) {

        setTimeout(() => {
            this.setState({
                selected: false,
                inPlay: inPlay,
                showBack: true
            })
        }, 1000)

    }

    /*
        remove() is passed to the parent so that the parent can remove this card
    */
    remove() {
        setTimeout(() => {
            this.setState({
                inPlay: false
            })
        }, 500)
    }

    /*
        Each <Card> has this on its onClick handler.
        Once clicked, it informs its parent of its value, reset(), and remove()
    */
    click() {
        if (this.state.showBack) { //we only care about clicks on a downward facing card

            this.setState({
                showBack: false
            })

            //call back the parent, informing it of:
            //  the value of the <Card> 
            //  the <Card>s reset() function
            //  the <Card>s remove() function
            this.props.selectionCB(this.props.data.value, this.reset.bind(this), this.remove.bind(this))
        }
    }

    render() {

        let imgSrc = this.state.showBack ?
            'assets/playing-card-back.png' :
            `assets/${this.props.data.value.toLowerCase()}_of_${this.props.data.suit.toLowerCase()}.png`;

        if (!this.state.inPlay) {
            imgSrc = ''
        }

        return (
            <div className='card' onClick={this.click.bind(this)}>
                <div className="card-img" style={{ backgroundImage: `url(${imgSrc})` }}></div>
            </div>
        )
    }
}