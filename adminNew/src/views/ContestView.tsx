import * as React from 'react';
import * as ReactModal from 'react-modal';
import { Contest } from '../model/contest';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {StoreState} from "../model/storeState";
import {connect, Dispatch} from "react-redux";
import * as asyncActions from "../actions/asyncActions";
import * as actions from "../actions/actions";
import ProblemsComp from "../components/ProblemsComp";
import {CompClass} from "../model/compClass";
import {Problem} from "../model/problem";
import CompClassesComp from "../components/CompClassesComp";
import ContestGeneralComp from "../components/ContestGeneralComp";
import {Color} from "../model/color";

interface Props {
   match: {
      params: {
         contestId: string
      }
   },
   contest:Contest,
   problems:Problem[],
   colors:Color[],
   colorMap: Map<number, Color>,
   compClasses:CompClass[],
   editProblemId?: number

   loadContest?: (contestId: number) => void,
   setNewContest?: () => void,
   updateContest?: (propName:string, value:any) => void,
   saveContest?: () => any,
   loadColors?: () => void,
   setTitle?: (title: string) => void,
   startEditProblem?:(problem:Problem) => void
   cancelEditProblem?:() => void
   saveEditProblem?:() => void
   startAddProblem?:(problem:Problem) => void
   deleteProblem?:(problem:Problem) => void
}

type State = {
   selectedTab: number,
}

class ContestView extends React.Component<Props, State> {
   public readonly state: State = {
      selectedTab: 0,
   };

   constructor(props: Props) {
      super(props);
   }

   componentDidMount() {
      ReactModal.setAppElement("body");

      let contestId : string = this.props.match.params.contestId;
      if(contestId == "new") {
         this.props.setNewContest!();
      } else {
         this.props.loadContest!(parseInt(contestId));
      }
      this.props.loadColors!();
      this.setState(this.state);
   }

   componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
      let title = "";
      if(this.props.contest) {
         title = this.props.contest.isNew ? "Add contest" : this.props.contest.name;
      }
      this.props.setTitle!(title);
   }

   selectTab = (event: any, newValue: number) => {
      this.state.selectedTab = newValue;
      this.setState(this.state)
   };

   render() {
      let selectedTab = this.state.selectedTab;
      let tab;
      let isNew = this.props.contest == undefined || this.props.contest.isNew;
      if(selectedTab == 0) {
         tab = (<ContestGeneralComp key="general"
                                    contest={this.props.contest}
                                    updateContest={this.props.updateContest}
                                    saveContest={this.props.saveContest}
         />);
      } else if(selectedTab == 1) {
         tab = (<CompClassesComp key="compClasses" compClasses={this.props.compClasses} />);
      } else if(selectedTab == 2) {
         tab = (<ProblemsComp key="problems"
                              problems={this.props.problems}
                              colors={this.props.colors}
                              colorMap={this.props.colorMap}
                              editProblemId={this.props.editProblemId}
                              startEditProblem={this.props.startEditProblem}
                              cancelEditProblem={this.props.cancelEditProblem}
                              saveEditProblem={this.props.saveEditProblem}
                              startAddProblem={this.props.startAddProblem}
                              deleteProblem={this.props.deleteProblem}
         />);
      } else if(selectedTab == 3) {
         tab = (<div id="contenders">Item One</div>);
      }
      return [
         (<Tabs key="tabs" value={selectedTab} onChange={this.selectTab}>
            <Tab label="General information" />
            {!isNew && <Tab label="Classes" />}
            {!isNew && <Tab label="Problems" />}
            {!isNew && <Tab label="Contenders" />}
         </Tabs>),
         tab
      ]
   }
}

function mapStateToProps(state: StoreState, props: any): Props {
   return {
      contest: state.contest,
      problems: state.problems,
      compClasses: state.compClasses,
      colors: state.colors,
      colorMap: state.colorMap,
      editProblemId: state.editProblemId,
      match: props.match
   };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
   return {
      loadContest: (contestId: number) => dispatch(asyncActions.loadContest(contestId)),
      setNewContest: () => dispatch(actions.setNewContest()),
      updateContest: (propName:string, value:any) => dispatch(actions.updateContest({propName: propName, value: value})),
      saveContest: () => dispatch(asyncActions.saveContest()),
      loadColors: () => dispatch(asyncActions.loadColors()),
      setTitle: (title: string) => dispatch(actions.setTitle(title)),
      startEditProblem: (problem: Problem) => dispatch(actions.startEditProblem(problem)),
      cancelEditProblem: () => dispatch(actions.cancelEditProblem()),
      saveEditProblem: () => dispatch(asyncActions.saveEditProblem()),
      startAddProblem: (problem: Problem) => dispatch(actions.startAddProblem(problem)),
      deleteProblem: (problem: Problem) => dispatch(asyncActions.deleteProblem(problem)),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestView);
