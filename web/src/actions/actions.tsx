
import * as constants from '../constants/constants';
import { Problem } from '../model/problem';
import { UserData } from '../model/userData';
import { Api } from '../utils/Api';
import { Dispatch } from 'react-redux';
import { StoreState } from '../model/storeState';

export interface ToggleProblem {
   type: constants.TOGGLE_PROBLEM;
   problem: Problem;
}

export interface ReceiveUserData {
   type: constants.RECEIVE_USER_DATA;
   userData: UserData;
}

export type Action = ToggleProblem | ReceiveUserData

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

export function loadUserData(code: string): any {
   return (dispatch: Dispatch<any>) => {
      Api.getContenderData(code).then(contenderData => dispatch(receiveUserData(contenderData)))
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

