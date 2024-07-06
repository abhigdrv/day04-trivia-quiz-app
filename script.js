const questions = document.getElementById('questions');
const scoreSection = document.getElementById('score');
scoreSection.className = "pl-2 text-2xl font-bold"
function getRandomQuestions(questions, numQuestions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions.slice(0, numQuestions);
}

let questionDataList = [];

fetch("data.json").then(data => {
    data.json().then(questionList => {
        questionDataList = questionList.questionList;
        getRandomQuestions(questionList.questionList, 10).forEach((questionItem, index) => {
            addQuestion(questionItem, index);
        });
    })
});

function addQuestion(questionItem, index){
    const questionNumber = index+1
    //Add question title
    const question = document.createElement("div");
    question.className = "p-3";
    const questionTitle = document.createElement("p");
    questionTitle.className = "text-lg";
    questionTitle.textContent = "Q"+ questionNumber + ". " + questionItem.question;
    question.appendChild(questionTitle);
    //Add options
    questionItem.options.forEach(option => {
        const questionOption = document.createElement("div");
        const questionOptionInput = document.createElement("input");
        questionOptionInput.className = "cursor-pointer";
        questionOptionInput.type = "radio";
        questionOptionInput.name = `${questionItem.id}`;
        questionOptionInput.value = option;
        questionOptionInput.id = `question${index}_${option}`;
        const questionOptionLabel = document.createElement("span");
        questionOptionLabel.className = "pl-2"
        questionOptionLabel.textContent = option;
        questionOption.appendChild(questionOptionInput);
        questionOption.appendChild(questionOptionLabel);
        question.appendChild(questionOption);
    })
    questions.appendChild(question)
}

function submitForm(){
    let answers = [];
    let score = 0;
    const formSection = document.getElementById('formSection');
    const formData = new FormData(formSection);
    for (const [key, value] of formData.entries()) {
        answers.push({
            id:key,
            answer:value
        });
        if(questionDataList.find(item => item.id == key).answer == value){
            score += 1;
        }
    }
    formSection.className = "hidden"
    scoreSection.textContent = `You have scored ${score} marks out of 10`
    scoreSection.className = "m-[20px] text-3xl font-bold"
}