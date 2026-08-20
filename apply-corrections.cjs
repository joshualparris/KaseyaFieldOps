const fs = require('fs');
const path = require('path');

function replaceInFile(filepath, replacements) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (const [regex, replacement] of replacements) {
        if (!regex.test(content)) {
            console.log(`WARNING: Regex not found in ${filepath}: ${regex}`);
        }
        content = content.replace(regex, replacement);
    }
    fs.writeFileSync(filepath, content);
}

// 1. BullPhish ID
replaceInFile('src/data/products/bullphish-id.ts', [
    // fc-bpid-8
    [
        /question: 'What is a "Lookalike Domain"\?', answer: 'A domain that looks similar to a trusted domain \(e\.g\., paypa1\.com instead of paypal\.com\) used in phishing templates\.'/g,
        `question: 'What sending domains are available for BullPhish ID campaigns?', answer: 'BullPhish ID provides Global Sending Domains out-of-the-box, and organizations can optionally configure verified Custom Sending Domains they own or control.'`
    ],
    // bpid-custom-template landing page
    [
        /Use the Template Builder to create a custom email and landing page matching their HR portal\./g,
        "Use the Template Builder to create a custom email template, choose a sending profile, and select a pre-existing landing page (custom landing pages cannot be freely edited)."
    ],
    // Any remaining "pool of lookalike" or custom sending domain absolute mandates
    [
        /Customers must register and configure their own Custom Sending Domains/gi,
        "Customers can optionally register and configure Custom Sending Domains"
    ]
]);

// 2. Datto Backup
replaceInFile('src/data/products/datto-backup.ts', [
    // Ransomware false positive
    [
        /like a massive folder move or a script encrypting files/g,
        "like legitimate programs uncharacteristically updating files or exhibiting rapid random overwrites"
    ],
    [
        /Datto analyzes the delta footprint/g,
        "Datto identifies patterns of change in particular ransomware-targeted file types"
    ],
    // Inverse Chain
    [
        /ZFS block-level deduplication and linking makes this possible\./g,
        "ZFS snapshots referencing the base image and block changes make this possible (Datto does not use ZFS deduplication)."
    ],
    [
        /every incremental snapshot is a fully independent, bootable recovery point/g,
        "every snapshot is a fully independent recovery point (stored in a non-bootable state, and made bootable when a restore/virtualization is brought up)"
    ],
    [
        /Every snapshot is fully constructed and instantly bootable/g,
        "Every snapshot is fully constructed and can be quickly virtualized"
    ],
    [
        /zero conversion or rebuild/g,
        "no traditional incremental-chain rebuild"
    ]
]);

// 3. Datto RMM & Kaseya 365 (Policy Hierarchy & Secure Tunnel)
replaceInFile('src/data/products/datto-rmm.ts', [
    // Policy Hierarchy
    [
        /Site-level policies override Global-level policies\./g,
        "Policies target devices via filters and groups, and multiple policies can apply to a device. (Note: Site-level override is specifically a mechanism for Global Patch Management policies, not a generic rule for all policies)."
    ],
    [
        /RMM policies follow a hierarchy: Device > Site > Global\./g,
        "RMM policies use scopes (Global or Site) and target devices using filters or groups."
    ],
    [
        /Yes, removing the lower-level override allows the Global policy to apply cleanly\./g,
        "Yes, managing targets via explicit filters and groups is best practice, rather than relying on overlapping policy assignments."
    ],
    // Secure tunnel
    [
        /maintains a secure tunnel to the platform/g,
        "continues communicating with Datto RMM"
    ],
    [
        /maintains a secure tunnel back to the platform/g,
        "continues communicating with Datto RMM"
    ]
]);

replaceInFile('src/data/products/kaseya-365.ts', [
    // Policy hierarchy
    [
        /Site-level policies override Global policies/g,
        "Policies target devices via filters and groups (Site-level override specifically applies to Patch Management, not a generic rule)"
    ]
]);

// 4. Datto EDR & RMM (Ransomware Detection Supported & Ransomware Rollback)
replaceInFile('src/data/products/datto-edr.ts', [
    [
        /Ransomware Rollback action for the malicious process/g,
        "Ransomware Rollback action for the ransomware alert"
    ],
    [
        /revert file changes made by a specific malicious process/g,
        "revert file changes tied to a specific ransomware detection alert"
    ]
]);

console.log("Source fixes applied.");
