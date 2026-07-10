// Content data for the documentation generator
// Each chapter has a title function and a content function that returns paragraphs

const { Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, PageBreak, BorderStyle, WidthType, ShadingType } = require('docx');

function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, children: [new TextRun({ text: t, bold: true, size: 26 })] }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 120 }, children: [new TextRun({ text: t, bold: true, size: 24 })] }); }
function h3(t) { return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: t, bold: true, size: 22 })] }); }
function p(...r) { return new Paragraph({ spacing: { after: 100, line: 276 }, children: r.map(x => typeof x === 'string' ? new TextRun({ text: x, size: 20 }) : x) }); }
function b(t) { return new TextRun({ text: t, bold: true, size: 20 }); }
function i(t) { return new TextRun({ text: t, italics: true, size: 20 }); }
function bul(t) { return new Paragraph({ spacing: { after: 50, line: 264 }, bullet: { level: 0 }, children: [new TextRun({ text: t, size: 20 })] }); }
function sbul(t) { return new Paragraph({ spacing: { after: 40, line: 260 }, bullet: { level: 1 }, children: [new TextRun({ text: t, size: 19 })] }); }
function sp(pts) { return new Paragraph({ spacing: { after: pts || 200 }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function cb(code) {
  const lines = typeof code === 'string' ? code.split('\n') : code;
  return new Paragraph({
    spacing: { before: 80, after: 80 }, indent: { left: 300 },
    shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' } },
    children: lines.flatMap((ln, i, a) => [new TextRun({ text: ln + (i < a.length - 1 ? '\n' : ''), font: 'Consolas', size: 16, color: '1E1E1E' })]),
  });
}
function tbl(headers, rows) {
  return new Table({ rows: [
    new TableRow({ tableHeader: true, children: headers.map(h => new TableCell({ width: { size: Math.round(100 / headers.length), type: WidthType.PERCENTAGE }, shading: { type: ShadingType.CLEAR, fill: '2E7D32' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 17 })] })] })) }),
    ...rows.map((row, ri) => new TableRow({ children: row.map((cell, ci) => new TableCell({ width: { size: Math.round(100 / headers.length), type: WidthType.PERCENTAGE }, shading: ci === 0 ? { type: ShadingType.CLEAR, fill: ri % 2 === 0 ? 'F0F7ED' : 'FAFAFA' } : (ri % 2 === 0 ? { type: ShadingType.CLEAR, fill: 'F8F8F8' } : undefined), children: [new Paragraph({ spacing: { before: 30, after: 30 }, children: [new TextRun({ text: String(cell), size: 17 })] })] })) })),
  ] });
}
function center(t, size, color) { return new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, size: size || 20, color: color || '000000' })] }); }

module.exports = { h1, h2, h3, p, b, i, bul, sbul, sp, pb, cb, tbl, center };
