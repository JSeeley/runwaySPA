// Selecting UI Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const yesButton4 = document.getElementById('yes-btn4')
const noButton4 = document.getElementById('no-btn4')
const yesButton5 = document.getElementById('yes-btn5')
const noButton5 = document.getElementById('no-btn5')
const yesButton6 = document.getElementById('yes-btn6')
const noButton6 = document.getElementById('no-btn6')
const calculateButton = document.getElementById('calculate-btn')
const yesButton8 = document.getElementById('yes-btn8')
const noButton8 = document.getElementById('no-btn8')
const yesButton9 = document.getElementById('yes-btn9')
const noButton9 = document.getElementById('no-btn9')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const inputContainerElement = document.getElementById('input-container')
const inputValue = document.getElementById('input')
const finances = document.getElementById('finances')
const controls = document.getElementById('controls')

// Event listeners for the start and next buttons.
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)
yesButton4.addEventListener('click', nextQuestion)
noButton4.addEventListener('click', skipQuestion5)
yesButton5.addEventListener('click', nextQuestion)
noButton5.addEventListener('click', nextQuestion)
yesButton6.addEventListener('click', failQuestion)
noButton6.addEventListener('click', nextQuestion)
calculateButton.addEventListener('click', nextQuestion)
yesButton8.addEventListener('click', nextQuestion)
noButton8.addEventListener('click', failQuestion)
yesButton9.addEventListener('click', failQuestion)
noButton9.addEventListener('click', nextQuestion)

// the static object data that will be injected as the user advances through the single page application.
const questions = [
  {
    levelType: 'expenses',
    question: 'How much are your monthly expenses?',
  },
  {
    levelType: 'income',
    question: 'What is your monthly income?',
    successCopy: 'Level 1 Complete! You make more than you spend.',
    failCopy: 'You earn blankAmount per month, but spend blankAmount. Here are some ideas on how to get your monthly income to be more than your expenses and to pass level 1.',
  },
  {
    levelType: 'cash',
    question: 'How much money do you have in the bank?',
    success1000Copy: 'Level 2 Complete! You have enough in the bank to cover a $1,000 emergency such as short-term job loss.',
    successCopy: 'Level 2 Complete! You have enough cash in the bank to cover one month of expenses.',
    failCopy: 'Game over. You do not have enough cash to cover a short-term emergency like losing your job.',
  },
  {
    question: 'Does your employer have a 401k Employer Match? If you are not sure, click No.',
    successCopy: 'Level 3 Complete! That was an easy one :)'
  },
  {
    question: 'Do you contribute enough to your 401k to take full advantage of your employer match? For example if they match the first $2,000 you contribute, do you contribute at least $2,000 per year?',
    successCopy: 'Level 3 Complete! Keep getting that free money!',
    failCopy: 'Level 3 Failed - This should be a straight forward fix. Start contributing a portion of your paycheck to your 401k that at the end of the year will add up to the amount your employer matches. This will allow you to take advantage of "free money" that your employer is offering you.'
  },
  {
    levelType: 'highdebt',
    question: 'Do you have any debt that you pay more than 10% interest on? For example an overdue credit card that charges 18% interest.',
    successCopy: 'Level 4 Complete! Avoiding high interest debt is VERY important!',
    failCopy: 'Your $<high_interest_debt> of high interest debt is your biggest enemy to getting your money right. It may take time, but working hard to pay this off is a top priority.. You do not have enough cash to cover a short-term emergency like losing your job.',
  },
  {
    levelType: 'emergencyfund',
    question: "The next level is having an emergency fund that will last you six months. Let's calculate that now...",
    successCopy: 'Level 5 Complete! You have a an "Emergency fund" of more than six monthes of your monthly expenses saved up. This will be useful if you lose your job or experience a financial emergency.',
    success6000Copy: 'Level 5 Complete! By keeping your monthly expenses low and having over $6000 in your bank account, you have a healthy "Emergency Fund" if you were to lose your job or experience a number of financial emergencies.',
    failCopy: 'You do not have a large enough emergency fund.',
  },
  {
    levelType: 'emergencyfundSell',
    missingEF: '',
    question: 'Do you have assets that could be easily sold in an emergency that total more than $<missingEFAMount>?',
    successCopy: 'Level 5 Complete! You have a an "Emergency fund" of more than six monthes of your monthly expenses saved up. This will be useful if you lose your job or experience a financial emergency.',
    failCopy: 'Your $<low_interest_debt> of low interest debt will be a continued growing expense.',
  },
  {
    levelType: 'lowdebt',
    question: 'Do you have any debt that you pay more than 5% on? For example a car loan.',
    successCopy: 'Level 6 Complete! Avoiding debt is important!',
    failCopy: 'Your $<low_interest_debt> of low interest debt will be a continued growing expense.',
  },
  {
    levelType: 'Q10',
    question: 'Question 10',
    successCopy: 'Level 7 Complete! ',
    failCopy: 'Fail level 7',
  }  
]

