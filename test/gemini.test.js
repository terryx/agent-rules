import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {describe, expect, it, beforeAll} from "@jest/globals";
import { shippingCostSet, userPermissionsSet, taxCalculationSet } from '../fixtures/branching-patterns.js';

dotenv.config();

const AI_MODEL = 'gemini-2.0-flash';

describe('Gemini Client', () => {
  let genAI;
  let model;
  
  beforeAll(() => {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    model = genAI.getGenerativeModel({ model: AI_MODEL });
  });

  const testSets = [
    { name: 'shipping cost', set: shippingCostSet },
    { name: 'user permissions', set: userPermissionsSet },
    { name: 'tax calculation', set: taxCalculationSet }
  ];

  testSets.forEach(({ name, set }) => {
    it(`should evaluate ${name} branching patterns`, async () => {
      const rubricTemplate = fs.readFileSync(path.join(process.cwd(), 'eval/rubric-judge.txt'), 'utf-8');
      const prompt = rubricTemplate
        .replace('{BAD_EXAMPLE}', set.bad)
        .replace('{GOOD_EXAMPLE}', set.good)
        .replace('{CANDIDATE_CODE}', set.bad);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response and check score
      const evaluation = JSON.parse(text.replace(/```json\n?|```/g, ''));
      expect(evaluation.branching_patterns.score).toBe(1);
      expect(evaluation.branching_patterns.refactored_code).toBeDefined();
    });
  });
});