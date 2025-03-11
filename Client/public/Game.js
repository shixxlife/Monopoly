const players = [
    { id: 1, color: '#0000FF', position: 0, money: 1500, element: null, inJail: false, jailTurns: 0 },
    { id: 2, color: '#FF0000', position: 0, money: 1500, element: null, inJail: false, jailTurns: 0 },
    { id: 3, color: '#FFD700', position: 0, money: 1500, element: null, inJail: false, jailTurns: 0 },
    { id: 4, color: '#008000', position: 0, money: 1500, element: null, inJail: false, jailTurns: 0 }
];

let currentPlayer = 0;
let hasRolled = false;

    // Board positions (0 = GO, moving clockwise)
const boardPositions = calculateBoardPositions();

const propertyNames = [
    "GO", "Mediterranean Avenue", "Community Chest", "Baltic Avenue", "Income Tax",
    "Reading Railroad", "Oriental Avenue", "Chance", "Vermont Avenue", "Connecticut Avenue",
    "Jail", "St. Charles Place", "Electric Company", "States Avenue", "Virginia Avenue",
    "Pennsylvania Railroad", "St. James Place", "Community Chest", "Tennessee Avenue", "New York Avenue",
    "Free Parking", "Kentucky Avenue", "Chance", "Indiana Avenue", "Illinois Avenue",
    "B&O Railroad", "Atlantic Avenue", "Ventnor Avenue", "Water Works", "Marvin Gardens",
    "Go to Jail", "Pacific Avenue", "North Carolina Avenue", "Community Chest", "Pennsylvania Avenue",
    "Short Line Railroad", "Chance", "Park Place", "Luxury Tax", "Boardwalk"
];

const properties = {
1: { name: "Mediterranean Avenue", price: 60, group: "brown" },
3: { name: "Baltic Avenue", price: 60, group: "brown" },
6: { name: "Oriental Avenue", price: 100, group: "light-blue" },
8: { name: "Vermont Avenue", price: 100, group: "light-blue" },
9: { name: "Connecticut Avenue", price: 120, group: "light-blue" },
11: { name: "St. Charles Place", price: 140, group: "pink" },
13: { name: "States Avenue", price: 140, group: "pink" },
14: { name: "Virginia Avenue", price: 160, group: "pink" },
16: { name: "St. James Place", price: 180, group: "orange" },
18: { name: "Tennessee Avenue", price: 180, group: "orange" },
19: { name: "New York Avenue", price: 200, group: "orange" },
21: { name: "Kentucky Avenue", price: 220, group: "red" },
23: { name: "Indiana Avenue", price: 220, group: "red" },
24: { name: "Illinois Avenue", price: 240, group: "red" },
26: { name: "Atlantic Avenue", price: 260, group: "yellow" },
27: { name: "Ventnor Avenue", price: 260, group: "yellow" },
29: { name: "Marvin Gardens", price: 280, group: "yellow" },
31: { name: "Pacific Avenue", price: 300, group: "green" },
32: { name: "North Carolina Avenue", price: 300, group: "green" },
34: { name: "Pennsylvania Avenue", price: 320, group: "green" },
37: { name: "Park Place", price: 350, group: "dark-blue" },
39: { name: "Boardwalk", price: 400, group: "dark-blue" },
// Railroads
5: { name: "Reading Railroad", price: 200, group: "railroad" },
15: { name: "Pennsylvania Railroad", price: 200, group: "railroad" },
25: { name: "B&O Railroad", price: 200, group: "railroad" },
35: { name: "Short Line Railroad", price: 200, group: "railroad" },
// Utilities
12: { name: "Electric Company", price: 150, group: "utility" },
28: { name: "Water Works", price: 150, group: "utility" }
};

    // Add property ownership tracking
    const propertyOwnership = {};

