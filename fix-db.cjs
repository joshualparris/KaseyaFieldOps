const fs = require('fs');
let content = fs.readFileSync('src/data/products/datto-backup.ts', 'utf8');

content = content.replace(
  'The VM will BSOD (often INACCESSIBLE_BOOT_DEVICE). The controller can be changed in the agent settings.',
  'The VM may BSOD (often INACCESSIBLE_BOOT_DEVICE or 0x7B). Datto recommends testing SATA, SCSI, or VirtIO storage controllers in the agent settings depending on OS compatibility.'
);

content = content.replace(
  'Anomalous change patterns (large sudden deltas) in the backup footprint, distinct from EDR endpoint detection.',
  'Patterns of changes in specific file types, such as random overwrites and ransomware-like modification behaviour.'
);

content = content.replace(
  'Changed default controller to VirtIO in agent settings.',
  'Tested different storage controllers and found SATA/SCSI/VirtIO resolved the boot failure.'
);

content = content.replace(
  "Default IDE isn't always right for modern OS.",
  'Storage controller incompatibility can cause 0x7B boot failures; test SATA/SCSI/VirtIO options.'
);

fs.writeFileSync('src/data/products/datto-backup.ts', content);
console.log('Fixed');
