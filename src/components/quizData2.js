
const quizData2 = {
    newStart: {
      question: 'Have you Invested in Mutual Fund?',
      options: ['Yes', 'No'],
      next: {
        'Yes': 'how',
        'No': 'startinvest',
      }
    },
    how: {
      question: 'Ok, Great! & How?',
      options: ['Lumpsum', 'SIP', 'BOTH'],
      next: {
        'Lumpsum': 'invested',
        'SIP': 'invested',
        'BOTH': 'invested',
      }
    },
    invested: {
      question: 'How much have you invested in Total?',
      options: ['0 - 5 Lacs', '5Lacs - 15Lacs', '15Lacs - 30Lacs','30 Lacs - 50 Lacs','50 Lacs - 1 Crore','1 Crore & above'],
      next: {
        '0 - 5 Lacs': 'lumpsum',
        '5Lacs - 15Lacs': 'lumpsum',
        '15Lacs - 30Lacs': 'lumpsum',
        '30 Lacs - 50 Lacs':'lumpsum',
        '50 Lacs - 1 Crore':'lumpsum',
        '1 Crore & above':'lumpsum',
      }
    },
    lumpsum: {
      question: 'How much more can you invest, Lumpsum?',
      options: ['0 - 5 Lacs', '5Lacs - 15Lacs', '15Lacs - 30Lacs','30 Lacs - 50 Lacs','50 Lacs - 1 Crore','1 Crore & above','Not Right Now'],
      next: {
        '0 - 5 Lacs': 'sip',
        '5Lacs - 15Lacs': 'sip',
        '15Lacs - 30Lacs': 'sip',
        '30 Lacs - 50 Lacs':'sip',
        '50 Lacs - 1 Crore':'sip',
        '1 Crore & above':'sip',
        'Not Right Now':'sip',
      }
    },
    sip: {
      question: 'Amount you can Invest Monthly in SIP?',
      options: ['1000-5000', '5000-10,000', '10,000-20,000','20,000-50,000','50,000 - 1Lac','1 Lac & Above','Not Right Now'],
      next: {
        '1000-5000': 'longterm',
        '5000-10,000': 'longterm',
        '10,000-20,000': 'longterm',
        '20,000-50,000':'longterm',
        '50,000 - 1Lac':'longterm',
        '1 Lac & Above':'longterm',
        'Not Right Now':'longterm',
      }
    },
    longterm: {
      question: 'For how long can you hold your investment?',
      options: ['Long term 5-10 Years', 'Mid Term 3-5 Years', 'Short Term 1-2 Years'],
      next: {
        'Long term 5-10 Years': 'realstate',
        'Mid Term 3-5 Years': 'realstate',
        'Short Term 1-2 Years': 'realstate',
      }
    },
    startinvest: {
      question: 'Would you like to start investing?',
      options: ['Yes, I want to grow with the market', 'No, I don’t want to take chance'],
      next: {
        'Yes, I want to grow with the market': 'lumpsumamount',
        'No, I don’t want to take chance': 'realstate',
      }
    },
    lumpsumamount: {
      question: 'Lumpsum amount you can invest in MF ?',
      options: ['Upto 2 Lacs','2Lacs - 5Lacs','5Lacs - 10Lacs','10 Lacs - 20 Lacs','20 Lacs - 50 Lacs','50 Lacs & Above'],
      next: {
        'Upto 2 Lacs': 'sipamount',
        '2Lacs - 5Lacs':'sipamount',
        '5Lacs - 10Lacs':'sipamount',
        '10 Lacs - 20 Lacs':'sipamount',
        '20 Lacs - 50 Lacs':'sipamount',
        '50 Lacs & Above':'sipamount',
      }
    },
    sipamount: {
      question: 'SIP Amount you can Invest Monthly',
      options: ['1000-5000', '5000-10,000', '10,000-20,000','20,000-50,000','50,000 - 1Lac','1 Lac & Above','Not Right Now'],
      next: {
        '1000-5000': 'longterm',
        '5000-10,000': 'longterm',
        '10,000-20,000': 'longterm',
        '20,000-50,000':'longterm',
        '50,000 - 1Lac':'longterm',
        '1 Lac & Above':'longterm',
      }
    },
    realstate: {
      question: 'Have you Invested in Real Estate?',
      options: ['Yes','No'],
      next: {
        'Yes':'realstatetype',
        'No':'explore',
      }
    },
    realstatetype: {
      question: 'Ok, Great! In What Type?',
      options: ['Residential','Commercial','BOTH'],
      next: {
        'Residential':'moreinvest',
        'Commercial':'moreinvest',
        'BOTH':'moreinvest',
      }
    },
    moreinvest: {
      question: 'Would you be interested in investing more?',
      options: ['Yes, I can invest in good option','No, I have a lot already'],
      next: {
        'Yes, I can invest in good option':'interest',
        'No, I have a lot already':'ending',
      }
    },
    interest: {
      question: 'Would you be interested in?',
      options: ['Residential','Commercial','BOTH','ANY'],
      next: {
        'Residential':'investseek',
        'Commercial':'investseek',
        'BOTH':'investseek',
        'ANY':'investseek',
      }
    },
    investseek: {
      question: 'How much you seek to invest?',
      options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore','1 Crore - 2 Crore','2 Crore - 5 Crore','5 Crore & above'],
      next: {
        '10 Lacs - 50 Lacs': 'interested',
        '50 Lacs - 1 Crore': 'interested',
        '1 Crore - 2 Crore':'interested',
        '2 Crore - 5 Crore':'interested',
        '5 Crore & above':'interested',
      },
    },
    interested: {
      question: 'Would you be interested in?',
      options: ['New Launch', 'Under Construction','Ready for possession','ANY'],
      next: {
        'New Launch': 'ending',
        'Under Construction': 'ending',
        'Ready for possession':'ending',
        'ANY':'ending',
      },
    },
    explore: {
      question: 'Would you be interested in Exploring options?',
      options: ['Yes, I can invest in good option', 'No, I will plan in future'],
      next: {
        'Yes, I can invest in good option': 'optioninvest',
        'No, I will plan in future': 'ending',
      },
    },
    optioninvest: {
      question: 'How much can you to invest?',
      options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore','1 Crore - 2 Crore','2 Crore - 5 Crore','5 Crore & above'],
      next: {
        '10 Lacs - 50 Lacs': 'optioninterested',
        '50 Lacs - 1 Crore': 'optioninterested',
        '1 Crore - 2 Crore':'optioninterested',
        '2 Crore - 5 Crore':'optioninterested',
        '5 Crore & above':'optioninterested',
      },
    },
    optioninterested: {
      question: 'Would you be interested in?',
      options: ['New Launch', 'Under Construction','Ready for possession','ANY'],
      next: {
        'New Launch': 'optioninterest',
        'Under Construction': 'optioninterest',
        'Ready for possession':'optioninterest',
        'ANY':'optioninterest',
      },
    },
    optioninterest: {
      question: 'Would you be interested in?',
      options: ['Residential','Commercial','BOTH','ANY'],
      next: {
        'Residential':'ending',
        'Commercial':'ending',
        'BOTH':'ending',
        'ANY':'ending',
      }
    },
    ending: {
      question: 'Before ending, do you want us to manage your car insurance too?',
      options: ['Yes, Please take care of my vehicle','No, I am fine!'],
      next: {
        'Yes, Please take care of my vehicle':'',
        'No, I am fine!':'',
      }
    },
  };
  
  export default quizData2;
  