import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getHash(text) {
  return crypto.createHash('sha256').update(text || '').digest('hex');
}

export function extractClaims(modules, scenarios, cards) {
  const pendingLedger = [];
  const seenIds = new Set();
  
  let duplicateCount = 0;

  function addClaim(id, text, module, file) {
    if (!text || text.trim() === '') return;
    
    // Validate uniqueness
    if (seenIds.has(id)) {
      console.error(`DUPLICATE CLAIM ID DETECTED: ${id}`);
      duplicateCount++;
    }
    seenIds.add(id);
    
    pendingLedger.push({
      claimId: id,
      sourceFile: file,
      claimText: text.trim(),
      hash: getHash(text.trim()),
      verdict: "UNREVIEWED",
      sourceUrl: "",
      sourceTitle: "",
      supportingSection: "",
      evidenceSummary: "",
      reviewedBy: "",
      checkedDate: ""
    });
  }

  // 1. Modules
  for (const m of modules) {
    const file = `src/data/products/${m.id}.ts`;
    const prefix = `${m.id}/module`;
    
    addClaim(`${prefix}/description`, m.description, m.id, file);
    addClaim(`${prefix}/problemSolved`, m.problemSolved, m.id, file);
    if (m.mentalModel) addClaim(`${prefix}/mentalModel`, m.mentalModel, m.id, file);
    
    m.keyTerminology?.forEach((t, i) => {
      addClaim(`${prefix}/keyTerminology/${i}/term`, t.term, m.id, file);
      addClaim(`${prefix}/keyTerminology/${i}/definition`, t.definition, m.id, file);
    });
    
    m.actualUseCases?.forEach((t, i) => addClaim(`${prefix}/actualUseCases/${i}`, t, m.id, file));
    m.commonWorkflows?.forEach((t, i) => addClaim(`${prefix}/commonWorkflows/${i}`, t, m.id, file));
    m.whenNotToUse?.forEach((t, i) => addClaim(`${prefix}/whenNotToUse/${i}`, t, m.id, file));
    m.commonConfusions?.forEach((t, i) => addClaim(`${prefix}/commonConfusions/${i}`, t, m.id, file));
    
    m.ticketCases?.forEach((t, i) => {
      addClaim(`${prefix}/ticketCases/${i}/title`, t.title, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/client`, t.client, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/symptom`, t.symptom, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/investigation`, t.investigation, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/resolution`, t.resolution, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/lessonsLearned`, t.lessonsLearned, m.id, file);
      addClaim(`${prefix}/ticketCases/${i}/fasterNextTime`, t.fasterNextTime, m.id, file);
    });
    
    m.realTickets?.forEach((t, i) => {
      addClaim(`${prefix}/realTickets/${i}/title`, t.title, m.id, file);
      addClaim(`${prefix}/realTickets/${i}/issue`, t.issue, m.id, file);
      addClaim(`${prefix}/realTickets/${i}/initialThought`, t.initialThought, m.id, file);
      addClaim(`${prefix}/realTickets/${i}/resolution`, t.resolution, m.id, file);
      addClaim(`${prefix}/realTickets/${i}/lessonsLearned`, t.lessonsLearned, m.id, file);
      addClaim(`${prefix}/realTickets/${i}/fasterNextTime`, t.fasterNextTime, m.id, file);
    });
  }

  // 2. Scenarios
  for (const sc of scenarios) {
    const file = `src/data/products/${sc.moduleId}.ts`;
    const prefix = `${sc.moduleId}/scenarios/${sc.id}`;
    
    addClaim(`${prefix}/title`, sc.title, sc.moduleId, file);
    addClaim(`${prefix}/description`, sc.description, sc.moduleId, file);
    
    for (const stepKey in sc.steps) {
      const step = sc.steps[stepKey];
      addClaim(`${prefix}/steps/${step.id}/text`, step.text, sc.moduleId, file);
      
      step.options.forEach((opt, idx) => {
        addClaim(`${prefix}/steps/${step.id}/options/opt-${idx}/text`, opt.text, sc.moduleId, file);
        addClaim(`${prefix}/steps/${step.id}/options/opt-${idx}/feedback`, opt.feedback, sc.moduleId, file);
      });
    }
  }

  // 3. Flashcards
  for (const fc of cards) {
    const file = `src/data/products/${fc.moduleId}.ts`;
    const prefix = `${fc.moduleId}/cards/${fc.id}`;
    
    addClaim(`${prefix}/question`, fc.question, fc.moduleId, file);
    addClaim(`${prefix}/answer`, fc.answer, fc.moduleId, file);
  }
  
  if (duplicateCount > 0) {
    throw new Error(`Found ${duplicateCount} duplicate claim IDs. Extraction aborted.`);
  }

  return pendingLedger;
}

export function extractAndSave(modules, scenarios, cards) {
  const pendingLedger = extractClaims(modules, scenarios, cards);
  const ledgerPath = path.resolve(__dirname, '../docs/factual-claims.pending.json');
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  fs.writeFileSync(ledgerPath, JSON.stringify(pendingLedger, null, 2));
  console.log(`Extracted ${pendingLedger.length} unique factual surfaces.`);
  return pendingLedger;
}
