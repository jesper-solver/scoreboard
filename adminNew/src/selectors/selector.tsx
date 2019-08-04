import { createSelector } from 'reselect'
import { StoreState } from '../model/storeState';
import {Color} from "../model/color";
import {CompClass} from "../model/compClass";
import {Organizer} from "../model/organizer";
import {CompLocation} from "../model/compLocation";

const getColors = (state: StoreState) => state.colors;
const getCompClasses = (state: StoreState) => state.compClasses;
const getContests = (state: StoreState) => state.contests;
const getOrganizers = (state: StoreState) => state.organizers;
const getLocations = (state: StoreState) => state.locations;
const getProblems = (state: StoreState) => state.problems;
const getContenders = (state: StoreState) => state.contenders;

const getOrganizer = (state: StoreState) => state.organizer;

export const getColorMap = createSelector(
   [getColors],
   (colors) => {
      const colorMap = new Map<number, Color>();
      if(colors) {
         colors.forEach(color => colorMap.set(color.id, color));
      }
      return colorMap;
   }
);

export const getCompClassMap = createSelector(
   [getCompClasses],
   (compClasses) => {
      const map = new Map<number, CompClass>();
      if(compClasses) {
         compClasses.forEach(compClass => map.set(compClass.id, compClass));
      }
      return map;
   }
);

export const getLocationMap = createSelector(
   [getLocations],
   (locations) => {
      const map = new Map<number, CompLocation>();
      if(locations) {
         locations.forEach(location => map.set(location.id, location));
      }
      return map;
   }
);

export const getOrganizerMap = createSelector(
   [getOrganizers],
   (organizers) => {
      const map = new Map<number, Organizer>();
      if(organizers) {
         organizers.forEach(organizer => map.set(organizer.id, organizer));
      }
      return map;
   }
);

export const getOrganizerContests = createSelector(
   [getContests, getOrganizer],
   (contests, organizer) => {
      return contests && organizer ? contests.filter(c => c.organizerId == organizer.id) : undefined;
   }
);

export const getOrganizerColors = createSelector(
   [getColors, getOrganizer],
   (colors, organizer) => {
      return colors && organizer ? colors.filter(c => c.organizerId == organizer.id) : undefined;
   }
);

export const getContestIssues = createSelector(
   [getProblems, getCompClasses, getContenders],
   (problems, compClasses, contenders) => {
      let issues: string[] = [];
      if(problems && problems.length < 1) {
         issues.push("Please add problems")
      }
      if(compClasses && compClasses.length == 0) {
         issues.push("Please add at least one competition class")
      }
      if(contenders && contenders.length == 0) {
         issues.push("Please add contenders")
      }
      return issues;
   }
);




/*const getScoreboardContenders = (state: StoreState, props: any) => {
   if (state.scoreboardData) {
      return state.scoreboardData.find(list => list.compClass.name == props.compClass.name)!.contenders;
   } else {
      return undefined;
   }
}

const createList = (getScore: (sc: ScoreboardContender) => number, maxCount: number, scoreboardContenders?: ScoreboardContender[]) => {
   console.log("makeGetTotalList");
   if (scoreboardContenders) {
      scoreboardContenders = scoreboardContenders.sort((a, b) => getScore(b) - getScore(a));
      let position = 0;
      let lastScore = -1;
      let maxFulfilled = false;
      let listItems = scoreboardContenders.map((sc, index) => {
         let score = getScore(sc);
         if(score != lastScore) {
            lastScore = score;
            position = index + 1;
            maxFulfilled = maxCount != 0 && index >= maxCount;
         }
         if(maxFulfilled) {
            return undefined;
         } else {
            let x: ScoreboardListItem = {
               contenderId: sc.contenderId,
               position: position,
               contenderName: sc.contenderName,
               score: score
            }
            return x;
         }
      }).filter(sc => sc) as ScoreboardListItem[];

      if(maxCount) {
         // Remove contenders without score:
         listItems = listItems.filter(l => l.score);
      }
      return listItems;
   } else {
      return undefined;
   }
}

export const makeGetTotalList = () => {
   return createSelector(
      [getScoreboardContenders],
      (scoreboardContenders) => createList((sc: ScoreboardContender) => sc.totalScore, 0, scoreboardContenders)
   )
}

export const makeGetFinalistList = () => {
   return createSelector(
      [getScoreboardContenders],
      (scoreboardContenders) => createList((sc: ScoreboardContender) => sc.qualifyingScore, 7, scoreboardContenders)
   )
}*/