function calculateBoardPositions() {
const positions = [];
const boardSize = 90; // vmin
const squareSize = boardSize / 11;
const centerOffset = 2.5; // vmin

// Top row (left to right)
for (let i = 1; i <= 10; i++) {
    positions.push({
        left: `${i * squareSize + centerOffset}vmin`,
        top: `${centerOffset}vmin`
    });
}

// Right column (top to bottom)
for (let i = 1; i <= 9; i++) {
    positions.push({
        left: `${boardSize - squareSize + centerOffset}vmin`,
        top: `${i * squareSize + centerOffset}vmin`
    });
}

// Bottom row (GO to Jail)
for (let i = 10; i >= 0; i--) {
    positions.push({
        left: `${i * squareSize + centerOffset}vmin`,
        top: `${boardSize - squareSize + centerOffset}vmin`
    });
}

// Left column (going up)
for (let i = 9; i >= 0; i--) {
    positions.push({
        left: `${centerOffset}vmin`,
        top: `${i * squareSize + centerOffset}vmin`
    });
}

return positions;
}

function createPlayerTokens() {
const board = document.querySelector('.board');
const tokenOffsets = [
    { x: -1, y: -1 },  // Adjusted offsets for better spacing
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 }
];

const boardPositions = calculateBoardPositions();
const startPosition = boardPositions[39]; // GO position

players.forEach((player, index) => {
    const token = document.createElement('div');
    token.className = `player-token p${player.id}`;
    token.textContent = (index + 1).toString();
    
    // Convert vmin string to number for offset calculation
    const baseLeft = parseFloat(startPosition.left);
    const baseTop = parseFloat(startPosition.top);
    
    // Apply offset for each player token
    token.style.left = `${baseLeft + tokenOffsets[index].x}vmin`;
    token.style.top = `${baseTop + tokenOffsets[index].y}vmin`;
    
    board.appendChild(token);
    players[index].element = token;
});
}

function updatePlayerPosition(playerIndex, newPosition, diceRoll) {
    const player = players[playerIndex];
    const boardPositions = calculateBoardPositions();
    const tokenOffsets = [
        { x: -0.75, y: -0.75 },
        { x: 0.75, y: -0.75 },
        { x: -0.75, y: 0.75},
        { x: 0.75, y: 0.75 }
    ];
    
    const spacesToMove = (newPosition - player.position + 40) % 40;
    let currentSpace = player.position - 1;
    let moveDelay = 0;

    // Animate movement one space at a time
    for (let i = 0; i < spacesToMove; i++) {
        setTimeout(() => {
            currentSpace = (currentSpace + 1) % 40;
            const pos = boardPositions[currentSpace];
            const offsetX = tokenOffsets[playerIndex].x * 2;
            const offsetY = tokenOffsets[playerIndex].y * 2;
            
            const baseLeft = parseFloat(pos.left);
            const baseTop = parseFloat(pos.top);
            
            player.element.style.left = `${baseLeft + offsetX}vmin`;
            player.element.style.top = `${baseTop + offsetY}vmin`;
            
        }, moveDelay);
        
        moveDelay += 250;
    }
    
    setTimeout(() => {
        player.position = newPosition;
        document.querySelector(`#player${player.id} .position`).textContent = propertyNames[newPosition];
        
        // Handle special squares
        switch(newPosition) {
            case 0: // GO
                // Already handled in main game loop
                break;
            case 4: // Income Tax
                updatePlayerMoney(playerIndex, -150);
                addLogEntry(`Player ${player.id} paid $150 in Income Tax`);
                break;
            case 38: // Luxury Tax
                updatePlayerMoney(playerIndex, -75);
                addLogEntry(`Player ${player.id} paid $75 in Luxury Tax`);
                break;
            case 30: // Go to Jail
                goToJail(playerIndex);
                break;
                case 2: // Community Chest
            case 17:
            case 33:
                handleCommunityChest(playerIndex);
                break;
            case 7: // Chance
            case 22:
            case 36:
                handleChance(playerIndex);
                break;
            case 10: // Just visiting jail
                addLogEntry(`Player ${player.id} is just visiting jail`);
                break;
            case 20: // Free Parking
                addLogEntry(`Player ${player.id} landed on Free Parking`);
                break;
            default:
                // Handle property squares
                if (properties[newPosition]) {
                    if (!propertyOwnership[newPosition]) {
                        offerProperty(newPosition);
                    } else {
                        const owner = propertyOwnership[newPosition];
                        if (owner !== player.id) {
                            const rent = calculateRent(newPosition, diceRoll);
                            updatePlayerMoney(playerIndex, -rent);
                            updatePlayerMoney(owner - 1, rent);
                            addLogEntry(`Player ${player.id} paid $${rent} rent to Player ${owner}`);
                        }
                    }
                }
        }
    }, moveDelay);
    
    return moveDelay;
}

