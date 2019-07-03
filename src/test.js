function test(a,b,c){
  //매개변수를 초기화 합니다. 
  b= b || 52;
  c= c || 273
  alert(a+' : '+b+' : '+c);
}

test(1,2);


//es6
function test2(a, b=52, c=273){
  alert(a+' : '+b+' : '+c);
}

test2(1,2);

function power(a,b) {
  if(b === null || b === undefined || b ===''){
    return a*a;
  }else{
    return Math.pow(a, b);
  }  
}
power(2);

function multiply(...numbers){
  const arr=[...numbers];
  return arr.reduce((a,b) => a*b);
}


const product = {
  price:'10,000원',
  name: 'product_001',
  language : '한국어',
  subscription: true
};

let output = '';
for(let key in product) {
  output += '*'+key+' : '+product[key] + '\n';
}

alert(output);