import { combineReducers } from 'redux';
import { personalReducer } from './personalReducer';
import { albumInfo } from './albumInfoReducer';
import { recommend } from './recommendReducer';
import { questionListReducer } from './questionReducer';
import { answerReducer } from './answerReducer';
import { initReducer } from './initReducer';
import { childrenAnswerReducer } from './childrenAnswerReducer';
import { playReducer } from './playReducer';

const rootReducer = combineReducers({
    personalReducer,
    albumInfo,
    recommend,
    questionListReducer,
    answerReducer,
    initReducer,
    childrenAnswerReducer,
    playReducer
})

export default rootReducer;