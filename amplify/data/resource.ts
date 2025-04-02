import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== MODIFIED FOR TRIVIA QUIZ GAME ===============================================================
This file now defines three models:
• QuizQuestion: Stores each question, its options, correct answer, and metadata.
• GamePool: Tracks players waiting to join a game.
• GameSession: Represents a game session, holding player IDs, questions, and scores.
=============================================================================================*/
const schema = a.schema({
  QuizQuestion: a
    .model({
      question: a.string().required(),
      options: a.string().array().required(),  // Array of answer options (e.g. 4 items)
      correctAnswer: a.string().required(),
      category: a.string(),                     // Optional: category of the question
      difficulty: a.string(),                   // Optional: difficulty level (e.g. easy, medium, hard)
    })
    .authorization((allow) => [allow.owner()]),

  GamePool: a
    .model({
      playerId: a.string().required(),          // The unique identifier for the player
      status: a.string().required(),            // e.g., "waiting", "matched"
      joinedAt: a.datetime(),                   // Timestamp when the player joined the pool
    })
    .authorization((allow) => [allow.owner()]),

  GameSession: a
    .model({
      players: a.string().array().required(),   // List of player IDs in the session (typically 2 players)
      questions: a.hasMany("QuizQuestion"),       // Associated quiz questions for the session
      currentQuestionIndex: a.integer(),          // To track which question is active
      scores: a.map(a.integer()),                 // Map of playerId to score
      startedAt: a.datetime(),                    // Game start timestamp
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