// Update the roll dice event listener to account for animation timing
document.getElementById('rollDice').addEventListener('click', () => {
        if (hasRolled) return;  // Silently return instead of showing notification

        const die1 = rollDice();
        const die2 = rollDice();
        const total = die1 + die2;

        document.getElementById('die1').textContent = die1;
        document.getElementById('die2').textContent = die2;

        const player = players[currentPlayer];
        let newPosition = (player.position + total) % 40;
        
        if (newPosition < player.position) {
            setTimeout(() => {
                updatePlayerMoney(currentPlayer, 200);
                addLogEntry(`Player ${player.id} passed GO and collected $200!`);
            }, ((40 - player.position) * 200));
        }

        const animationDuration = updatePlayerPosition(currentPlayer, newPosition);
        
        setTimeout(() => {
            addLogEntry(`Player ${player.id} rolled ${total} (${die1}+${die2}) and landed on ${propertyNames[newPosition]}`);
        }, animationDuration);

        hasRolled = true;
        document.getElementById('rollDice').disabled = true;
        document.getElementById('endTurn').disabled = false;
    });

    function offerProperty(position) {
    const property = properties[position];
    const propertyDialog = document.getElementById('propertyDialog');
    const propertyNameSpan = document.getElementById('propertyName');
    const propertyPriceSpan = document.getElementById('propertyPrice');
    
    if (!property) {
        console.error('Invalid property position:', position);
        return;
    }
    
    // Don't offer if mortgaged
    if (mortgagedProperties.has(position)) {
        addLogEntry(`${property.name} is mortgaged and cannot be purchased.`);
        return;
    }
    
    propertyNameSpan.textContent = property.name;
    propertyPriceSpan.textContent = property.price.toLocaleString();
    propertyDialog.style.display = 'block';
    
    document.getElementById('buyProperty').onclick = () => {
        const player = players[currentPlayer];
        const price = Number(property.price);
        
        if (player.money >= price) {
            updatePlayerMoney(currentPlayer, -price);
            propertyOwnership[position] = player.id;
            propertyDevelopment[position] = 0;
            addLogEntry(`Player ${player.id} bought ${property.name} for $${price.toLocaleString()}`);
            addOwnerIndicator(position, player.id);
            updateOwnershipTracker();
        } else {
            addLogEntry(`Player ${player.id} cannot afford ${property.name}`);
        }
        propertyDialog.style.display = 'none';
    };
    
    document.getElementById('skipProperty').onclick = () => {
        propertyDialog.style.display = 'none';
        addLogEntry(`Player ${players[currentPlayer].id} declined to buy ${property.name}`);
    };
}

