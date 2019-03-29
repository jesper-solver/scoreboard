import {Problem} from '../model/problem';
import {ContenderData} from '../model/contenderData';
import {Dispatch} from 'react-redux';
import {Api} from '../utils/Api';
import {
   createTick,
   deleteTick,
   receiveColors,
   receiveCompClasses,
   receiveContenderData,
   receiveContenderNotFound,
   receiveContest,
   receiveProblems,
   receiveScoreboardData,
   receiveTicks,
   setProblemStateFailed,
   startProblemUpdate,
   updateScoreboardTimer, updateTick
} from './actions';
import {StoreState} from '../model/storeState';
import {ProblemState} from "../model/problemState";
import {Tick} from "../model/tick";

export function loadUserData(code: string): any {
   return (dispatch: Dispatch<any>) => {
      Api.getContender(code)
         .then(contenderData => {
            dispatch(receiveContenderData(contenderData));
            Api.getProblems(contenderData.contestId).then(problems => {
               dispatch(receiveProblems(problems));
            });
            Api.getContest(contenderData.contestId).then(contest => {
               dispatch(receiveContest(contest));
            });
            Api.getCompClasses(contenderData.contestId).then(compClasses => {
               dispatch(receiveCompClasses(compClasses));
            });
            Api.getTicks(contenderData.id).then(ticks => {
               dispatch(receiveTicks(ticks));
            });
            Api.getColors().then(colors => {
               dispatch(receiveColors(colors));
            });
         })
         .catch(() => dispatch(receiveContenderNotFound())
      )
   };
}

export function loadScoreboardData(id: number): any {
   return (dispatch: Dispatch<any>) => {
      Api.getScoreboard(id).then(scoreboardData => {
         dispatch(receiveScoreboardData(scoreboardData));
         dispatch(updateScoreboardTimer());
      })
   };
}

export function loadContest(): any {
   return (dispatch: Dispatch<any>) => {
      Api.getContest(0).then(contest => {
         dispatch(receiveContest(contest));
      })
   };
}

export function saveUserData(contenderData: ContenderData): any {
   return (dispatch: Dispatch<any>) => {
      let promise: Promise<ContenderData> = Api.setContender(contenderData);
      promise.then(contenderData => dispatch(receiveContenderData(contenderData)));
      return promise;
   };
}

export function setProblemStateAndSave(problem: Problem, problemState: ProblemState, tick?:Tick): any {
   return (dispatch: Dispatch<any>, getState: () => StoreState) => {
      const oldState = !tick ? ProblemState.NOT_SENT : tick.flash ? ProblemState.FLASHED : ProblemState.SENT;
      if(oldState != problemState) {
         dispatch(startProblemUpdate(problem));
         if(!tick) {
            // Create a new tick:
            Api.createTick(problem.id, getState().contenderData!.id, problemState == ProblemState.FLASHED)
               .then((tick) => {
                  dispatch(createTick(tick))
               })
               .catch(() => {
                  dispatch(setProblemStateFailed())
               });

         } else if (problemState == ProblemState.NOT_SENT) {
            // Delete the tick:
            Api.deleteTick(tick)
               .then(() => {
                  console.log("Hej");
                  dispatch(deleteTick(tick))
               })
               .catch((error) => {
                  console.log("Nooo", error);
                  dispatch(setProblemStateFailed())
               });
         } else {
            // Update the tick:
            const newTick:Tick = JSON.parse(JSON.stringify(tick));
            newTick.flash = problemState == ProblemState.FLASHED;
            Api.updateTick(newTick)
               .then(() => {
                  dispatch(updateTick(newTick))
               })
               .catch(() => {
                  dispatch(setProblemStateFailed())
               });
         }
      }
   };
}