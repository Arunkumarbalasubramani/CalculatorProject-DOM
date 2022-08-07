
class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText =previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clearScreen();
    }
    clearScreen(){
        this.currentOperand ='';
        this.previousOperand = '';
        this.operator='undefined'
    }
    deleteNumber(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+ number.toString();
    }
    chooseOperation(operator){
      if(this.currentOperand ==='')return;
      if(this.previousOperand !==''){
        this.compute()
      }
      this.operator = operator;
      this.previousOperand =this.currentOperand + operator;
      this.currentOperand ='';
    }
    compute(){
        let result ;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
       if(isNaN(prev) || isNaN(curr)) return
       switch(this.operator){
        case '+': 
                result = prev + curr;
                break;
        case '-': 
                result = prev - curr;
                break;
        case 'X': 
                result = prev * curr;
                break;
        case '÷':
                result = prev / curr;
                 break;

         default: return ;
       }
       this.currentOperand = result;
       this.operator=undefined;
       this.previousOperand =''
       
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        this.previousOperandText.innerText = `${this.previousOperand}`
        
    }
    findPercentage(){
              this.previousOperand = this.currentOperand + '%';
              this.currentOperand = parseFloat(this.previousOperand)/100;
              this.updateDisplay();
            }
}
const calculatorDiv =document.createElement('div')
calculatorDiv.setAttribute('class','calculator-grid');

const outputDiv = document.createElement('div')
outputDiv.setAttribute('class','output-div');

const currentOperand = document.createElement('div');
currentOperand.setAttribute('class','current-operand');


const previousOperand = document.createElement('div')
previousOperand.setAttribute('class','previous-operand');


outputDiv.append(previousOperand,currentOperand,);
calculatorDiv.append(outputDiv);
document.body.append(calculatorDiv)

const buttons =['C','%','DEL','÷','7','8','9','X','4','5','6','-','1','2','3','+','00','0','.','=']
buttons.forEach((e)=>{
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('id',e);
    buttonElement.innerText =e;
    if( e ==='÷' || e ==='X'||e ==='-' || e ==='+'  ){
        buttonElement.setAttribute('class','data-operator');
    }else if(e === '%'){
                buttonElement.setAttribute('class','data-percent');
    }else if(e === 'C'){
        buttonElement.setAttribute('class','data-all-clear');
    }else if(e === 'DEL'){
        buttonElement.setAttribute('class','data-delete');
    }
    else if(e === '='){
        buttonElement.setAttribute('class','data-equals');
    }
    else{
        buttonElement.setAttribute('class','data-numbers');
    }
    calculatorDiv.append(buttonElement)
    
})

const numberButtons = document.querySelectorAll('.data-numbers')
const operatorButtons = document.querySelectorAll('.data-operator')
const deleteButton =document.querySelector('.data-delete');
const allClearbtn =document.querySelector('.data-all-clear');
const equalBtn =document.querySelector('.data-equals')
const percentageBtn =document.querySelector('.data-percent')
const previousOperandText = document.querySelector('.previous-operand')
const currentOperandText = document.querySelector('.current-operand')


const calculator = new Calculator(previousOperandText,currentOperandText)

allClearbtn.addEventListener('click',()=>{
        calculator.clearScreen();
        calculator.updateDisplay()
})
numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
});

equalBtn.addEventListener('click',()=>{
        calculator.compute();
        calculator.updateDisplay();
    })

deleteButton.addEventListener('click',()=>{
        calculator.deleteNumber();
        calculator.updateDisplay();
    })

percentageBtn.addEventListener('click',()=>{
    calculator.findPercentage();
    calculator.updateDisplay();
})




