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

const submitBtn = document.getElementById("submitBtn");
const convertBtnEpub = document.getElementById("convertBtnEpub");
const convertBtnDocx = document.getElementById("convertBtnMobi");
const convertBtnMobi = document.getElementById("convertBtnMobi");

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