// Creating variable to keep track of what question the user is on
let currentQuestionIndex = 0

// Unhides interface elements and sets the first question
function startGame() {
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  inputContainerElement.classList.remove('hide')
  nextButton.classList.remove('hide')
  questionElement.innerText = questions[currentQuestionIndex].question
}

// What runs when a user clicks next. Probably needs a new name.
function nextQuestion() {
  // Throws an error if the value field is blank
  if(inputValue.value === '' && currentQuestionIndex != 2 && currentQuestionIndex != 3) {
    alert('Add an amount');
  }
  // Using if functions to determine what part of the game they are on. Based on their input, we run a calculation to see if they passed the level.
  if (currentQuestionIndex === 0) {
    // Stores key:value in localstorage. Key = type of value user just input. Value = What they input.
    storeTaskInLocalStorage((questions[currentQuestionIndex].levelType), (inputValue.value));
    displayNextQuestion()
  } else if (currentQuestionIndex === 1) {
    // Stores key:value in localstorage. Key = type of value user just input. Value = What they input.
    storeTaskInLocalStorage((questions[currentQuestionIndex].levelType), (inputValue.value));
    // Get income and expenses values and send them to a "Calculate Monthly Profit" function
    let expenses = Number(JSON.parse(localStorage.getItem('expenses')));
    let income = inputValue.value;
    if (income > expenses) {
      // Show success copy which includes the calculation.
      //Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'finances-item';
      // Appends the label to the finances item
      li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
      // Append li to ul
      finances.appendChild(li);
      displayNextQuestion();
    } else {
      // display failed level copy and end game
      console.log('failed level 1')
      //Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'finances-item';
      // Appends the label to the finances item
      li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
      // Append li to ul
      finances.appendChild(li);
      gameOver()
    }
  } else if (currentQuestionIndex === 2) {
    // Stores key:value in localstorage. Key = type of value user just input. Value = What they input.
    storeTaskInLocalStorage((questions[currentQuestionIndex].levelType), (inputValue.value));
    let expenses = Number(JSON.parse(localStorage.getItem('expenses')));
    cash = inputValue.value;
    if (1000 > expenses) {
      if (cash > 1000) {
        //Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'finances-item';
        // Appends the label to the finances item
        li.appendChild(document.createTextNode(questions[currentQuestionIndex].success1000Copy));
        // Append li to ul
        finances.appendChild(li);
      } else{
        //Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'finances-item';
        // Appends the label to the finances item
        li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
        // Append li to ul
        finances.appendChild(li);
        gameOver()
      }
    } else {
        if (cash > expenses) {
          //Create li element
          const li = document.createElement('li');
          // Add class
          li.className = 'finances-item';
          // Appends the label to the finances item
          li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
          // Append li to ul
          finances.appendChild(li);
        } else {
            //Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'finances-item';
            // Appends the label to the finances item
            li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
            // Append li to ul
            finances.appendChild(li);
            gameOver()
        }
    }
    // Displays next question as a Yes or No question
    displayQuestion4()
    // displayNextQuestion()
  } else if (currentQuestionIndex === 3) {
    displayQuestion5()
  }
  else if (currentQuestionIndex === 4) {
    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'finances-item';
    // Appends the label to the finances item
    li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
    // Append li to ul
    finances.appendChild(li);
    displayQuestion6()
  }
  else if (currentQuestionIndex === 5) {
    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'finances-item';
    // Appends the label to the finances item
    li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
    // Append li to ul
    finances.appendChild(li);
    displayQuestion7()
  } 
  else if (currentQuestionIndex === 6) {
    let expenses = Number(JSON.parse(localStorage.getItem('expenses')));
    let cash = Number(JSON.parse(localStorage.getItem('cash')));
    console.log('this is cash: ' + (cash) + ' and this is expenses: ' + (expenses));
    // Emergency funds should be 6 months of expenses, so this 
    if (expenses < 1000) {
      eFundSize = 6000
      if (cash > eFundSize) {
        // Skips question 8 about liquid investments to cover emergency expenses
        skipQuestion8();
      } else {
        //Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'finances-item';
        // Appends the label to the finances item
        li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
        
        // UNFINISHED stuff aorund asking user if they have liquid assets to cover 6 month emergency fund.
        // let missingEFAmount = eFundSize - cash;
        // console.log(missingEFAmount);
        // questions[8.missingEF].push(missingEFAmount);
        // console.log(questions[8].missingEF);
        // displayQuestion8();
        gameOver();
      }

    } else {
      eFundSize = expenses * 6
      if (cash > eFundSize) {
        skipQuestion8();
      } else {
        //Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'finances-item';
        // Appends the label to the finances item
        li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
        gameOver();
      }
    }

  }
  else if (currentQuestionIndex === 7) {
    console.log('question 8')
    // displayNextQuestion()
  }
  else if (currentQuestionIndex === 8) {
    console.log('question 9')
    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'finances-item';
    // Appends the label to the finances item
    li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
    // Append li to ul
    finances.appendChild(li);
    //Move on
    displayNextQuestion();
  }
  else if (currentQuestionIndex === 9) {
    console.log('question 10')
  }

  
  else {
    console.log('final else ran... something must be wrong with your program!')
  }
}

