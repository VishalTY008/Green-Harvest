const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, PageBreak, Header, Footer,
  BorderStyle, TabStopType, WidthType, ShadingType } = require('docx');
const { buildContent } = require('./main-doc.js');

const OUTPUT = path.join(__dirname, '..', 'GreenHarvest-Documentation.docx');

async function main() {
  console.log('Building document content...');
  const children = buildContent();

  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
    children: [new TextRun({ text: '--- End of Document ---', size: 22, color: '999999', italics: true })],
  }));
  children.push(new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'GreenHarvest Agriculture Platform v1.0.0', size: 18, color: 'AAAAAA' })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Built with Node.js, Express, MongoDB, React, Vite, and Tailwind CSS', size: 18, color: 'AAAAAA' })],
  }));

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { size: 22, font: 'Inter' },
          paragraph: { spacing: { after: 120, line: 276 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'GreenHarvest Agriculture Platform - Technical Documentation', size: 16, color: '999999', italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Page ', size: 16, color: '999999' }), new TextRun({ text: '| Confidential', size: 16, color: '999999' })],
          })],
        }),
      },
      children,
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Document generated: ${OUTPUT}`);
  console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
