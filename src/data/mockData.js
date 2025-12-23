export const mockTestPapers = [
  {
    id: 1,
    name: "Basic Mathematics",
    subject: "Math",
    description: "A basic mathematics test covering fundamental concepts including arithmetic, basic algebra, and simple problem solving.",
    timeLimit: 30,
    difficulty: "Easy",
    published: true,
    createdBy: "Admin",
    createdAt: "2025-12-20",
    questions: [
      {
        id: 1,
        text: "What is 15 + 27?",
        type: "MCQ",
        options: ["40", "42", "43", "45"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 2,
        text: "What is 8 × 7?",
        type: "MCQ",
        options: ["54", "56", "58", "60"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 3,
        text: "Is 17 a prime number?",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 0,
        marks: 1
      },
      {
        id: 4,
        text: "What is 100 ÷ 4?",
        type: "MCQ",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 5,
        text: "What is the square root of 81?",
        type: "MCQ",
        options: ["7", "8", "9", "10"],
        correctAnswer: 2,
        marks: 1
      }
    ]
  },
  {
    id: 2,
    name: "General Knowledge Quiz",
    subject: "GK",
    description: "A comprehensive general knowledge quiz covering geography, history, science, and current affairs.",
    timeLimit: 30,
    difficulty: "Medium",
    published: true,
    createdBy: "Admin",
    createdAt: "2025-12-20",
    questions: [
      {
        id: 1,
        text: "What is the capital of France?",
        type: "MCQ",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        marks: 1
      },
      {
        id: 2,
        text: "The Earth is the third planet from the Sun.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 0,
        marks: 1
      },
      {
        id: 3,
        text: "Who painted the Mona Lisa?",
        type: "MCQ",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 4,
        text: "What is the largest ocean on Earth?",
        type: "MCQ",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        marks: 1
      },
      {
        id: 5,
        text: "The Great Wall of China is visible from space.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 6,
        text: "How many continents are there?",
        type: "MCQ",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        marks: 1
      },
      {
        id: 7,
        text: "What is the chemical symbol for gold?",
        type: "MCQ",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        marks: 1
      },
      {
        id: 8,
        text: "The human body has 206 bones.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 0,
        marks: 1
      }
    ]
  },
  {
    id: 3,
    name: "English Grammar Test",
    subject: "English",
    description: "An advanced English grammar test covering parts of speech, sentence structure, tenses, and proper usage.",
    timeLimit: 30,
    difficulty: "Hard",
    published: true,
    createdBy: "Admin",
    createdAt: "2025-12-20",
    questions: [
      {
        id: 1,
        text: "Which sentence is grammatically correct?",
        type: "MCQ",
        options: [
          "She don't like coffee",
          "She doesn't likes coffee",
          "She doesn't like coffee",
          "She not like coffee"
        ],
        correctAnswer: 2,
        marks: 1
      },
      {
        id: 2,
        text: "An adjective modifies a noun or pronoun.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 0,
        marks: 1
      },
      {
        id: 3,
        text: "Identify the verb in this sentence: 'The cat quickly ran across the street.'",
        type: "MCQ",
        options: ["cat", "quickly", "ran", "street"],
        correctAnswer: 2,
        marks: 1
      },
      {
        id: 4,
        text: "What is the past participle of 'swim'?",
        type: "MCQ",
        options: ["swam", "swum", "swimming", "swimmed"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 5,
        text: "'Their', 'there', and 'they're' are homophones.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: 0,
        marks: 1
      },
      {
        id: 6,
        text: "Which is the correct use of a semicolon?",
        type: "MCQ",
        options: [
          "I like apples; but not oranges",
          "I like apples; oranges are okay too",
          "I like; apples and oranges",
          "I; like apples and oranges"
        ],
        correctAnswer: 1,
        marks: 1
      }
    ]
  }
];
