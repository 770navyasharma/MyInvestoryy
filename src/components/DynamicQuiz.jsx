import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicQuestionComponent from './DynamicQuestionComponent';
import CompletionScreen from './Complete';
import quizData1 from './quizData';
import quizData2 from './quizData2';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://backend.myinvestoryy.com/api/';

const questionOrder1 = [
  'start', 'gender', 'married', 'kids', 'onekid', 'twokid', 'twokidage',
  'threekid', 'threekidsecondage', 'threekidthirdage', 'fourkid',
  'fourkidsecondage', 'fourkidthirdage', 'fourkidfourthage', 'income',
  'profession', 'insurance', 'insurancetype', 'termold', 'terminsurancecover',
  'ropold', 'ropinsurancecover', 'termunitold', 'ulipold', 'pensionold','healthold', 'gurantee', 'oldgurantee','proposal', 'secure', 'goal',
  'coverage', 'medical', 'plan', 'medicalcoverage', 'betterplan',
  'claim', 'medicalplan', 'medicoverage'
];

const questionOrder2 = [
  'newStart', 'how', 'invested', 'lumpsum', 'sip', 'longterm', 'startinvest',
  'lumpsumamount', 'sipamount', 'realstate', 'realstatetype', 'moreinvest',
  'interest', 'investseek', 'interested', 'explore', 'optioninvest',
  'optioninterested', 'optioninterest', 'ending'
];

