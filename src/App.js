import React from 'react';
import './App.css';
import Card from './components/Card.js';
import './components/card.css';
import Widgets from './components/Widgets.js';
import './components/widgets.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      cards: [],
      deck_id: null,
      guesses: 0,
      matches: [],
      startTime: false,
    }    
  }

  componentDidMount() {
    this.drawCards();
  }

  /*
    drawCards() is used by componentDidMount() as well as on shuffle button click.
  */
  drawCards() {

    console.log('drawing / shuffling')

    this.setState({cards:[]});
    //let deck = this.state.deck_id === null ? 'new' : this.state.deck_id;// API dosent let you reset a deck :(
    let deck = 'new';

    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=52`).then((results) => {
      return results.json();
    }).then((data) => {

      this.setState({
        cards : data.cards,
        deck_id: data.deck_id,
        selected: 0,  //number of selected <Cards>
        selections: [], //values of selected <Cards>
        resets: [], //reset functions of selected <Cards>
        removes: [], //remove functions for selected <Cards>
        matches: [], //a list of matches [ [KS,KH], [AD,AH], etc...]
        guesses: 0 //how many guesses
      })

    })

  }

  /*
    select() is passed to each <Card> as prop selectionCB. It is called when a card is clicked. It passes back: 
    value: like 10 or QUEEN or JACK
    reset(): a cb to a function in <Card> that resets the state of that card
    remove(): a cb to a function in <Card> that removes it from play
  */
  select(value, reset, remove) {

    console.log('🃏selected card: ' + value)

    this.setState( {
      selected: this.state.selected + 1,
      selections: [...this.state.selections, value],
      resets: [...this.state.resets, reset],
      removes: [...this.state.removes, remove]
    }, () => {

      console.log('number of selected cards:' + this.state.selected)

      if(this.state.selected === 2) {

        console.log('2 selected!')
        console.log(this.state.selections)

        this.setState({
          guesses: this.state.guesses + 1
        })

        if(this.state.selections[0] === this.state.selections[1]) {
          console.log('match! 😁')
          this.state.removes[0]();
          this.state.removes[1]();
          this.setState({
            matches: [...this.state.matches, [this.state.selections[0], this.state.selections[1]]]
          })
        } else {
          console.log('not a match 🙁')
          this.state.resets[0]();
          this.state.resets[1]();
        }        

        this.setState({ 
          selected: 0,
          selections: [],
          resets: [],
          removes: []
        });

      }

    });
    
  }
  
  render() {
    console.log('rendering...')
    console.log(this.state.cards)
      
    let cards = this.state.cards.map( (e,i) => {
      return <Card data={this.state.cards[i]} selectionCB={this.select.bind(this)} key={i}></Card>;
    });

    return (

      <div className="App">

        <div className='card-container container'>
          { 
            this.state.deck_id !== null ? (
              cards
            ) : (
              <p>loading...</p>
            )
          }
        </div>

        <Widgets drawCards={this.drawCards.bind(this)} matches={this.state.matches} guesses={this.state.guesses}></Widgets>
        
      </div>
    );
  }

}

export default App;
