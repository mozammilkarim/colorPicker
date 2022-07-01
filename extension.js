const colorBtn= document.querySelector('#selectColorBtn');
const colorValue= document.querySelector(".colorValue");
const colorGrid= document.querySelector(".colorGrid");
colorBtn.addEventListener('click',async ()=>{
    // to get the details of current tab opened
    let [tab]=await chrome.tabs.query({active:true,currentWindow:true});
    // console.log(tab);
    // to execute some script in other tabs
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function:pickColor
    }, async(injectionResults)=>{
        // the result of pickColor function will come to extension window
        // destructuring the results
        const [data]=injectionResults;
        // console.log(data);
        if(data.result){
            const color=data.result.sRGBHex;
            colorGrid.style.backgroundColor=color;
            colorValue.textContent=color;
            // to copy color value in clipboard
            try {
                await navigator.clipboard.writeText(color);
            } catch (error) {
                console.log(error);
            }
        }
    })
})
// this will run on main tab
async function pickColor(){
    try {
       const eyeDropper= new EyeDropper();
       const selectedColor= await eyeDropper.open();
       return selectedColor;
    //    console.log(selectedColor)
    } catch (error) {
        console.log(error);
    }
}