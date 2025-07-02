const quizData = {
  start: {
    question: 'What is your age group?',
    options: ['18-25', '25-30', '30-35', '35-40', '40-50', '50-60', '60-70'],
    next: {
      '18-25': 'gender',
      '25-30': 'gender',
      '30-35': 'gender',
      '35-40': 'gender',
      '40-50': 'gender',
      '50-60': 'gender',
      '60-70': 'gender',
    },
    multiple: false
  },
  gender: {
    question: 'Your Gender',
    options: ['Male', 'Female'],
    next: {
      Male: 'married',
      Female: 'married',
    },
    multiple: false
  },
  married: {
    question: 'What is your Marital Status?',
    options: ['Married', 'Married with Kids', 'Single', 'Single with Kids'],
    next: {
      Married: 'income',
      'Married with Kids': 'kids',
      Single: 'income',
      'Single with Kids': 'kids',
    },
    multiple: false
  },
  kids: {
    question: 'How many Kids you have?',
    options: ['1', '2', '3', '4'],
    next: {
      1: 'onekid',
      2: 'twokid',
      3: 'threekid',
      4: 'fourkid',
    },
    multiple: false
  },
  onekid: {
    question: 'Age of 1st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '18-25': 'income',
      '25-30': 'income',
      '30-35': 'income',
      '35-40': 'income',
      '40-50': 'income',
      '50-60': 'income',
      '60-55': 'income',

    },
    multiple: false
  },
  twokid: {
    question: 'Age of 1st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'twokidage',
      '18-24': 'twokidage',
      '24-40': 'twokidage',
      '40 & above': 'twokidage',
    },
    multiple: false
  },
  twokidage: {
    question: 'Age of 2st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'income',
      '18-24': 'income',
      '24-40': 'income',
      '40 & above': 'income',
    },
    multiple: false
  },
  threekid: {
    question: 'Age of 1st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'threekidsecondage',
      '18-24': 'threekidsecondage',
      '24-40': 'threekidsecondage',
      '40 & above': 'threekidsecondage',
    },
    multiple: false
  },
  threekidsecondage: {
    question: 'Age of 2st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'threekidthirdage',
      '18-24': 'threekidthirdage',
      '24-40': 'threekidthirdage',
      '40 & above': 'threekidthirdage',
    },
    multiple: false
  },
  threekidthirdage: {
    question: 'Age of 3st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'income',
      '18-24': 'income',
      '24-40': 'income',
      '40 & above': 'income',
    },
    multiple: false
  },
  fourkid: {
    question: 'Age of 1st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'fourkidsecondage',
      '18-24': 'fourkidsecondage',
      '24-40': 'fourkidsecondage',
      '40 & above': 'fourkidsecondage',
    },
    multiple: false
  },
  fourkidsecondage: {
    question: 'Age of 2st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'fourkidthirdage',
      '18-24': 'fourkidthirdage',
      '24-40': 'fourkidthirdage',
      '40 & above': 'fourkidthirdage',
    },
    multiple: false
  },
  fourkidthirdage: {
    question: 'Age of 3st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'fourkidfourthage',
      '18-24': 'fourkidfourthage',
      '24-40': 'fourkidfourthage',
      '40 & above': 'fourkidfourthage',
    },
    multiple: false
  },
  fourkidfourthage: {
    question: 'Age of 4st Kid ',
    options: ['0-18', '18-24', '24-40', '40 & above'],
    next: {
      '0-18': 'income',
      '18-24': 'income',
      '24-40': 'income',
      '40 & above': 'income',
    },
    multiple: false
  },

  income: {
    question: 'Your Yearly Household Income',
    options: ['0 - 12 Lacs', '12Lacs - 30Lacs', '30Lacs - 50Lacs', '50 Lacs - 1 crore', '1 crore & above'],
    next: {
      '0 - 12 Lacs': 'profession',
      '12Lacs - 30Lacs': 'profession',
      '30Lacs - 50Lacs': 'profession',
      '50 Lacs - 1 crore': 'profession',
      '1 crore & above': 'profession',
    },
    multiple: false
  },
  profession: {
    question: 'Your Profession',
    options: ['Salaried', 'Self employed', 'Business', 'Professional'],
    next: {
      'Salaried': 'insurance',
      'Self employed': 'insurance',
      'Business': 'insurance',
      'Professional': 'insurance',
    },
    multiple: false
  },
  insurance: {
    question: 'Do you have life Insurance?',
    options: ['Yes', 'No'],
    next: {
      'Yes': 'insurancetype',
      'No': 'secure',
    },
    multiple: false
  },
  insurancetype: {
    question: 'Want Kind of insurance? ',
    options: ['Term', 'Term - ROP', 'Term-Unit linked', 'ULIP', 'Pension', 'Health', 'Guaranteed Return'],
    next: {
      'Term': 'termold',
      'Term - ROP': 'ropold',
      'Term-Unit linked': 'termunitold',
      'ULIP': 'ulipold',
      'Pension': 'pensioncover',
      'Guaranteed Return': 'guarantee',
      'Health': 'healthold',
    },
    multiple: true
  },


  'termold': {
    question: 'How old is your Term Plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': 'terminsurancecover',
      '5 - 10 Years': 'terminsurancecover',
      '10 - 15 Years': 'terminsurancecover',
      '15 - 20 Years': 'terminsurancecover',
      '20 Year and above': 'terminsurancecover',
    },
    multiple: false
  },
  'terminsurancecover': {
    question: 'What is the coverage amount of your Term Plan?',
    options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '10 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
  },

  // TERM - ROP
  'ropold': {
    question: 'How old is your Term - ROP Plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': 'ropinsurancecover',
      '5 - 10 Years': 'ropinsurancecover',
      '10 - 15 Years': 'ropinsurancecover',
      '15 - 20 Years': 'ropinsurancecover',
      '20 Year and above': 'ropinsurancecover',
    },
  },
  'ropinsurancecover': {
    question: 'What is the coverage amount of your Term - ROP Plan?',
    options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '10 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
  },

  // TERM-UNIT
  'termunitold': {
    question: 'How old is your Term-Unit Linked Plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': 'termunitcover',
      '5 - 10 Years': 'termunitcover',
      '10 - 15 Years': 'termunitcover',
      '15 - 20 Years': 'termunitcover',
      '20 Year and above': 'termunitcover',
    },
  },
  'termunitcover': {
    question: 'What is the coverage amount of your Term-Unit Linked Plan?',
    options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '10 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
  },

  // ULIP
  'ulipold': {
    question: 'How old is your ULIP Plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': 'ulipcover',
      '5 - 10 Years': 'ulipcover',
      '10 - 15 Years': 'ulipcover',
      '15 - 20 Years': 'ulipcover',
      '20 Year and above': 'ulipcover',
    },
  },
  'ulipcover': {
    question: 'What is the coverage amount of your ULIP Plan?',
    options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '10 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
  },

  'pensioncover': {
    question: 'How much Pension have you planned?',
    options: ['0 - 50,000 / month', '50,000 - 1 Lac / month', '1 Lac - 2 Lacs / month', '2 lacs - 3 Lac / month', '3 Lacs & above'],
    next: {
      '0 - 50,000 / month': 'pensionold',
      '50,000 - 1 Lac / month': 'pensionold',
      '1 Lac - 2 Lacs / month': 'pensionold',
      '2 lacs - 3 Lac / month': 'pensionold',
      '3 Lacs & above': 'pensionold',
    },
  },
  'pensionold': {
    question: 'How old is your Pension Plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': '',
      '5 - 10 Years': '',
      '10 - 15 Years': '',
      '15 - 20 Years': '',
      '20 Year and above': '',
    },
  },

  // Health
  'healthold': {
    question: 'How old is your Health Insurance?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': 'healthcover',
      '5 - 10 Years': 'healthcover',
      '10 - 15 Years': 'healthcover',
      '15 - 20 Years': 'healthcover',
      '20 Year and above': 'healthcover',
    },
  },
  'healthcover': {
    question: 'What is the coverage amount of your Health Insurance?',
    options: ['10 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '10 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
  },
    'guarantee':{
    question: 'How much Guaranteed Return have you planned? ',
    options: ['0 - 50,000 / month', '50,000 - 1 lac / month', '1 lac - 2 lac / month', '2 lac - 3 lac / month', '3 lac & above', 'One Time Not Monthly'],
    next: {
      '0 - 50,000 / month': 'oldgurantee',
      '50,000 - 1 lac / month': 'oldgurantee',
      '1 lac - 2 lac / month': 'oldgurantee',
      '2 lac - 3 lac / month': 'oldgurantee',
      '3 lac & above': 'oldgurantee',
      'One Time Not Monthly': 'notmonthly',
    },
  },
    'oldgurantee': {
    question: 'How old is your Gurantee Return plan?',
    options: ['1-5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20 Year and above'],
    next: {
      '1-5 Years': '',
      '5 - 10 Years': '',
      '10 - 15 Years': '',
      '15 - 20 Years': '',
      '20 Year and above': '',
    },
  },
  'notmonthly': {
    question: 'How much Fixed Gurantee Return plan you have?',
    options: ['0 - 30 Lacs', '30 Lacs - 60 Lacs', '60 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore & above'],
    next: {
      '0 - 30 Lacs': 'oldgurantee',
      '30 Lacs - 60 Lacs': 'oldgurantee',
      '60 Lacs - 1 Crore': 'oldgurantee',
      '1 Crore - 2 Crore': 'oldgurantee',
      '2 Crore & above': 'oldgurantee',
    },
  },




  proposal: {
    question: 'Would you like a better proposal from us ?',
    options: ['Yes, I want better coverage+features', 'No, I am ok with my old policy'],
    next: {
      'Yes, I want better coverage+features': 'goal',
      'No, I am ok with my old policy': 'medical',
    },
    multiple: false
  },
  secure: {
    question: 'Are you seeking to get secure?',
    options: ['Yes, I want to get Insured', 'No, I have pile of cash under my bed'],
    next: {
      'Yes, I want to get Insured': 'goal',
      'No, I have pile of cash under my bed': 'medical',
    },
    multiple: false
  },
  goal: {
    question: 'What will be your End Goal from policy?',
    options: ['Pure Death Benefit', 'Death Benefit + Return', 'Death benefit + Return + Funds Growth', 'Insurance + Tax Saving + Growth', 'Pension after a certain age', 'Insurance + Health Policy', 'Gurantee Return', 'Kids Education/Marriage'],
    next: {
      'Pure Death Benefit': 'coverage',
      'Death Benefit + Return': 'coverage',
      'Death benefit + Return + Funds Growth': 'coverage',
      'Insurance + Tax Saving + Growth': 'coverage',
      'Pension after a certain age': 'pension',
      'Insurance + Health Policy': 'coverage',
      'Gurantee Return': 'guaranteereturn',
      'Kids Education/Marriage': 'coverage',
    },
    multiple: true
  },
  guaranteereturn: {

    question: 'How you want your Guaranteed Return?',
    options: ['Fixed, One time', 'Monthly with fixed'],
    next: {
      'Fixed, One time': 'fixed',
      'Monthly with fixed': 'monthlyfixed',
    },
    multiple: false

  },
  fixed: {
    question: 'How much Guaranteed Return you seek?',
    options: ['0 -30 Lac', '30 Lacs - 60 Lacs', '60 Lacs - 1 crore', '1 crore - 2 crore', '2 crore & above'],
    next: {
      '0 -30 Lac': '',
      '30 Lacs - 60 Lacs': '',
      '60 Lacs - 1 crore': '',
      '1 crore - 2 crore': '',
      '2 crore & above': '',
    },
    multiple: false
  },
  monthlyfixed: {
    question: 'How much Guaranteed Return you seek?',
    options: ['0 - 50,000 / month', '50,000 - 1 Lac / month', '1 Lac - 2 Lacs / month', '2 lacs - 3 Lac / month', '3 Lacs & above'],
    next: {

      '0 - 50,000 / month': '',
      '50,000 - 1 Lac / month': '',
      '1 Lac - 2 Lacs / month': '',
      '2 lacs - 3 Lac / month': '',
      '3 Lacs & above': '',
    },
    multiple: false
  },
  pension: {
    question: 'How much Pension You would require?',
    options: ['0 - 50,000 / month', '50,000 - 1 Lac / month', '1 Lac - 2 Lacs / month', '2 lacs - 3 Lac / month', '3 Lacs & above'],
    next: {
      '0 - 50,000 / month': '',
      '50,000 - 1 Lac / month': '',
      '1 Lac - 2 Lacs / month': '',
      '2 lacs - 3 Lac / month': '',
      '3 Lacs & above': '',
    },
    multiple: false
  },
  coverage: {
    question: 'What is the insurance coverage you seek? ',
    options: ['20 Lacs - 50 Lacs', '50 Lacs - 1 Crore', '1 Crore - 2 Crore', '2 Crore - 5 Crore', '5 Crore & above'],
    next: {
      '20 Lacs - 50 Lacs': '',
      '50 Lacs - 1 Crore': '',
      '1 Crore - 2 Crore': '',
      '2 Crore - 5 Crore': '',
      '5 Crore & above': '',
    },
    multiple: false
  },



  medical: {
    question: 'Do you have Medical Insurance?',
    options: ['Yes', 'No'],
    next: {
      'Yes': 'plan',
      'No': 'medicalplan',

    },
    multiple: false
  },
  plan: {
    question: 'What your current Plan ?',
    options: ['Family floater', 'Individual'],
    next: {
      'Family floater': 'medicalcoverage',
      'Individual': 'medicalcoverage',

    },
    multiple: false
  },
  medicalcoverage: {
    question: 'What is your Current Coverage ?',
    options: ['upto 5 Lacs', 'Upto 10 Lacs', 'Upto 15 Lacs', 'Upto 25 Lacs', '25 Lacs & above'],
    next: {
      'upto 5 Lacs': 'betterplan',
      'Upto 10 Lacs': 'betterplan',
      'Upto 15 Lacs': 'betterplan',
      'Upto 25 Lacs': 'betterplan',
      '25 Lacs & above': 'betterplan',

    },
    multiple: false
  },
  betterplan: {
    question: 'We might have better plans for you?',
    options: ['Yes, Suggest me a good plan', 'No, I rely on old is gold'],
    next: {
      'Yes, Suggest me a good plan': 'claim',
      'No, I rely on old is gold': '',

    },
    multiple: false
  },
  claim: {
    question: 'Do you have any medical history or claims',
    options: ['Yes, had claimed the policy', 'Yes, But nothing serious', 'No history'],
    next: {
      'Yes, had claimed the policy': '',
      'Yes, But nothing serious': '',
      'No history': 'medicalplan',
    },
    multiple: false
  },
  medicalplan: {
    question: 'Ok! No issue, we have great medical plans',
    options: ['Yes, Suggest me a good plan', 'No, I have extra cash to burn'],
    next: {
      'Yes, Suggest me a good plan': 'medicoverage',
      'No, I have extra cash to burn': '',
    },
    multiple: false
  },
  medicoverage: {
    question: 'Ok! What Coverage you Seek?',
    options: ['Upto 10 Lacs', 'Upto 15 Lacs', 'Upto 25 Lacs', '25 Lacs & above'],
    next: {
    },
    multiple: false
  },
};

export default quizData;
