/**
 * CEFR Official Standardized Language Curriculum for Lingua
 * 
 * Defines the 5 core pedagogical stages according to the Common European
 * Framework of Reference for Languages (CEFR) and the 5 interactive drill
 * exercise types present in every lesson.
 */

export interface CEFRStageDefinition {
  stageNumber: number;
  cefrLevel: "A1" | "A2" | "B1" | "B2";
  stageName: string;
  focusArea: string;
  description: string;
  competencyOutcome: string;
  exerciseTypes: Array<{
    type: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export const CEFR_CURRICULUM_STAGES: CEFRStageDefinition[] = [
  {
    stageNumber: 1,
    cefrLevel: "A1",
    stageName: "Breakthrough (Beginner)",
    focusArea: "Real-Life Survival & Everyday Greetings",
    description: "Foundational everyday greetings, polite self-introductions, asking basic 'what/where' questions, and essential courtesy markers.",
    competencyOutcome: "Can understand and use familiar everyday expressions and basic phrases aimed at the satisfaction of needs of a concrete type.",
    exerciseTypes: [
      { type: "pictorial_identification", title: "Pictorial Identification", description: "Select the correct illustration card with Klaus audio pronunciation preview", icon: "🖼️" },
      { type: "multiple_choice", title: "Contextual Choice", description: "Choose the correct phrase in conversational contexts", icon: "📝" },
      { type: "listening", title: "Listening Drill", description: "Listen to Klaus speak and identify the matching native meaning", icon: "🎧" },
      { type: "word_order", title: "Word Order Syntax", description: "Reconstruct proper sentence order by tapping word tiles", icon: "🧩" },
      { type: "translation", title: "Sentence Translation", description: "Translate complete situational sentences into the target language", icon: "✍️" },
    ],
  },
  {
    stageNumber: 2,
    cefrLevel: "A2",
    stageName: "Waystage (Everyday Essentials)",
    focusArea: "Shopping, Numbers, Convenience Stores & Prices",
    description: "Daily commerce, numbers, buying snacks and drinks at convenience stores, asking 'how much is this?', and handling cards and cash receipts.",
    competencyOutcome: "Can communicate in simple and routine tasks requiring a direct exchange of information on familiar matters.",
    exerciseTypes: [
      { type: "pictorial_identification", title: "Pictorial Identification", description: "Identify everyday commercial items and quantities with visual memory anchors", icon: "🖼️" },
      { type: "multiple_choice", title: "Contextual Choice", description: "Select the accurate payment or price question", icon: "📝" },
      { type: "listening", title: "Listening Drill", description: "Listen to cashier and merchant dialogue spoken by Klaus", icon: "🎧" },
      { type: "word_order", title: "Word Order Syntax", description: "Formulate price and request sentences", icon: "🧩" },
      { type: "translation", title: "Sentence Translation", description: "Translate purchases and transaction requests accurately", icon: "✍️" },
    ],
  },
  {
    stageNumber: 3,
    cefrLevel: "A2",
    stageName: "Waystage (Practical Dining)",
    focusArea: "Cafés, Street Food & Restaurant Ordering",
    description: "Ordering hot and cold drinks, asking for less spicy food, ordering traditional meals, and asking for the bill.",
    competencyOutcome: "Can handle routine dining interactions, express culinary preferences, and request items courteously.",
    exerciseTypes: [
      { type: "pictorial_identification", title: "Pictorial Identification", description: "Recognize dishes, drinks, and dining utensils via visual cards", icon: "🖼️" },
      { type: "multiple_choice", title: "Contextual Choice", description: "Choose the polite restaurant request phrase", icon: "📝" },
      { type: "listening", title: "Listening Drill", description: "Understand waiter prompts and recommendations", icon: "🎧" },
      { type: "word_order", title: "Word Order Syntax", description: "Assemble food customization requests", icon: "🧩" },
      { type: "translation", title: "Sentence Translation", description: "Translate complete ordering sentences into the target tongue", icon: "✍️" },
    ],
  },
  {
    stageNumber: 4,
    cefrLevel: "B1",
    stageName: "Threshold (Transit & Travel)",
    focusArea: "Metro Transit, Asking Directions & Hotel Check-in",
    description: "Navigating subway stations, asking where restrooms or exits are, riding taxis, checking in at hotels, and handling travel logistics.",
    competencyOutcome: "Can deal with most situations likely to arise whilst travelling in an area where the language is spoken.",
    exerciseTypes: [
      { type: "pictorial_identification", title: "Pictorial Identification", description: "Identify transit signs, subway maps, and landmarks", icon: "🖼️" },
      { type: "multiple_choice", title: "Contextual Choice", description: "Choose the proper navigation and directional question", icon: "📝" },
      { type: "listening", title: "Listening Drill", description: "Interpret station announcements and directional guidance", icon: "🎧" },
      { type: "word_order", title: "Word Order Syntax", description: "Construct directional and destination sentences", icon: "🧩" },
      { type: "translation", title: "Sentence Translation", description: "Translate hotel and navigation queries with precision", icon: "✍️" },
    ],
  },
  {
    stageNumber: 5,
    cefrLevel: "B2",
    stageName: "Vantage (Social & Urgent Fluency)",
    focusArea: "Social Connections, Nuanced Conversation & Emergencies",
    description: "Making friends, asking for contact info, expressing detailed feelings, explaining symptoms to doctors, and handling lost items.",
    competencyOutcome: "Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible.",
    exerciseTypes: [
      { type: "pictorial_identification", title: "Pictorial Identification", description: "Connect emotional, medical, and social terms with visual prompts", icon: "🖼️" },
      { type: "multiple_choice", title: "Contextual Choice", description: "Select the most appropriate formal or friendly register", icon: "📝" },
      { type: "listening", title: "Listening Drill", description: "Listen to natural-speed conversational dialogue and emergency queries", icon: "🎧" },
      { type: "word_order", title: "Word Order Syntax", description: "Build complex multi-clause sentences", icon: "🧩" },
      { type: "translation", title: "Sentence Translation", description: "Translate nuanced interpersonal statements accurately", icon: "✍️" },
    ],
  },
];
