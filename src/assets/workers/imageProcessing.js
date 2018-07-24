require('globals');
const OCRPlugin = require("nativescript-ocr");
const ocr = new OCRPlugin.OCR();
const ImageSource = require('tns-core-modules/image-source/image-source').ImageSource;

 global.onmessage = function(url){
     let img = new ImageSource();
     console.log(url.data);
    img.fromFile(url.data)
        .then(success => {
            if (success) {
                
                ocr.retrieveText({
                    image: img,
                    // language: 'rus',
                    whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890АБВГДЕЁЖЗИЙКЛМНІЄЇОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзиїєійклмнопрстуфхцчшщъыьэюя(),!?-",     // you can include only certain characters in the result
                    // blacklist: "0123456789",
                    onProgress: (percentage) => {
                        console.log(`Decoding progress: ${percentage}%`);
                        postMessage({done: false, percentage});
                    }
                })
                    .then(RetrieveTextResult => {
                        console.log(`Result:`);
                        console.log(RetrieveTextResult.text);
                        postMessage({done: true, text: RetrieveTextResult.text})
                    }, (error) => {
                        console.log(`Error: ${error}`);
                        postMessage({ done: true, text: 'error happened during retrieving' });
                        console.log('not retrieved');
                        
                    })
                    .catch(console.error);
            }
            else {
               
                postMessage({done: true, text: 'error happened during recognition'});
                console.log('not successessive');
                console.log(url);
            }
        })
        .catch(err=> {
            postMessage({ done: true, text: 'error happened during recognition  '+error });
            
        })
}
