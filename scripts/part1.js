// PART 1 - Helpers + Chapters 1-7
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, PageBreak, Header, Footer,
  BorderStyle, TabStopType, WidthType, ShadingType } = require('docx');

const OUTPUT = path.join(__dirname, 'output.docx');
const HN = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 };

function h(l, t) { return new Paragraph({ heading: HN[l], spacing: { before: l===1?360:280, after: 160 }, children: [new TextRun({ text: t, bold: true, size: l===1?26:24 })] }); }
function p(t) { return new Paragraph({ spacing: { after: 100, line: 276 }, children: [new TextRun({ text: t, size: 20 })] }); }
function pb(b, t) { return new Paragraph({ spacing: { after: 100, line: 276 }, children: [new TextRun({ text: b, bold: true, size: 20 }), new TextRun({ text: t, size: 20 })] }); }
function bul(t) { return new Paragraph({ spacing: { after: 50, line: 264 }, bullet: { level: 0 }, children: [new TextRun({ text: t, size: 20 })] }); }
function sp(n) { return new Paragraph({ spacing: { after: n||200 }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function ct(t, s, c) { return new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, size: s||20, color: c||'000000' })] }); }
function tb(hd, rw) { return new Table({ rows: [new TableRow({ tableHeader: true, children: hd.map(h=>new TableCell({width:{size:Math.round(100/hd.length),type:WidthType.PERCENTAGE},shading:{type:ShadingType.CLEAR,fill:'2E7D32'},children:[new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:40,after:40},children:[new TextRun({text:h,bold:true,color:'FFFFFF',size:17})]})]}))}),...rw.map((row,ri)=>new TableRow({children:row.map((cell,ci)=>new TableCell({width:{size:Math.round(100/hd.length),type:WidthType.PERCENTAGE},shading:ci===0?{type:ShadingType.CLEAR,fill:ri%2===0?'F0F7ED':'FAFAFA'}:(ri%2===0?{type:ShadingType.CLEAR,fill:'F8F8F8'}:undefined),children:[new Paragraph({spacing:{before:30,after:30},children:[new TextRun({text:String(cell),size:17})]})]}))}))]})]); }

function buildContent() {
  const c = [];
  sp = (n) => { c.push(new Paragraph({ spacing: { after: n||200 }, children: [] })); };
  pb = () => { c.push(new Paragraph({ children: [new PageBreak()] })); };
