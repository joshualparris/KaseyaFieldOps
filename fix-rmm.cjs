const fs = require('fs');

let rmm = fs.readFileSync('src/data/products/datto-rmm.ts', 'utf8');

rmm = rmm.replace(
    'Yes, removing the lower-level override allows the Global policy to apply correctly.', 
    'Yes, managing targets via explicit filters and groups is best practice, rather than relying on overlapping policy assignments.'
);

rmm = rmm.replace(
    'It is much more likely an override exists.', 
    'It is much more likely a conflicting policy exists.'
);
rmm = rmm.replace(
    'A Device-level override was placed on all servers at Client A.', 
    'A specific policy was assigned directly targeting all servers at Client A.'
);
rmm = rmm.replace(
    "If it\\'s not at the Site level, individual Device-level overrides are the next place to look.", 
    "If it\\'s not a site-wide policy, individual explicit device targeting is the next place to look."
);

rmm = rmm.replace(
    'Site-level patch override conflict', 
    'Site-level patch policy conflict'
);
rmm = rmm.replace(
    'a site-level override contradicts it', 
    'a site-level policy contradicts it'
);

rmm = rmm.replace(
    'Correct. Site-level policies override Global policies.', 
    'Correct. For Patch Management, Datto explicitly documents a Site-level override mechanism for Global Patch Management policies.'
);

rmm = rmm.replace(
    'Another technician likely created a custom schedule for Client A that overrides the global default.', 
    'Another technician likely created a custom Site-level patch policy for Client A that overrides the global default.'
);

rmm = rmm.replace(
    'Tracing the policy hierarchy (Global < Site < Device) is critical for troubleshooting unexpected behavior.', 
    'Tracing the specific Patch Management override behaviour is critical for troubleshooting unexpected patching schedules.'
);

rmm = rmm.replace(
    'Global level is overridden by Site level, which is overridden by Device level.', 
    'Policies are generally applied by scope (Global or Site) using filters and groups, rather than a strict global/site/device generic hierarchy.'
);

rmm = rmm.replace(
    'Site-level patch policies always override Global-level patch policies.', 
    'Datto explicitly documents a Site-level override mechanism for Global Patch Management policies.'
);

fs.writeFileSync('src/data/products/datto-rmm.ts', rmm);
console.log('Fixed datto-rmm.ts hierarchy issues');