const DynamicQuiz = ({ name, phone, startKey }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]); // For Back button navigation
  const [quizData, setQuizData] = useState(quizData1);
  const [questionOrder, setQuestionOrder] = useState(questionOrder1);
  const [currentKey, setCurrentKey] = useState(questionOrder1[0]);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPhase, setQuizPhase] = useState(1);
  const [pendingKeys, setPendingKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentQuestionObj = quizData[currentKey];
  const insuranceFollowUps = {
    'Term': ['termold', 'terminsurancecover'],
    'Term - ROP': ['ropold', 'ropinsurancecover'],
    'Term-Unit linked': ['termunitold', 'termunitcover'],
    'ULIP': ['ulipold', 'ulipcover'],
    'Pension': ['pensioncover', 'pensionold'],
    'Guaranteed Return': ['guarantee','oldgurantee'],
    'Health': ['healthold', 'healthcover'],
  };

    const goalFollowUps = {
    'Pure Death Benefit': ['coverage'],
    'Death Benefit + Return': [''],
    'Death benefit + Return + Funds Growth': [''],
    'Insurance + Tax Saving + Growth': [''],
    'Pension after a certain age': ['pension'],
    'Insurance + Health Policy': [''],
    'Gurantee Return': ['guaranteereturn'],
    'Kids Education/Marriage':[''],
  };

  console.log("Current Key:", startKey);
  // Handle if quiz needs to start from 'ending'
  useEffect(() => {
    if (startKey === 'ending') {
      navigate('/again', { state: { name, phone } });
    }
  }, [startKey, name, phone, navigate]);

  // Set correct starting key if provided
  useEffect(() => {
    if (startKey) {
      if (questionOrder1.includes(startKey)) {
        setQuizData(quizData1);
        setQuestionOrder(questionOrder1);
        setCurrentKey(startKey);
        setQuestionIndex(questionOrder1.indexOf(startKey));
        setQuizPhase(1);
      } else if (questionOrder2.includes(startKey)) {
        setQuizData(quizData2);
        setQuestionOrder(questionOrder2);
        setCurrentKey(startKey);
        setQuestionIndex(questionOrder2.indexOf(startKey));
        setQuizPhase(2);
      }
    }
  }, [startKey]);
  

  // Handle Phase 2 Completion
  useEffect(() => {
    if (quizCompleted && quizPhase === 2) {
      navigate('/thank-you', { state: { name, phone } });
    }
  }, [quizCompleted, quizPhase, navigate, name, phone]);


  const handleOptionSelect = async (selectedOption) => {
    try {
      setLoading(true);
      const isMultiple = Array.isArray(selectedOption);
      const selectedOptions = isMultiple ? selectedOption : [selectedOption];
  
      const newAnswers = {
        ...answers,
        [currentKey]: selectedOption,
      };
  
      // Instead of setting it early, update state at the end
      // setAnswers(newAnswers); ← move this to the end
  
      const questionNumber = quizPhase === 1
        ? questionIndex + 1
        : questionOrder1.length + questionIndex + 1;
  
      await axios.post(`${API_BASE}save-response`, {
        phone,
        question_index: currentQuestionObj.question,
        response: selectedOptions.join(', '),
      });
  
      await axios.post(`${API_BASE}save-progress`, {
        phone,
        current_question_index: {
          key: currentKey,
          option: selectedOption,
        },
      });
  
      const updatedHistory = [...history, currentKey];
      const updatedAnswers = newAnswers;
      let newPendingKeys = [...pendingKeys];
  
      if (currentKey === 'proposal') {
        const nextKey = currentQuestionObj.next?.[selectedOption];
        if (nextKey) {
          setCurrentKey(nextKey);
          setQuestionIndex(questionOrder.indexOf(nextKey));
        } else {
          setQuizCompleted(true);
        }
        setPendingKeys([]);
        setHistory(updatedHistory);
        setAnswers(updatedAnswers);
        return;
      }
      if (currentKey === 'insurancetype') {
        selectedOptions.forEach(option => {
          const followUps = insuranceFollowUps[option];
          if (followUps) {
            newPendingKeys.push(...followUps);
          }
        });
        newPendingKeys.push('proposal');
      } 

      if (currentKey === 'goal') {
        selectedOptions.forEach(option => {
          const followUps = insuranceFollowUps[option];
          if (followUps) {
            newPendingKeys.push(...followUps);
          }
        });
        newPendingKeys.push('medical');
      } 






      else if (currentQuestionObj.multiple && currentKey !== 'goal') {
        selectedOptions.forEach(option => {
          const firstFollowUp = currentQuestionObj.next?.[option];
          if (firstFollowUp) {
            const secondFollowUp = quizData[firstFollowUp]?.next?.[quizData[firstFollowUp].options?.[0]] || null;
            if (secondFollowUp) {
              newPendingKeys.push(firstFollowUp, secondFollowUp);
            } else {
              newPendingKeys.push(firstFollowUp);
            }
          }
        });
      }
      
      else {
        const next = currentQuestionObj.next?.[selectedOptions[0]];
        if (next) {
          newPendingKeys.push(next);
        }
      }
  
      const nextKey = newPendingKeys.shift();

      if (nextKey) {
        setCurrentKey(nextKey);
        setQuestionIndex(questionOrder.indexOf(nextKey));
      }
      
      setPendingKeys(newPendingKeys);
      
      if (!nextKey && newPendingKeys.length === 0) {
        setQuizCompleted(true);
      }
      
  
      // Set states at the end
      setAnswers(updatedAnswers);
      setHistory(updatedHistory);
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  

  const handleComplete = () => {
    if (quizPhase === 1) {
      setQuizData(quizData2);
      setQuestionOrder(questionOrder2);
      setCurrentKey(questionOrder2[0]);
      setQuestionIndex(0);
      setQuizCompleted(false);
      setQuizPhase(2);
    }
  };
  const handleBack = () => {
    if (history.length === 0) return;
  
    const updatedHistory = [...history];
    const prevKey = updatedHistory.pop(); // Remove current and go to last visited
    setCurrentKey(prevKey);
    setQuestionIndex(questionOrder.indexOf(prevKey));
    setHistory(updatedHistory);
  };
  

  if (quizCompleted && quizPhase === 1) {
    return <CompletionScreen userName={name} onComplete={handleComplete} />;
  }

  return (
    <>
      {/* {loading && <div style={{ textAlign: 'center', padding: '10px' }}>Saving...</div>} */}
      <DynamicQuestionComponent
        userName={name}
        question={currentQuestionObj?.question || ''}
        options={currentQuestionObj?.options || []}
        onSelectOption={handleOptionSelect}
        onBack={handleBack}
        showBack={questionIndex > 0}
        multiple={currentQuestionObj?.multiple}
        disabled={loading}
        key={currentKey}
      />
    </>
  );
};

export default DynamicQuiz;
