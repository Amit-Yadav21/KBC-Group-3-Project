import express from 'express';
// import { login, signup, getAllUsers, GetLoginData, UpdateLoginData, DeleteUserData, logout} from '../controller/loginSignup.js';
import * as loginSignup from '../controller/loginSignup.js';
import * as question from '../controller/Question.js';
import * as lifelines from '../controller/Lifeline.js';
import * as AskAudienceGraph from '../controller/AskAudience.js'
import { verifyToken } from '../Midlewere/authentication.js';
import {signup_Validation, login_Validation} from '../VailidationLiginSignup/liginSignupVailidation.js'

const router = express.Router();

// login/Signup router
router.post('/post', signup_Validation, loginSignup.signup);
router.post('/Login', loginSignup.login);
router.get('/Get/signup/All/user', loginSignup.getAllUsers);
router.get('/find/Login/user', verifyToken, loginSignup.GetLoginData);
router.put('/update/login/user/by/email', verifyToken, loginSignup.UpdateLoginData);
router.delete('/delete/login/user/by/email', loginSignup.DeleteUserData);
router.post('/logout/Login/data', verifyToken, loginSignup.logout);
router.post('/check-email', loginSignup.checkEmailExists);

// Question  router
router.post('/Create/Questions', question.PutQuestion);
router.get('/Get/All/Questions', question.getAllQuestions);
router.get('/Get/Random/Questions', question.getRandomQuestions);
router.delete('/Delete/Question', question.deleteQuestion);

// Lifeline router
router.post('/Create/LifeLine', verifyToken, lifelines.createLifeline);
router.get('/GetAll/Lifelines', lifelines.getLifelines);
router.delete('/delete/Lifeline/by/name', verifyToken, lifelines.deleteLifeline);

// AskAudience Graph router
router.post('/Create/AskAudience/Graph', AskAudienceGraph.CreateAudienceGraph);
router.get('/Get/All/AskAudience/Graph/Data', AskAudienceGraph.getAllAskAudienceData);
// router.delete('/delete/Lifeline/by/name', AskAudienceGraph.AskAudienceGraph);

export default router;