// Store Task in LS
function storeTaskInLocalStorage(level, levelInput) {
  localStorage.setItem(level, JSON.stringify(levelInput));
}

// Populates copy for the next question and displays it
function displayNextQuestion(){
  //Increments to the next question
  currentQuestionIndex++
  // Clear input
  inputValue.value = '';
  //Focuses the cursor on the next input box
  inputValue.focus();
  // Displays the next question
  questionElement.innerText = questions[currentQuestionIndex].question
}

function displayQuestion4(){
  //Increments to the next question
  currentQuestionIndex++
  //Hides input container
  inputContainerElement.classList.add('hide')
  // Displays the next question
  questionElement.innerText = questions[currentQuestionIndex].question
  // Hides Next Button
  nextButton.classList.add('hide')
  // Shows Yes Button
  yesButton4.classList.remove('hide')
  // Shows No Button
  noButton4.classList.remove('hide')
}

function displayQuestion5(){
  //Increments to the next question
  currentQuestionIndex++
  // Displays the next question
  questionElement.innerText = questions[currentQuestionIndex].question
  // Hides Yes Button from Q4
  yesButton4.classList.add('hide')
  // Hides No Button from Q4
  noButton4.classList.add('hide')
  // Shows Yes Button for Q5
  yesButton5.classList.remove('hide')
  // Shows No Button for Q5
  noButton5.classList.remove('hide')
}

function displayQuestion6(){
  //Increments to the next question
  currentQuestionIndex++
  // Displays the next question
  questionElement.innerText = questions[currentQuestionIndex].question
  // Hides Yes Button from Q5
  yesButton5.classList.add('hide')
  // Hides No Button from Q5
  noButton5.classList.add('hide')
  // Shows Yes Button for Q6
  yesButton6.classList.remove('hide')
  // Shows No Button for Q6
  noButton6.classList.remove('hide')
}

function displayQuestion7(){
  //Increments to the next question
  currentQuestionIndex++
  // Displays the next question
  questionElement.innerText = questions[currentQuestionIndex].question
  // Hides Yes Button from Q6
  yesButton6.classList.add('hide')
  // Hides No Button from Q6
  noButton6.classList.add('hide')
  // Shows calcuate button
  calculateButton.classList.remove('hide')
}

function displayQuestion8() {
    //Increments to the next question
    currentQuestionIndex++
    // Displays the next question
    questionElement.innerText = questions[currentQuestionIndex].question
    // Hides Yes Button from Q6
    yesButton8.classList.remove('hide')
    // Hides No Button from Q6
    noButton8.classList.remove('hide')
    // Shows calcuate button
    calculateButton.classList.add('hide')
}

function displayQuestion9() {
    //Increments to the next question
    currentQuestionIndex++
    // Displays the next question
    questionElement.innerText = questions[currentQuestionIndex].question
    // Hides Yes Button from Q6
    yesButton9.classList.remove('hide')
    // Hides No Button from Q6
    noButton9.classList.remove('hide')
    // Shows calcuate button
    calculateButton.classList.add('hide')
}

function skipQuestion5(){
  //Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'finances-item';
  // Appends the label to the finances item
  li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
  // Append li to ul
  finances.appendChild(li);

  currentQuestionIndex++
  // Hides Yes Button from Q4
  yesButton4.classList.add('hide')
  // Hides No Button from Q4
  noButton4.classList.add('hide')
  displayQuestion6();

}

