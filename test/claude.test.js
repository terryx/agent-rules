import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {describe, expect, it, beforeAll} from "@jest/globals";
import { shippingCostSet, userPermissionsSet, taxCalculationSet } from '../fixtures/branching-patterns.js';
import { discountCalculationSet, userValidationSet, fileProcessingSet } from '../fixtures/guard-clauses.js';
import { removeAndCountSet, updateUserSet, processOrderSet } from '../fixtures/command-query-separation.js';

dotenv.config();

const AI_MODEL = 'claude-opus-4-20250514';

describe('Claude Client', () => {
  let anthropic;
  
  beforeAll(() => {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  });

  const branchingTestSets = [
    { name: 'shipping cost', set: shippingCostSet },
    { name: 'user permissions', set: userPermissionsSet },
    { name: 'tax calculation', set: taxCalculationSet }
  ];

  const guardClauseTestSets = [
    { name: 'discount calculation', set: discountCalculationSet },
    { name: 'user validation', set: userValidationSet },
    { name: 'file processing', set: fileProcessingSet }
  ];

  const cqsTestSets = [
    { name: 'remove and count', set: removeAndCountSet },
    { name: 'update user', set: updateUserSet },
    { name: 'process order', set: processOrderSet }
  ];

  branchingTestSets.forEach(({ name, set }) => {
    it(`should evaluate ${name} branching patterns`, async () => {
      const rubricTemplate = fs.readFileSync(path.join(process.cwd(), 'eval/rubric-judge-branching.txt'), 'utf-8');
      const prompt = rubricTemplate
        .replace('{BAD_EXAMPLE}', set.bad)
        .replace('{GOOD_EXAMPLE}', set.good)
        .replace('{CANDIDATE_CODE}', set.bad);
      
      const result = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = result.content[0].text;

      // Parse JSON response and check score
      const evaluation = JSON.parse(text.replace(/```json\n?|```/g, ''));
      expect(evaluation.branching_patterns.score).toBe(1);
      expect(evaluation.branching_patterns.refactored_code).toBeDefined();
    });
  });

  guardClauseTestSets.forEach(({ name, set }) => {
    it(`should evaluate ${name} guard clauses`, async () => {
      const rubricTemplate = fs.readFileSync(path.join(process.cwd(), 'eval/rubric-judge-guard-clause.txt'), 'utf-8');
      const prompt = rubricTemplate
        .replace('{BAD_EXAMPLE}', set.bad)
        .replace('{GOOD_EXAMPLE}', set.good)
        .replace('{CANDIDATE_CODE}', set.bad);
      
      const result = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = result.content[0].text;

      // Parse JSON response and check score
      const evaluation = JSON.parse(text.replace(/```json\n?|```/g, ''));
      expect(evaluation.guard_clauses.score).toBe(1);
      expect(evaluation.guard_clauses.refactored_code).toBeDefined();
    });
  });

  cqsTestSets.forEach(({ name, set }) => {
    it(`should evaluate ${name} command-query separation`, async () => {
      const rubricTemplate = fs.readFileSync(path.join(process.cwd(), 'eval/rubric-judge-cqs.txt'), 'utf-8');
      const prompt = rubricTemplate
        .replace('{BAD_EXAMPLE}', set.bad)
        .replace('{GOOD_EXAMPLE}', set.good)
        .replace('{CANDIDATE_CODE}', set.bad);
      
      const result = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = result.content[0].text;

      // Parse JSON response and check score
      const evaluation = JSON.parse(text.replace(/```json\n?|```/g, ''));
      expect(evaluation.command_query_separation.score).toBe(1);
      expect(evaluation.command_query_separation.refactored_code).toBeDefined();
    });
  });
});