const fs = require('fs');

let content = fs.readFileSync('src/data/products/bullphish-id.ts', 'utf8');
content = content.replace(
  /{ id: 'fc-bpid-8', moduleId: 'bullphish-id', question: 'What is a "Lookalike Domain"\\?', answer: 'A domain that looks similar to a trusted domain.*?}/,
  `{ id: 'fc-bpid-8', moduleId: 'bullphish-id', question: 'What sending domains are available for BullPhish ID campaigns?', answer: 'BullPhish ID provides global sending domains out-of-the-box, and organizations can optionally configure verified custom sending domains they own or control.' }`
);
fs.writeFileSync('src/data/products/bullphish-id.ts', content);

let rmmContent = fs.readFileSync('src/data/products/datto-rmm.ts', 'utf8');
// "Standalone Datto RMM Ransomware Detection remains supported. For current deployments, Datto recommends Endpoint Security policy, and when using the Datto Endpoint Security integration, ransomware protection through EDR/AV is the recommended configuration."
rmmContent = rmmContent.replace(
  /While standalone monitors exist, the Endpoint Security policy is the modern, supported method for deploying and configuring EDR and Ransomware Detection\./g,
  "Standalone Datto RMM Ransomware Detection remains supported. For current deployments, Datto recommends Endpoint Security policy, and when using the Datto Endpoint Security integration, ransomware protection through EDR/AV is the recommended configuration."
);
fs.writeFileSync('src/data/products/datto-rmm.ts', rmmContent);

let edrContent = fs.readFileSync('src/data/products/datto-edr.ts', 'utf8');
edrContent = edrContent.replace(
  /The Datto RMM agent maintains connectivity during isolation, allowing you to investigate the local files remotely\./g,
  "Datto RMM connectivity is preserved during isolation, allowing technicians to continue using Web Remote. Web Remote sessions use WebRTC."
);
fs.writeFileSync('src/data/products/datto-edr.ts', edrContent);

let inkyContent = fs.readFileSync('src/data/products/inky.ts', 'utf8');
inkyContent = inkyContent.replace(
  /INKY utilizes the native quarantine of M365 or Google Workspace\./gi,
  "INKY analyses and directs quarantine handling, while the actual quarantined messages reside in the downstream mail platform's quarantine."
);
inkyContent = inkyContent.replace(
  /INKY doesn't have its own quarantine, it uses M365 or Google Workspace quarantine\./gi,
  "INKY provides quarantine-related views and management in its interface, but the actual quarantined messages reside in the downstream mail platform's quarantine."
);
inkyContent = inkyContent.replace(
  /answer: 'It doesn\\'t. INKY uses the native quarantine vault provided by Microsoft 365 or Google Workspace, keeping data central.'/gi,
  "answer: 'INKY analyses and directs quarantine handling (and provides views/management in its interface), while the actual quarantined messages reside in the downstream mail platform\\'s quarantine.'"
);

fs.writeFileSync('src/data/products/inky.ts', inkyContent);

console.log('Fixed files');