const propertyRents = {
    // Brown properties
    1: { base: 2, oneHouse: 10, twoHouses: 30, threeHouses: 90, fourHouses: 160, hotel: 250 },
    3: { base: 4, oneHouse: 20, twoHouses: 60, threeHouses: 180, fourHouses: 320, hotel: 450 },
    
    // Light Blue properties
    6: { base: 6, oneHouse: 30, twoHouses: 90, threeHouses: 270, fourHouses: 400, hotel: 550 },
    8: { base: 6, oneHouse: 30, twoHouses: 90, threeHouses: 270, fourHouses: 400, hotel: 550 },
    9: { base: 8, oneHouse: 40, twoHouses: 100, threeHouses: 300, fourHouses: 450, hotel: 600 },
    
    // Pink properties
    11: { base: 10, oneHouse: 50, twoHouses: 150, threeHouses: 450, fourHouses: 625, hotel: 750 },
    13: { base: 10, oneHouse: 50, twoHouses: 150, threeHouses: 450, fourHouses: 625, hotel: 750 },
    14: { base: 12, oneHouse: 60, twoHouses: 180, threeHouses: 500, fourHouses: 700, hotel: 900 },
    
    // Orange properties
    16: { base: 14, oneHouse: 70, twoHouses: 200, threeHouses: 550, fourHouses: 750, hotel: 950 },
    18: { base: 14, oneHouse: 70, twoHouses: 200, threeHouses: 550, fourHouses: 750, hotel: 950 },
    19: { base: 16, oneHouse: 80, twoHouses: 220, threeHouses: 600, fourHouses: 800, hotel: 1000 },
    
    // Red properties
    21: { base: 18, oneHouse: 90, twoHouses: 250, threeHouses: 700, fourHouses: 875, hotel: 1050 },
    23: { base: 18, oneHouse: 90, twoHouses: 250, threeHouses: 700, fourHouses: 875, hotel: 1050 },
    24: { base: 20, oneHouse: 100, twoHouses: 300, threeHouses: 750, fourHouses: 925, hotel: 1100 },
    
    // Yellow properties
    26: { base: 22, oneHouse: 110, twoHouses: 330, threeHouses: 800, fourHouses: 975, hotel: 1150 },
    27: { base: 22, oneHouse: 110, twoHouses: 330, threeHouses: 800, fourHouses: 975, hotel: 1150 },
    29: { base: 24, oneHouse: 120, twoHouses: 360, threeHouses: 850, fourHouses: 1025, hotel: 1200 },
    
    // Green properties
    31: { base: 26, oneHouse: 130, twoHouses: 390, threeHouses: 900, fourHouses: 1100, hotel: 1275 },
    32: { base: 26, oneHouse: 130, twoHouses: 390, threeHouses: 900, fourHouses: 1100, hotel: 1275 },
    34: { base: 28, oneHouse: 150, twoHouses: 450, threeHouses: 1000, fourHouses: 1200, hotel: 1400 },
    
    // Dark Blue properties
    37: { base: 35, oneHouse: 175, twoHouses: 500, threeHouses: 1100, fourHouses: 1300, hotel: 1500 },
    39: { base: 50, oneHouse: 200, twoHouses: 600, threeHouses: 1400, fourHouses: 1700, hotel: 2000 },
    
    // Railroads (rent depends on number owned)
    5: { base: 25, two: 50, three: 100, four: 200 },
    15: { base: 25, two: 50, three: 100, four: 200 },
    25: { base: 25, two: 50, three: 100, four: 200 },
    35: { base: 25, two: 50, three: 100, four: 200 },
    
    // Utilities (rent is 4x or 10x dice roll)
    12: { multiplier: 4, twoOwned: 10 },
    28: { multiplier: 4, twoOwned: 10 }
};

const propertyDevelopment = {};
const mortgagedProperties = new Set();

// Function to calculate rent for a property
function calculateRent(position, diceRoll) {
    const property = properties[position];
    const rentConfig = propertyRents[position];
    const owner = propertyOwnership[position];
    
    if (!owner || mortgagedProperties.has(position)) {
        return 0;
    }

    // Check if the property is mortgaged
    if (mortgagedProperties.has(position)) {
        return 0;
    }

    // Railroad rent calculation
    if (property.group === 'railroad') {
        const railroadsOwned = Object.entries(propertyOwnership)
            .filter(([pos, ownerId]) => 
                properties[pos]?.group === 'railroad' && 
                ownerId === owner
            ).length;
        return 25 * Math.pow(2, railroadsOwned - 1); // 25, 50, 100, 200
    }
    
    // Utility rent calculation
    if (property.group === 'utility') {
        const utilitiesOwned = Object.entries(propertyOwnership)
            .filter(([pos, ownerId]) => 
                properties[pos]?.group === 'utility' && 
                ownerId === owner
            ).length;
        return diceRoll * (utilitiesOwned === 2 ? 10 : 4);
    }

    // Regular property rent calculation
    const development = propertyDevelopment[position] || 0;
    const developmentLevels = ['base', 'oneHouse', 'twoHouses', 'threeHouses', 'fourHouses', 'hotel'];
    
    // Check if owner has monopoly
    const hasMonopoly = checkMonopoly(owner, property.group);
    
    // If no houses but has monopoly, rent is doubled
    if (development === 0 && hasMonopoly) {
        return rentConfig.base * 2;
    }
    
    return rentConfig[developmentLevels[development]];
}

