import fs from "fs";

const files = [
  "src/components/garage-studio/GarageStudio.tsx",
  "src/components/outdoor-studio/OutdoorStudio.tsx",
  "src/components/primary-suite/PrimarySuiteStudio.tsx",
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");

  if (!s.includes("StudioWorkspace")) {
    s = s.replace(
      'import { SmartImage } from "@/components/SmartImage";',
      `import { SmartImage } from "@/components/SmartImage";
import {
  StudioChip,
  StudioControlGroup,
  StudioWorkspace,
} from "@/components/studios/StudioWorkspace";`,
    );
  }

  s = s.replace(
    /grid gap-6 lg:grid-cols-\[minmax\(0,1fr\)_minmax\(280px,360px\)\] lg:items-start/g,
    "studio-workspace-grid",
  );
  s = s.replace(
    /grid gap-6 lg:grid-cols-\[minmax\(0,1fr\)_minmax\(280px,340px\)\] lg:items-start/g,
    "studio-workspace-grid",
  );

  // Photo stage height
  s = s.replace(
    /relative mx-auto h-\[min\(260px,36vh\)\] w-full max-w-xl overflow-hidden rounded-xl border border-border shadow-\[0_12px_40px_rgba\(40,30,15,0\.1\)\] sm:h-\[min\(300px,38vh\)\]/g,
    "studio-model-stage relative",
  );

  // Configurator wrappers
  s = s.replace(
    /<div className="mx-auto w-full max-w-xl">\s*\n\s*<(GarageScene|OutdoorScene|SuiteScene)/g,
    '<div className="studio-model-stage">\n                  <$1',
  );
  s = s.replace(
    /<div className="mx-auto w-full max-w-2xl">\s*\n\s*<(GarageScene|OutdoorScene|SuiteScene)/g,
    '<div className="studio-model-stage">\n                  <$1',
  );

  // Left model column sticky wrapper (first space-y-4 in customize)
  // Only the first occurrence after studio-workspace-grid
  const gridIdx = s.indexOf('className="studio-workspace-grid"');
  if (gridIdx !== -1) {
    const after = s.slice(gridIdx);
    const replaced = after.replace(
      /(<div className="studio-workspace-grid">\s*\n\s*)<div className="space-y-4">/,
      `$1<div className="studio-model-column">\n            <div className="studio-model-sticky space-y-3">`,
    );
    s = s.slice(0, gridIdx) + replaced;
  }

  // Planning investment cards -> compact estimate
  s = s.replace(
    /<div className="space-y-4">\s*\n\s*<div className="card p-5">\s*\n\s*<p className="text-xs uppercase tracking-\[0\.14em\] text-text-dim">\s*\n\s*Planning investment/g,
    `<aside className="studio-sidebar" aria-label="Planning estimate and options">
            <div className="studio-sidebar-scroll space-y-2">
              <div className="studio-estimate-card">
                <p className="studio-estimate-label">
                  Planning investment`,
  );
  s = s.replace(
    /<div className="space-y-5">\s*\n\s*<div className="card p-5">\s*\n\s*<p className="text-xs uppercase tracking-\[0\.14em\] text-text-dim">\s*\n\s*Planning investment/g,
    `<aside className="studio-sidebar" aria-label="Planning estimate and options">
            <div className="studio-sidebar-scroll space-y-2">
              <div className="studio-estimate-card">
                <p className="studio-estimate-label">
                  Planning investment`,
  );
  s = s.replace(
    /className="mt-1 font-display text-3xl text-ivory(?: sm:text-4xl)?"/g,
    'className="studio-estimate-range"',
  );

  // Soften control cards used in FeatureGroup local components
  s = s.replace(
    /function FeatureGroup\(\{ label, children \}: \{ label: string; children: React\.ReactNode \}\) \{\s*return \(\s*<div className="card p-5">\s*<p className="text-sm font-medium text-ivory">\{label\}<\/p>\s*<div className="mt-3 flex flex-wrap gap-2">\{children\}<\/div>\s*<\/div>\s*\);\s*\}/g,
    `function FeatureGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="studio-control-group">
      <p className="studio-control-label">{label}</p>
      <div className="studio-control-chips">{children}</div>
    </div>
  );
}`,
  );

  // Soften Chip styles
  s = s.replace(
    /className=\{`inline-flex items-center gap-2 rounded-full border px-3 py-1\.5 text-xs transition \$\{\s*active\s*\?\s*"border-gold bg-gold\/10 text-gold-deep"\s*:\s*"border-border text-text-muted hover:border-gold\/40"\s*\}`\}/g,
    'className={`studio-chip ${active ? "studio-chip-active" : ""}`}',
  );

  // Close sticky + model column before sidebar (extra wrapper opened)
  s = s.replace(
    /(\s*)<\/div>\s*\n(\s*)<aside className="studio-sidebar"/g,
    `$1</div>\n$1</div>\n$2<aside className="studio-sidebar"`,
  );

  // Close sidebar scroll + aside at end of customize: replace last CTA block closing
  // Find pattern: flex wrap gap-3 ... </div></div></div> near end of customize
  // Safer: after ToolLeadGate CTAs, original ends with </div></div> for sidebar+grid
  // We opened sidebar + sidebar-scroll, so need </div></aside> instead of final sidebar </div>
  s = s.replace(
    /(Schedule a consultation[\s\S]*?<\/Link>\s*<\/div>\s*)<\/div>\s*\n(\s*)<\/div>\s*\n(\s*)\)\}/g,
    `$1</div>\n            </aside>\n          </div>\n$3)}`,
  );

  fs.writeFileSync(f, s);
  console.log("patched", f);
}
