export const situations = {
  library: {
    browsingSameSection: "Browsing the same section",
    readingSameBook: "Reading the same book",
    studyingAlone: "Studying alone",
    returningBooks: "Returning books",
    askingForHelp: "Asking for help finding a book"
  },
  busStop: {
    missingBus: "Just missed the bus",
    longWait: "Long wait ahead",
    rainyDay: "Rainy day",
    regularCommute: "Regular commute",
    lastBusOfDay: "Last bus of the day"
  },
  nightclub: {
    atBar: "At the bar",
    danceFloor: "On the dance floor",
    quietCorner: "In a quiet corner",
    vipSection: "VIP section",
    waitingInLine: "Waiting in line"
  }
};

export const styles = {
  funny: "Humorous and light-hearted",
  smooth: "Sophisticated and charming",
  nerdy: "Clever and intellectual",
  cheesy: "Classic and playful",
  sincere: "Genuine and straightforward"
};

export const pickupLines = {
  library: {
    situations: {
      browsingSameSection: {
        funny: [
          "Looking for chemistry books? Because we've got some right here.",
          "Is this the romance section? Because I'm feeling a connection.",
          "I was looking for adventure, and here you are!"
        ],
        smooth: [
          "Great minds browse alike, it seems.",
          "Your taste in books is as intriguing as you are.",
          "Some stories find us at just the right moment."
        ],
        nerdy: [
          "The probability of us liking the same books must be statistically significant.",
          "Like parallel plots in literature, our paths seem to converge.",
          "Is this a case of literary synchronicity?"
        ],
        cheesy: [
          "Are you a bookmark? Because I've been looking for you in every book.",
          "Must be fate that brought us to this shelf.",
          "Is this heaven? Because I see an angel in this aisle."
        ],
        sincere: [
          "I noticed we're interested in similar topics. Any recommendations?",
          "Finding someone who shares your interests is rare. Would you like to discuss books?",
          "Your book choices caught my attention. What draws you to this genre?"
        ]
      },
      readingSameBook: {
        funny: [
          "Does your copy have the same plot twist as mine?",
          "Spoiler alert: we end up getting coffee together.",
          "I hear the sequel is about us."
        ],
        // ... more styles for readingSameBook
      },
      // ... more situations
    }
  },
  busStop: {
    situations: {
      missingBus: {
        funny: [
          "Well, the bus left, but at least it left us with an opportunity.",
          "Missing the bus never felt so lucky.",
          "Is this the bus to destiny? Because timing seems perfect."
        ],
        smooth: [
          "Some delays are worth the wait.",
          "Maybe the schedule had other plans for us.",
          "The next bus can wait if you'd like to chat."
        ],
        // ... more styles
      },
      // ... more situations
    }
  },
  // ... more locations
};