function checkMonopoly(playerId, propertyGroup) {
    // Get all properties in the group
    const groupProperties = Object.entries(properties)
        .filter(([_, prop]) => prop.group === propertyGroup)
        .map(([pos, _]) => parseInt(pos));
    
    // Check if player owns all properties in the group
    return groupProperties.every(pos => propertyOwnership[pos] === playerId);
}

function mortgageProperty(position) {
    const property = properties[position];
    const owner = propertyOwnership[position];
    const mortgageValue = Math.floor(property.price / 2);
    
    if (mortgagedProperties.has(position)) {
        addLogEntry(`${property.name} is already mortgaged.`);
        return;
    }
    
    mortgagedProperties.add(position);
    updatePlayerMoney(owner - 1, mortgageValue);
    addLogEntry(`Player ${owner} mortgaged ${property.name} for $${mortgageValue}`);
    updateOwnershipTracker();
}

function unmortgageProperty(position) {
    const property = properties[position];
    const owner = propertyOwnership[position];
    const unmortgageCost = Math.floor(property.price * 0.55); // 50% + 10% interest
    
    if (!mortgagedProperties.has(position)) {
        addLogEntry(`${property.name} is not mortgaged.`);
        return;
    }
    
    if (players[owner - 1].money >= unmortgageCost) {
        mortgagedProperties.delete(position);
        updatePlayerMoney(owner - 1, -unmortgageCost);
        addLogEntry(`Player ${owner} unmortgaged ${property.name} for $${unmortgageCost}`);
        updateOwnershipTracker();
    } else {
        addLogEntry(`Player ${owner} cannot afford to unmortgage ${property.name}`);
    }
}

function sellProperty(position, buyerId) {
    const property = properties[position];
    const currentOwner = propertyOwnership[position];
    const sellingPrice = property.price; // This could be negotiated in a more complex version
    
    if (!currentOwner) {
        addLogEntry(`This property is not owned.`);
        return;
    }
    
    if (propertyDevelopment[position] > 0) {
        addLogEntry(`Cannot sell property with houses/hotels. Sell buildings first.`);
        return;
    }
    
    if (players[buyerId - 1].money >= sellingPrice) {
        updatePlayerMoney(buyerId - 1, -sellingPrice);
        updatePlayerMoney(currentOwner - 1, sellingPrice);
        propertyOwnership[position] = buyerId;
        addLogEntry(`Player ${currentOwner} sold ${property.name} to Player ${buyerId} for $${sellingPrice}`);
        addOwnerIndicator(position, buyerId);
        updateOwnershipTracker();
    } else {
        addLogEntry(`Player ${buyerId} cannot afford to buy ${property.name}`);
    }
}

