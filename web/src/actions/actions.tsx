
import * as constants from '../constants/constants';
import { Problem } from '../model/problem';
import { UserData } from '../model/userData';
import { Api } from '../utils/Api';
import { Dispatch } from 'react-redux';
import { StoreState } from '../model/storeState';
import { ScoreboardList } from '../model/scoreboardList';

export interface ToggleProblem {
   type: constants.TOGGLE_PROBLEM;
   problem: Problem;
}

export interface ReceiveUserData {
   type: constants.RECEIVE_USER_DATA;
   userData: UserData;
}

export interface ReceiveScoreboardData {
   type: constants.RECEIVE_SCOREBOARD_DATA;
   scoreboardData: ScoreboardList[];
}

export type Action = ToggleProblem | ReceiveUserData | ReceiveScoreboardData

export function toggleProblem(problem: Problem): ToggleProblem {
   console.log("TOGGLE_PROBLEM");
   return {
      type: constants.TOGGLE_PROBLEM,
      problem: problem
   };
}

export function receiveUserData(userData: UserData): ReceiveUserData {
   console.log("receiveUserData ", userData);
   return {
      type: constants.RECEIVE_USER_DATA,
      userData: userData
   };
}

export function receiveScoreboardData(scoreboardData: ScoreboardList[]): ReceiveScoreboardData {
   console.log("receiveScoreboardData ", scoreboardData);
   return {
      type: constants.RECEIVE_SCOREBOARD_DATA,
      scoreboardData: scoreboardData
   };
}

export function loadUserData(code: string): any {
   return (dispatch: Dispatch<any>) => {
      Api.getContenderData(code).then(contenderData => dispatch(receiveUserData(contenderData)))
   };
}

export function loadScoreboardData(): any {
   return (dispatch: Dispatch<any>) => {
      Api.getScoreboardData().then(scoreboardData => dispatch(receiveScoreboardData(scoreboardData)))
   };
}

export function saveUserData(contenderData: UserData): any {
   return (dispatch: Dispatch<any>) => {
      return Api.setContenderData(contenderData);
   };
}

export function toggleProblemAndSave(problem: Problem): any { 
   return (dispatch: Dispatch<any>, getState: () => StoreState) => {
      dispatch(toggleProblem(problem));
      dispatch(saveUserData(getState().userData));
   };
}

