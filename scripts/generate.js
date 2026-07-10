const fs=require("fs"),path=require("path"),{Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,PageBreak,Header,Footer,TabStopType,BorderStyle}=require("docx");
const O=path.join(__dirname,"..","GreenHarvest-Docs-v2.docx");

var allContent=[];

function loadChapters(file){
 var d=JSON.parse(fs.readFileSync(path.join(__dirname,file),"utf8"));
 allContent=allContent.concat(d);
}

loadChapters("content1.json");
loadChapters("content2.json");
loadChapters("content3.json");
loadChapters("content4.json");
loadChapters("content5.json");
loadChapters("content6.json");
loadChapters("content7.json");

console.log("Loaded "+allContent.length+" chapters");

var totalOrg=0;
allContent.forEach(function(ch){ch.s.forEach(function(s){totalOrg+=s.p.length})});
console.log("Total original paragraphs: "+totalOrg);

function spacer(pts){return new Paragraph({spacing:{after:pts||200},children:[]})}

function bodyPara(t){
 return new Paragraph({
  spacing:{after:400,line:420},
  indent:{firstLine:480},
  children:[new TextRun({text:t,size:24,font:"Calibri"})]
 });
}

function bigH1(t){
 return new Paragraph({
  heading:HeadingLevel.HEADING_1,
  spacing:{before:480,after:240},
  border:{bottom:{color:"2E7D32",size:8,style:BorderStyle.SINGLE,space:4}},
  children:[new TextRun({text:t,bold:true,size:32,color:"2E7D32",font:"Calibri"})]
 });
}

function bigH2(t){
 return new Paragraph({
  heading:HeadingLevel.HEADING_2,
  spacing:{before:360,after:200},
  border:{bottom:{color:"A5D6A7",size:4,style:BorderStyle.SINGLE,space:2}},
  children:[new TextRun({text:t,bold:true,size:28,color:"388E3C",font:"Calibri"})]
 });
}

function bullet(t){
 return new Paragraph({
  spacing:{after:200,line:400},
  bullet:{level:0},
  children:[new TextRun({text:t,size:24,font:"Calibri"})]
 });
}

function buildContent(){
 var C=[];
 // Title page
 C.push(spacer(3000));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"GreenHarvest",size:72,color:"2E7D32",bold:true,font:"Calibri"})]}));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:200},children:[new TextRun({text:"Agriculture Platform",size:48,color:"4CAF50",bold:true,font:"Calibri"})]}));
 C.push(spacer(800));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Complete Technical Documentation",size:32,color:"555555",font:"Calibri"})]}));
 C.push(spacer(400));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Version 1.0.0",size:26,color:"888888",font:"Calibri"})]}));
 C.push(spacer(400));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"July 2026",size:26,color:"888888",font:"Calibri"})]}));
 C.push(spacer(1600));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"A full-stack agriculture management platform built with the MERN stack",size:22,color:"999999",font:"Calibri"})]}));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"MongoDB · Express.js · React · Node.js · Tailwind CSS",size:22,color:"999999",font:"Calibri"})]}));

 C.push(new Paragraph({children:[new PageBreak()]}));

 // Table of Contents
 C.push(bigH1("Table of Contents"));
 C.push(spacer(200));
 allContent.forEach(function(ch){
  C.push(new Paragraph({
   spacing:{after:120},
   children:[
    new TextRun({text:ch.n+". "+ch.t,size:24,font:"Calibri"})
   ]
  }));
 });
 C.push(new Paragraph({children:[new PageBreak()]}));

 // Chapter content
 var chNum=0;
 allContent.forEach(function(ch){
  chNum++;
  C.push(bigH1(ch.n+". "+ch.t));
  var secCount=0;
  ch.s.forEach(function(sec){
   secCount++;
   C.push(bigH2(sec.t));
   sec.p.forEach(function(p){C.push(bodyPara(p))});
   // Add a divider between sections
   C.push(new Paragraph({
    alignment:AlignmentType.CENTER,
    spacing:{before:200,after:200},
    children:[new TextRun({text:"* * *",size:20,color:"BBBBBB",font:"Calibri"})]
   }));
  });
  C.push(new Paragraph({children:[new PageBreak()]}));
 });

 // End matter
 C.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:1200},children:[new TextRun({text:"--- End of Document ---",size:26,color:"999999",italics:true,font:"Calibri"})]}));
 C.push(spacer(400));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"GreenHarvest Agriculture Platform v1.0.0",size:20,color:"AAAAAA",font:"Calibri"})]}));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Built with Node.js, Express, MongoDB, React, Vite, and Tailwind CSS",size:20,color:"AAAAAA",font:"Calibri"})]}));

 return C;
}

async function main(){
 var children=buildContent();
 var doc=new Document({
  styles:{
   default:{
    document:{
     run:{size:24,font:"Calibri"},
     paragraph:{spacing:{after:200,line:420}}
    }
   }
  },
  sections:[{
   properties:{
    page:{
     margin:{top:1440,bottom:1440,left:1440,right:1440}
    }
   },
   headers:{
    default:new Header({
     children:[new Paragraph({
      alignment:AlignmentType.RIGHT,
      border:{bottom:{color:"CCCCCC",size:2,style:BorderStyle.SINGLE,space:4}},
      children:[new TextRun({text:"GreenHarvest Agriculture Platform - Technical Documentation",size:18,color:"999999",italics:true,font:"Calibri"})]
     })]
    })
   },
   footers:{
    default:new Footer({
     children:[new Paragraph({
      alignment:AlignmentType.CENTER,
      children:[
       new TextRun({text:"Page ",size:18,color:"999999",font:"Calibri"}),
       new TextRun({text:"| Confidential",size:18,color:"999999",font:"Calibri"})
      ]
     })]
    })
   },
   children:children
  }]
 });
 var buffer=await Packer.toBuffer(doc);
 fs.writeFileSync(O,buffer);
 console.log("Document generated: "+O);
 console.log("File size: "+(buffer.length/1024).toFixed(0)+" KB");
}
main().catch(console.error);