function updateOwnershipTracker() {
// Clear existing ownership displays
Object.keys(properties).forEach(groupId => {
    const container = document.getElementById(`${properties[groupId].group}-properties`);
    if (container) {
        container.innerHTML = '';
    }
});

// Group properties by their color/type
const groups = {};
Object.entries(propertyOwnership).forEach(([position, ownerId]) => {
    const property = properties[position];
    if (property) {
        if (!groups[property.group]) {
            groups[property.group] = [];
        }
        groups[property.group].push({
            name: property.name,
            owner: ownerId,
            position: position
        });
    }
});

// Update the display for each group
Object.entries(groups).forEach(([group, props]) => {
    const container = document.getElementById(`${group}-properties`);
    if (container) {
        container.innerHTML = props.map(prop => `
            <div class="owned-property-item">
                <span>${prop.name}</span>
                <div class="owner-dot" style="background-color: ${players[prop.owner - 1].color}"></div>
            </div>
        `).join('');
    }
});

// Fill empty groups with "No properties owned" message
document.querySelectorAll('.property-group').forEach(group => {
    const groupId = group.querySelector('div').id.replace('-properties', '');
    const container = document.getElementById(`${groupId}-properties`);
    if (!container.innerHTML.trim()) {
        container.innerHTML = '<div class="owned-property-item">No properties owned</div>';
    }
});
}

function addOwnerIndicator(position, playerId) {
const board = document.querySelector('.board');
const properties = board.querySelectorAll('.cell');
let targetCell;

// Correct indexing based on board position
if (position >= 1 && position <= 9) {
    // Top row
    targetCell = properties[position - 1];
} else if (position >= 11 && position <= 19) {
    // Right side
    targetCell = properties[position - 2];
} else if (position >= 21 && position <= 29) {
    // Bottom row
    targetCell = properties[position - 3];
} else if (position >= 31 && position <= 39) {
    // Left side
    targetCell = properties[position - 4];
}

if (targetCell) {
    // Remove existing indicator if any
    const existingIndicator = targetCell.querySelector('.owner-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    // Add new indicator
    const indicator = document.createElement('div');
    indicator.className = 'owner-indicator';
    indicator.style.backgroundColor = players[playerId - 1].color;
    targetCell.appendChild(indicator);
}
}

    // Initialize the property dialog
    document.addEventListener('DOMContentLoaded', () => {
        const dialog = document.createElement('div');
        dialog.id = 'propertyDialog';
        dialog.className = 'property-dialog';
        dialog.innerHTML = `
            <h3>Buy Property</h3>
            <p>Would you like to buy <span id="propertyName"></span> for $<span id="propertyPrice"></span>?</p>
            <button id="buyProperty">Buy</button>
            <button id="skipProperty">Skip</button>
        `;
        document.body.appendChild(dialog);
        updateOwnershipTracker();
    });

    function updatePlayerMoney(playerIndex, amount) {
    // Ensure both values are numbers
    const currentMoney = Number(players[playerIndex].money);
    const changeAmount = Number(amount);
    
    // Check if values are valid numbers
    if (isNaN(currentMoney) || isNaN(changeAmount)) {
        console.error('Invalid money values:', {
            playerIndex,
            currentMoney: players[playerIndex].money,
            changeAmount: amount
        });
        return;
    }
    players[playerIndex].money = currentMoney + changeAmount;
    
    // Update display with proper formatting
    const moneyDisplay = document.querySelector(`#player${players[playerIndex].id} .money`);
    if (moneyDisplay) {
        moneyDisplay.textContent = players[playerIndex].money.toLocaleString();
    }
    
    // Log the transaction for debugging
    console.log(`Player ${players[playerIndex].id} money updated:`, {
        previous: currentMoney,
        change: changeAmount,
        new: players[playerIndex].money
    });
    }


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
    }

    const chanceCards = [
    { text: "Advance to GO", action: (playerIndex) => updatePlayerPosition(playerIndex, 0) },
    { text: "Advance to Illinois Avenue", action: (playerIndex) => updatePlayerPosition(playerIndex, 24) },
    { text: "Advance to St. Charles Place", action: (playerIndex) => updatePlayerPosition(playerIndex, 11) },
    { text: "Advance to nearest Railroad", action: (playerIndex) => {
        const railroads = [5, 15, 25, 35];
        const playerPos = players[playerIndex].position;
        const nextRR = railroads.find(pos => pos > playerPos) || railroads[0];
        updatePlayerPosition(playerIndex, nextRR);
    }},
    { text: "Bank pays you dividend of $50", action: (playerIndex) => updatePlayerMoney(playerIndex, 50) },
    { text: "Go Back 3 Spaces", action: (playerIndex) => {
        const newPos = (players[playerIndex].position - 3 + 40) % 40;
        updatePlayerPosition(playerIndex, newPos);
    }},
    { text: "Go to Jail", action: (playerIndex) => goToJail(playerIndex) },
    { text: "Make general repairs on all your property. For each house pay $25, for each hotel pay $100", 
      action: (playerIndex) => {
        let totalCost = 0;
        Object.entries(propertyOwnership).forEach(([pos, owner]) => {
            if (owner === players[playerIndex].id) {
                const development = propertyDevelopment[pos] || 0;
                if (development === 5) { // Hotel
                    totalCost += 100;
                } else {
                    totalCost += development * 25;
                }
            }
        });
        updatePlayerMoney(playerIndex, -totalCost);
        addLogEntry(`Player ${players[playerIndex].id} paid $${totalCost} for repairs`);
    }},
    { text: "Pay speeding fine of $15", action: (playerIndex) => updatePlayerMoney(playerIndex, -15) },
    { text: "Take a trip to Reading Railroad", action: (playerIndex) => updatePlayerPosition(playerIndex, 5) },
    { text: "You have been elected Chairman of the Board. Pay each player $50", 
      action: (playerIndex) => {
        players.forEach((_, idx) => {
            if (idx !== playerIndex) {
                updatePlayerMoney(idx, 50);
                updatePlayerMoney(playerIndex, -50);
            }
        });
    }},
    { text: "Your building loan matures. Collect $150", action: (playerIndex) => updatePlayerMoney(playerIndex, 150) }
];

