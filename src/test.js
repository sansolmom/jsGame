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
    //return Math.pow(a, b);
    var output = 1;
    for(var i=0; i < b ; i++){
      output = output * a;
    }

    return output;
  }  
}
power(2);

function multiply(...numbers){
  const arr=[...numbers];
  return arr.reduce((a,b) => a*b);
}

function multiply2(){
  var output = 1;
  for(var i = 0 ; i< arguments.length; i++){
    output = output * arguments[i];
  }
  return output;
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



  // 변수를 선언합니다. 
  var primitiveNumber = 273;   //기본 숫자 자료형
  var objectNumber = new Number(273);   //객체 

  //메서드 추가 
 Number.prototype.method = function(){
     return 'Method on Prototype';
 }
 //메서드 실행 
 var output = '';
 output += primitiveNumber.method() + '\n';
 output += objectNumber.method();
 //출력합니다. 
 alert(output);


 var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

var allNames = friends.map.call(friends, function(obj){ return obj.name}); 


console.log(allNames);


let arr = ['Anna','Bob','Silvia','Anna','James'];
let result = arr.sort().reduce((accumulator, current) => {
   const length = accumulator.length
   if(length == 0 || accumulator[length-1] !== current) {
     accumulator.push(current)
   }
   return accumulator;
}, []);

console.log(result);
