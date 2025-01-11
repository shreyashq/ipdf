import {jsPDF} from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm";

const input = document.getElementById('file-input');
const btn = document.getElementById('generate-pdf');
let images = []; // khalia arr to store data

//file ka upload handle
input.addEventListener('change', (e)=> {
    images = Array.from(e.target.files);
});


btn.addEventListener('click', async()=>{


    if(images.length === 0){
        alert('Upload atleast one image');
        return;
    }


    const pdf = new jsPDF();

    for(let i=0; i< images.length; i++){

        const imgData = await readFileAsDataURL(images[i]);
        pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);
        
        if(i < images.length - 1){
            pdf.addPage();
        }
    }


    pdf.save('output.pdf');


    //read fileasbase64
    function readFileAsDataURL(file){
        return new Promise((resolve, reject) => {


            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);

            reader.readAsDataURL(file);

        });
    }

});