const communityChestCards = [
    { text: "Advance to GO", action: (playerIndex) => updatePlayerPosition(playerIndex, 0) },
    { text: "Bank error in your favor. Collect $200", action: (playerIndex) => updatePlayerMoney(playerIndex, 200) },
    { text: "Doctor's fee. Pay $50", action: (playerIndex) => updatePlayerMoney(playerIndex, -50) },
    { text: "From sale of stock you get $50", action: (playerIndex) => updatePlayerMoney(playerIndex, 50) },
    { text: "Go to Jail", action: (playerIndex) => goToJail(playerIndex) },
    { text: "Holiday fund matures. Receive $100", action: (playerIndex) => updatePlayerMoney(playerIndex, 100) },
    { text: "Income tax refund. Collect $20", action: (playerIndex) => updatePlayerMoney(playerIndex, 20) },
    { text: "Life insurance matures. Collect $100", action: (playerIndex) => updatePlayerMoney(playerIndex, 100) },
    { text: "Pay hospital fees of $100", action: (playerIndex) => updatePlayerMoney(playerIndex, -100) },
    { text: "Pay school fees of $50", action: (playerIndex) => updatePlayerMoney(playerIndex, -50) },
    { text: "Receive $25 consultancy fee", action: (playerIndex) => updatePlayerMoney(playerIndex, 25) },
    { text: "You are assessed for street repairs. $40 per house, $115 per hotel",
      action: (playerIndex) => {
        let totalCost = 0;
        Object.entries(propertyOwnership).forEach(([pos, owner]) => {
            if (owner === players[playerIndex].id) {
                const development = propertyDevelopment[pos] || 0;
                if (development === 5) { // Hotel
                    totalCost += 115;
                } else {
                    totalCost += development * 40;
                }
            }
        });
        updatePlayerMoney(playerIndex, -totalCost);
        addLogEntry(`Player ${players[playerIndex].id} paid $${totalCost} for street repairs`);
    }},
    { text: "You have won second prize in a beauty contest. Collect $10", 
      action: (playerIndex) => updatePlayerMoney(playerIndex, 10) },
    { text: "You inherit $100", action: (playerIndex) => updatePlayerMoney(playerIndex, 100) }
];

// Shuffle functions for the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize card decks
let chanceCardDeck = [...chanceCards];
let communityChestDeck = [...communityChestCards];
shuffleArray(chanceCardDeck);
shuffleArray(communityChestDeck);

