function buildContent() {
  const c = [];
  function sp(n) { c.push(new (require("docx")).Paragraph({ spacing: { after: n || 200 }, children: [] })); }
  function pb() { c.push(new (require("docx")).Paragraph({ children: [new (require("docx")).PageBreak()] })); }
  function h(l, t) { c.push(new (require("docx")).Paragraph({ heading: [null, require("docx").HeadingLevel.HEADING_1, require("docx").HeadingLevel.HEADING_2, require("docx").HeadingLevel.HEADING_3][l], spacing: { before: 360, after: 160 }, children: [new (require("docx")).TextRun({ text: t, bold: true, size: l === 1 ? 26 : 24 })] })); }
  function p(t) { c.push(new (require("docx")).Paragraph({ spacing: { after: 100, line: 276 }, children: [new (require("docx")).TextRun({ text: t, size: 20 })] })); }
  function pbld(b, t) { c.push(new (require("docx")).Paragraph({ spacing: { after: 100, line: 276 }, children: [new (require("docx")).TextRun({ text: b, bold: true, size: 20 }), new (require("docx")).TextRun({ text: t, size: 20 })] })); }
  function bul(t) { c.push(new (require("docx")).Paragraph({ spacing: { after: 50, line: 264 }, bullet: { level: 0 }, children: [new (require("docx")).TextRun({ text: t, size: 20 })] })); }
  function ct(t, sz, cl) { c.push(new (require("docx")).Paragraph({ alignment: require("docx").AlignmentType.CENTER, children: [new (require("docx")).TextRun({ text: t, size: sz || 20, color: cl || "000000" })] })); }

  // ===== TITLE PAGE =====
  sp(2500);
  ct("GreenHarvest", 56, "2E7D32");
  ct("Agriculture Platform", 40, "4CAF50");
  sp(600);
  ct("Complete Technical Documentation", 28, "666666");
  sp(400);
  ct("Version 1.0.0", 22, "999999");
  sp(1200);
  ct("A full-stack agriculture management platform built with the MERN stack", 20, "888888");
  pb();

  // ===== TABLE OF CONTENTS =====
  h(1, "Table of Contents");
  sp(100);
  const toc = [["01","Introduction"],["02","Project Architecture"],["03","Technology Stack"],["04","Environment Setup & Installation"],["05","Backend Entry Point & Configuration"],["06","Database Models & Schemas"],["07","API Routes & Controllers"],["08","Middleware & Utilities"],["09","Frontend Structure & Entry Points"],["10","Context Providers & State Management"],["11","Routing & Page Components"],["12","Common Components & Hooks"],["13","Admin Panel Deep Dive"],["14","Animations & Theming"],["15","Full API Reference"],["16","Authentication & Authorization Flow"],["17","Security Architecture"],["18","Deployment Guide"],["19","Production Readiness Checklist"],["20","Future Enhancements & Roadmap"]];
  toc.forEach(([num, title]) => {
    const dots = ".".repeat(Math.max(2, 65 - num.length - title.length));
    c.push(new (require("docx")).Paragraph({ spacing: { after: 30 }, tabStops: [{ type: require("docx").TabStopType.RIGHT, position: 9360 }], children: [new (require("docx")).TextRun({ text: num + ". " + title, size: 20 }), new (require("docx")).TextRun({ text: " " + dots + " ", size: 18, color: "CCCCCC" })] }));
  });
  pb();
