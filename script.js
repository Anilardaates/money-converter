let to = document.getElementById('to')
let from = document.getElementById('from')
let miktar = document.getElementById('miktar')
let btn= document.getElementById('button')
let zamanlayici = document.querySelector('.zamanlayici')
let geriSay = document.querySelector('.geriSay')
let animation = document.querySelector('.animation')

function selectOlustur(hangiSelect){
    for(let i of paraBirimleri){
        let option = document.createElement('option')
        option.textContent = `${i.symbol} ${i.name}`
        option.value = i.symbol
        to.append(option)
        hangiSelect.append(option)
    }
}
selectOlustur(to)
selectOlustur(from)



btn.addEventListener('click',function cevir(){
if((to.value!='Bir Para Birimi Seçiniz') && (from.value!='Bir Para Birimi Seçiniz')&&(miktar.value.trim()!='')){
    let api = `https://api.currencyapi.com/v3/latest?apikey=cur_live_Sbvs4ydKz5VsV09HSbaSqMHHkyoiclpLdDSCWaMp&currencies=${from.value}&base_currency=${to.value}`

fetch(api)    
.then(res => res.json())
.then( data => ekranaYazdir(data))

}
else{
    geriSay.textContent=3
    zamanlayici.classList.remove('d-none')
    let sayac = 3
    setInterval(() => {
        sayac--
        geriSay.textContent = sayac
    },1000);
    setTimeout(()=>{
        zamanlayici.classList.add('d-none')
        clearInterval(interval)
    },3000)
 
}
})

function ekranaYazdir(data){
    animation.classList.remove('d-none')
    
    let toSymbol = document.querySelector('.toSymbol')
    let toMoney= document.querySelector('.toMoney')
   
    let fromSymbol = document.querySelector('.fromSymbol')
    let fromMoney= document.querySelector('.fromMoney')

    let birim = from.value
    let money = data.data[birim].value
    let sonuc = (money * Number(miktar.value)).toFixed(2)

    toSymbol.textContent = to.value
    fromSymbol.textContent = from.value

    toMoney.textContent = miktar.value
    fromMoney.textContent = sonuc




    
}