// Function to draw a card from either deck
function drawCard(deck) {
    if (deck.length === 0) {
        // Reshuffle if deck is empty
        deck = deck === chanceCardDeck ? [...chanceCards] : [...communityChestCards];
        shuffleArray(deck);
    }
    return deck.pop();
}

// Function to handle Chance spaces
function handleChance(playerIndex) {
    const card = drawCard(chanceCardDeck);
    addLogEntry(`Player ${players[playerIndex].id} drew Chance: ${card.text}`);
    
    // Create and show card dialog
    showCardDialog('Chance', card.text, () => {
        card.action(playerIndex);
    });
}

// Function to handle Community Chest spaces
function handleCommunityChest(playerIndex) {
    const card = drawCard(communityChestDeck);
    addLogEntry(`Player ${players[playerIndex].id} drew Community Chest: ${card.text}`);
    
    // Create and show card dialog
    showCardDialog('Community Chest', card.text, () => {
        card.action(playerIndex);
    });
}

// Function to show card dialog
function showCardDialog(type, text, callback) {
    const dialog = document.createElement('div');
    dialog.className = 'card-dialog';
    dialog.innerHTML = `
        <div class="card-content">
            <h3>${type}</h3>
            <p>${text}</p>
            <button class="ok-button">OK</button>
        </div>
    `;
    
    // Add styles for the dialog
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
        z-index: 1000;
        text-align: center;
    `;
    
    document.body.appendChild(dialog);
    
    // Handle OK button click
    const okButton = dialog.querySelector('.ok-button');
    okButton.onclick = () => {
        dialog.remove();
        if (callback) callback();
    };
}

function addLogEntry(text) {
    const log = document.getElementById('game-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    log.insertBefore(entry, log.firstChild);
    }

    document.getElementById('rollDice').addEventListener('click', () => {
    if (hasRolled) {
        showNotification("You've already rolled! End your turn.");
        return;
    }

    const die1 = rollDice();
    const die2 = rollDice();
    const total = die1 + die2;

    document.getElementById('die1').textContent = die1;
    document.getElementById('die2').textContent = die2;

    const player = players[currentPlayer];
    let newPosition = (player.position + total) % 40;

    updatePlayerPosition(currentPlayer, newPosition);
    addLogEntry(`Player ${player.id} rolled ${total} (${die1}+${die2}) and landed on ${propertyNames[newPosition]}`);

    hasRolled = true;
    document.getElementById('rollDice').disabled = true;
    document.getElementById('endTurn').disabled = false;
    });

    document.getElementById('endTurn').addEventListener('click', () => {
    if (!hasRolled) {
        showNotification("You must roll first!");
        return;
    }

    document.getElementById('rollDice').disabled = false;
    document.getElementById('endTurn').disabled = true;
    
    document.querySelector(`#player${players[currentPlayer].id}`).classList.remove('active-player');
    currentPlayer = (currentPlayer + 1) % 4;
    document.querySelector(`#player${players[currentPlayer].id}`).classList.add('active-player');
    
    hasRolled = false;
    addLogEntry(`Player ${players[currentPlayer].id}'s turn`);
    });

    document.addEventListener('DOMContentLoaded', () => {
// Add the required styles
const tokenStyles = `
    .player-token {
        width: 2.5vmin;
        height: 2.5vmin;
        position: absolute;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.4vmin;
        color: white;
        transform: rotate(180deg);
        box-shadow: 0 0 0.5vmin rgba(0,0,0,0.5);
        border: 0.2vmin solid white;
        border-radius: 50%;
    }

    .player-token.p1 { background: blue; }
    .player-token.p2 { background: red; }
    .player-token.p3 { background: gold; color: black; }
    .player-token.p4 { background: green; }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = tokenStyles;
document.head.appendChild(styleSheet);
createPlayerTokens();

// Initialize game state
document.querySelectorAll('.player-info .position').forEach(el => {
    el.textContent = "GO";
});

addLogEntry("Game started. All players at GO!");
});