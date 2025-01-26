import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm";

const input = document.getElementById("file-input");
const btn = document.getElementById("generate-pdf");
let images = []; // khalia arr to store data

//file ka upload handle
input.addEventListener("change", (e) => {
  images = Array.from(e.target.files);
});

btn.addEventListener("click", async () => {
  if (images.length === 0) {
    alert("Upload atleast one image");
    return;
  }

  const pdf = new jsPDF();

  for (let i = 0; i < images.length; i++) {
    const imgData = await readFileAsDataURL(images[i]);
    pdf.addImage(imgData, "JPEG", 10, 10, 190, 0);

    if (i < images.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save("output.pdf");

  //read fileasbase64
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);

      reader.readAsDataURL(file);
    });
  }
});

//UNDER CONSTRUCTION FROM HERE
const submitBtn = document.getElementById("submitBtn");
const convertBtnEpub = document.getElementById("convertBtnEpub");
const convertBtnDocx = document.getElementById("convertBtnDocx");
const convertBtnMobi = document.getElementById("convertBtnMobi");

//disable all convert buttons by default
convertBtnEpub.disabled = true;
convertBtnDocx.disabled = true;
convertBtnMobi.disabled = true;

//convert button wont be clicked unless file uploaded
const fileInputEpub = document.getElementById("fileInputEpub");
const fileInputDocx = document.getElementById("fileInputDocx");
const fileInputMobi = document.getElementById("fileInputMobi");

//enabling Epub Convert button on file upload
fileInputEpub.addEventListener("change", () => {
  if (fileInputEpub.files.length > 0) {
    convertBtnEpub.disabled = false;
  } else {
    convertBtnEpub.disabled = true;
  }
});

//enabling Docx Convert button on file upload
fileInputDocx.addEventListener("change", () => {
  if (fileInputDocx.files.length > 0) {
    convertBtnDocx.disabled = false;
  } else {
    convertBtnDocx.disabled = "true";
  }
});

//enabling Mobi Convert on file upload
fileInputMobi.addEventListener("change", () => {
  if (fileInputMobi.files.length > 0) {
    convertBtnMobi.disabled = false;
  } else {
    convertBtnMobi.disabled = "true";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //Functions for file convertions
  //Epub to Pdf
  convertBtnEpub.addEventListener("click", () => {
    console.log("inside epub");
  });

  //Mobi to Pdf
  convertBtnMobi.addEventListener("click", () => {
    console.log("inside mobi");
  });

  //Docx to Pdf
  convertBtnDocx.addEventListener("click", () => {
    console.log("inside docx");
  });

  submitBtn.addEventListener("click", () => {
    const value = document.getElementById("fileFormat").value;
    console.log(value);

    //Toggling classes based on user selection
    const epubClass = document.querySelector(".epub");
    const docxClass = document.querySelector(".docx");
    const mobiClass = document.querySelector(".mobi");

    if (value === "epub") {
      //remove existing classes
      docxClass.classList.remove("show");
      mobiClass.classList.remove("show");

      epubClass.classList.toggle("show");
    }

    if (value === "docx") {
      //remove existing classes
      epubClass.classList.remove("show");
      mobiClass.classList.remove("show");

      docxClass.classList.toggle("show");
    }

    if (value === "mobi") {
      //remove existing classes
      docxClass.classList.remove("show");
      epubClass.classList.remove("show");

      mobiClass.classList.toggle("show");
    }
  });
});
