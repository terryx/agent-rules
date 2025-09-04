# Project Specifications

## Environment Configuration

### .env Support
- Install dotenv package to support environment variable loading
- Create `.env` file in project root to store sensitive configuration
- Load environment variables using dotenv at application startup

### Required Environment Variables
The `.env` file should contain the following API keys:
```
OPENAI_API_KEY=your_openai_api_key_here
CLAUDE_API_KEY=your_claude_api_key_here
```

## AI Client Modules

### OpenAI Client (`openai.mjs`)
- Separate module to initialize OpenAI client
- Handle chat completion functionality
- Load API key from environment variables
- Export configured client for use across the application

### Claude Client (`claude.mjs`) 
- Separate module to initialize Claude client
- Handle chat completion functionality
- Load API key from environment variables
- Export configured client for use across the application

## Template System

### Common Template Folder
- Create a `templates/` directory to store prompt templates
- Centralized location for all AI prompt templates
- Templates should be reusable across different AI providers
- Support for template parameterization and dynamic content insertion