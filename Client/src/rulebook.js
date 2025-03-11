import React from 'react'
import './RuleBook.css'

export default function RuleBook() {
  return (
    <div className="rulebook-container">
      <h1 className="rulebook-title">RuleBook</h1>
      <div className="rulebook-subtitle">
        Ages 8+ | 2 to 6 Players
      </div>
      
      <div className="rulebook-content">
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">OBJECT:</h5>
          <p className="rulebook-section-text">
            The object of the game is to become the wealthiest player through buying, renting, and selling property. 
            <span className="rulebook-highlight"> Each player is given $1,500</span>
          </p>
        </section>
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">THE PLAY</h5>
          <p className="rulebook-section-text">
          Each player hits the "Roll dice" and the token moves in the direction of right to left starting from the corner marked "GO". According to dice value, i.e., sum of 2 dice values, and space, your token reaches a particular card, which may be a property, chance, community chest, income tax, jail, free parking, or any of the utilities.
          </p>
        </section>
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">"GO"</h5>
          <p className="rulebook-section-text">
          Each time a player's token lands on or passes over GO, whether by throwing the dice or drawing a card, the player gets a $200 salary.
          </p>
        </section>
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">BUYING PROPERTY</h5>
          <p className="rulebook-section-text">
          Whenever you land on an unowned property, you may buy that property from the Bank at its printed price. If you do not wish to buy the property, then you can click on the skip button. If the player buys the property, then the ownership tracker gets updated listing the property name under the respective color group with the player's token color beside it
          </p>
        </section>
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">PAYING RENT</h5>
          <p className="rulebook-section-text">
          When a player lands on property owned by another player, the owner collects rent from the player.
          </p>
        </section>
        <section className="rulebook-section">
          <h5 className="rulebook-section-title">CHANCE AND COMMUNITY CHEST</h5>
          <p className="rulebook-section-text">
          When a player lands on these cards, a random card is withdrawn from our set of cards and displayed in the window. The player has to follow whatever is shown on the card.
          </p>
        </section>


        {/* Rest of the sections follow the same pattern */}
      </div>
    </div>
  )
}