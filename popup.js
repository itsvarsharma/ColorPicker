const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue= document.querySelector('.colorValue');

btn.addEventListener('click',async()=>{
    chrome.storage.sync.get('color',({color})=>{
        console.log('color: ',color);
    });
    let [tab] = await chrome.tabs.query({active:true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        function: pickColor,
    },
    async(injectionResults)=>{
        const color = data.result.sRGBHex;
        colorGrid.computedStyleMap.backgroundColor = color;
        colorValue.innerText = color;
        try{
            await navigator.clipboard.writeText(color);
        }
    });

});

async function pickColor(){
    try{
        const eyeDropper= new EyeDropper();
        const selectColor = await eyeDropper.open();
        
    }catch(err){
        console.error(err);
    }
}