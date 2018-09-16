console.log('game.js');
var config = [{
		id: 1,
		question: "Вопрос №1 Чем профессионально занимается провизор?",
		answers: {
			A: 'наблюдает за погодой',
			B: 'готовит лекарства',
			C: 'ухаживает за растениями',
			D: 'импровизирует'
		},
		answer: 'B'
	}, {
		id: 2,
		question: "Вопрос №2 Что на Руси называли «голова садовая»?",
		answers: {
			A: 'репу',
			B: 'капусту',
			C: 'свеклу',
			D: 'яблоко'
		},
		answer: 'B'
	}, {
		id: 3,
		question: "Вопрос №3 В какой из этих городов Новый год приходит раньше?",
		answers: {
			A: 'Пермь',
			B: 'Красноярск',
			C: 'Омск',
			D: 'Новосибирск'
		},
		answer: 'B'
	}, {
		id: 4,
		question: "Вопрос №4 Какой наряд прославил баснописец Крылов?",
		answers: {
			A: 'тришкин кафтан',
			B: 'ивашкин армяк',
			C: 'прошкин зипун',
			D: 'машкин сарафан'
		},
		answer: 'A'
	}, {
		id: 5,
		question: "Вопрос №5 С чем часто охотятся на рыбу протоптера между сезонами дождей?",
		answers: {
			A: 'с сетями',
			B: 'с сачками',
			C: 'с ружьями',
			D: 'с лопатами'
		},
		answer: 'D'
	}
];

var game = {
	isRunning: false,
	questions: [],
	question: 0,
	exit: function(status){
		this.isRunning = false;
		var message = status ? 'Вы ответили верно на все вопросы! Вы победили!' : 'Это не верный ответ, вы проиграли';
		alert(message);
	},
	getQuestion: function(){
		if ( this.questions[this.question] ) {
			return this.questions[this.question]
		}
		return false;
	},
    
    askQuestion: function(question){
		// задать новый вопрос - предложить варианты ответов
		var message = question.question + "\n";

		for ( var answer in question.answers ) {
			message += answer + ' ' + question.answers[answer] + "\n";
		}

		return prompt(message);
	},
	parseAnswer: function(answer){
		var possible = ['A', 'B', 'C', 'D'];
		return possible.indexOf(answer) !== -1;
	},
    
    checkAnswer: function(question, answer){
		return question.answer == answer;
	},
	run: function(config){
		this.isRunning = true;
		this.questions = config;
		var question, answer;
        var num;
        var countOffQuastions = config.length; //можно выводить сразу функцией?
        
        //ввод номера вопроса с которого нужно начать
        
        num = +prompt('Введите номер вопроса с котрого нужно начать от 1 до ' + countOffQuastions);
        this.question = num - 1;
        
        // если вопрос с существующим номером, то играем
        if ((num >= 0) && (num <= countOffQuastions)) {
        
		// пока "игра не завершена"
		while ( this.isRunning ) {
            
			// получить новый вопрос
			question = this.getQuestion();
			// если вопрос есть
			if ( question ) {
				++this.question;
				answer = false;

				// пока не получен валидный ответ (A, B, C или D)
				while ( !answer ) {
					// задать новый вопрос - предложить варианты ответов
					answer = this.askQuestion(question);

					// прочитать ответ пользователя
					if ( !this.parseAnswer(answer) ) {
						answer = false;
						continue;
					}
				}

				// проверяем правильный ли ответ
				var isCorrectAnswer = this.checkAnswer(question, answer);

				// если ответ правильный
				if ( !isCorrectAnswer ) {
					// если ответ неправильный
					// выход из игры - поражение
					this.exit(false);
				}
			} else {
				// если вопроса нет
				// выход из игры - победа
				this.exit(true);
			}
		}
        }
        
        else {
            alert("Такого вопроса нет (их пока всего 5), игра закончена");
            this.exit(false);
        }
	}
};

game.run(config);

