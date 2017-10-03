import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() { }

  getTasks() {
    return tasks;
  }

}

const tasks = [
  {
    'id': 1,
    'question': 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?',
    'answers': ['Sunday', 'Saturday', 'Friday', 'Wednesday'],
    'right_answers': [2]
  },
  {
    'id': 2,
    'question': 'Which one of the following is not a prime number?',
    'answers': ['31', '61', '71', '91'],
    'right_answers': [3]
  },
  {
    'id': 3,
    'question': 'At a game of billiards, A can give B 15 points in 60. How many points can B give C in a game of 90?',
    'answers': ['30 points', '20 points', '10 points', '12 points'],
    'right_answers': [2]
  },
  {
    'id': 4,
    'question': 'Which of the following statement is incorrect?',
    'answers': ['The default value for an argument can be a global constant.',
        'The default arguments are given in the function prototype.',
        'Compiler uses the prototype information to build a call, not the function definition.',
        'The default arguments are given in the function prototype and should be repeated in the function definition.'
    ],
    'right_answers': [3]
  }
];