function skipQuestion8() {
  //Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'finances-item';
  // Appends the label to the finances item
  li.appendChild(document.createTextNode(questions[currentQuestionIndex].successCopy));
  // Append li to ul
  finances.appendChild(li);

  currentQuestionIndex++
  displayQuestion9();
}

function failQuestion() {
  //Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'finances-item';
  // Appends the label to the finances item
  li.appendChild(document.createTextNode(questions[currentQuestionIndex].failCopy));
  // Append li to ul
  finances.appendChild(li);
  // Hides Yes Button from Q6
  yesButton6.classList.add('hide')
  // Hides No Button from Q6
  noButton6.classList.add('hide')
  // Hides Yes/No buttons for question 8. This whole yes/no button thing is getting verrrrry sloppy.
  yesButton8.classList.add('hide')
  noButton8.classList.add('hide')
  gameOver();
}

function gameOver() {
  nextButton.classList.add('hide')
  questionContainerElement.classList.add('hide')
  inputContainerElement.classList.add('hide')
  controls.classList.add('hide')

  // TODO: Add "start over" button
}

// ::::::::::::::I don't think I need anything below this this ::::::::::::::::::::::::::

// DOM Load event grabs any past levels from localStorage
// document.addEventListener('DOMContentLoaded', getLevels)

// Maybe I kill this and just display "success or fail pages". Unfinished: Need to reset this on restart. This grabs any past levels from local storage. I think I will get rid of this and have "summary" pages on each success.
// function getLevels() {
//   let levels;
//     if(localStorage.getItem('levels') === null){
//       levels = [];
//     } else {
//       levels = JSON.parse(localStorage.getItem('levels'));
//     }

//     levels.forEach(function(level){
//       // Create li element
//       const li = document.createElement('li');
//       // Add class
//       li.className = 'finances-item';
//       // Appends the label to the finances item. Need to save this in localstorage first if I want to use this.
//       // li.appendChild(document.createTextNode(levelType));
//       // Create text node and append to li
//       li.appendChild(document.createTextNode(level));
//       // Append li to ul
//       finances.appendChild(li);
//     });
// }


// Displays the last input near the top of the screen
// function showInput(e) {
//   // Create li element
//   const li = document.createElement('li');
//   // Add class
//   li.className = 'finances-item';
//   // Appends the label to the finances item
//   li.appendChild(document.createTextNode(questions[currentQuestionIndex].levelType));
//   // Create text node and append to li
//   li.appendChild(document.createTextNode(inputValue.value));
//   // Append li to ul
//   finances.appendChild(li);
//   // Store in LS
//   storeTaskInLocalStorage((questions[currentQuestionIndex].levelType) + (inputValue.value));
// }

// This is how I would ask Yes/No questions 
//   question.answers.forEach(answer => {
//     const button = document.createElement('button')
//     button.innerText = answer.text
//     button.classList.add('btn')
//     button.addEventListener('click', selectAnswer)
//     answerButtonsElement.appendChild(button)
//   })

// function selectAnswer(e) {
//   const selectedButton = e.target
//   const correct = selectedButton.dataset.correct
//   setStatusClass(document.body, correct)
//   Array.from(answerButtonsElement.children).forEach(button => {
//     setStatusClass(button, button.dataset.correct)
//   })
//   if (shuffledQuestions.length > currentQuestionIndex + 1) {
//     nextButton.classList.remove('hide')
//   } else {
//     startButton.innerText = 'Restart'
//     startButton.classList.remove('hide')
//   }
// }

// I don't think I need this...
// function setStatusClass(element, correct) {
//   clearStatusClass(element)
//   if (correct) {
//     element.classList.add('correct')
//   } else {
//     element.classList.add('wrong')
//   }
// }

// function clearStatusClass(element) {
//   element.classList.remove('correct')
//   element.classList.remove('wrong')
// }

// // I don't know what this does yet
// function resetState() {
//   clearStatusClass(document.body)
// // For now I will just always show the submit/next button...
// //   nextButton.classList.add('hide')
//   while (answerButtonsElement.firstChild) {
//     answerButtonsElement.removeChild(answerButtonsElement.firstChild)
//   }
// }


// Card Content
// const cardContent = [
//     {
//         title: Expenses
//         copy: 'What are your monthly expenses?'
//         inputTitle: 'Expenses'
//     }
// ]