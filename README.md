# AI Agent Rules and Code Evaluation

This project provides AI rubric evaluation system for testing clean code patterns across multiple AI providers.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
```env
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key  
GOOGLE_API_KEY=your_google_api_key
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific AI provider tests
```bash
# OpenAI GPT-4o tests
npm test openai.test.js

# Claude Opus tests  
npm test claude.test.js

# Google Gemini tests
npm test gemini.test.js
```

### Watch mode
```bash
npm run test:watch
```

## Test Coverage

The test suite evaluates **3 clean code patterns** across **3 AI providers**:

### Clean Code Patterns
1. **Branching Patterns** - Use lookup tables/switch instead of if-else chains
2. **Guard Clauses** - Handle edge cases early with fail-fast approach  
3. **Command-Query Separation** - Separate functions that query from those that command

### AI Providers
- **OpenAI**: GPT-4o
- **Claude**: Claude Opus 4
- **Gemini**: Gemini 2.0 Flash

### Test Structure
Each pattern includes 3 test scenarios, resulting in **9 tests per AI provider** (27 total tests).

All tests expect the AI to:
- Score refactored code as `1` (perfect)
- Provide working refactored code
- Follow the clean code principles demonstrated in reference examples

## Project Structure

```
├── eval/                           # Rubric templates
│   ├── rubric-judge-branching.txt
│   ├── rubric-judge-guard-clause.txt
│   └── rubric-judge-cqs.txt
├── fixtures/                       # Test code examples
│   ├── branching-patterns.js
│   ├── guard-clauses.js
│   └── command-query-separation.js
├── test/                          # Test suites
│   ├── openai.test.js
│   ├── claude.test.js
│   └── gemini.test.js
└── docs/clean-code/              # Documentation
    ├── branching-patterns.md
    ├── guard-clauses.md
    └── command-query-separation.md
```