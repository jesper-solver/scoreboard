import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { StoreState } from "../../model/storeState";
import { connect } from "react-redux";
import {} from "../../actions/actions";
import ContestEdit from "./ContestEdit";
import RaffleList from "../raffle/RaffleList";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import CompClassList from "../compClass/CompClassList";
import { useLocation } from "react-router-dom";
import ProblemList from "../problem/ProblemList";
import ContenderList from "../contender/ContenderList";
import {
  reloadColors,
  loadCompClasses,
  loadProblems,
  loadContenders,
  loadTicks,
  loadRaffles,
} from "../../actions/asyncActions";
import { loadSharedPoints, loadContenderScoring } from "../../actions/actions";
import { Color } from "../../model/color";
import { RouteComponentProps, withRouter } from "react-router";
import { Client, Message } from "@stomp/stompjs";
import { ContenderScoring } from "src/model/contenderScoring";
import { SharedPoints } from "src/model/sharedPoints";

interface Props {
  match: {
    params: {
      contestId: string;
    };
  };

  colors?: Color[];
  loadColors?: () => Promise<void>;
  loadCompClasses?: (contestId: number) => Promise<void>;
  loadProblems?: (contestId: number) => Promise<void>;
  loadContenders?: (contestId: number) => Promise<void>;
  loadTicks?: (contestId: number) => Promise<void>;
  loadRaffles?: (contestId: number) => Promise<void>;
  loadContenderScoring?: (scoring: ContenderScoring) => void;
  loadSharedPoints?: (sharedPoints: SharedPoints) => void;
}

const ContestInfo = (props: Props & RouteComponentProps) => {
  let selectedPath = useLocation().pathname;
  let [contestId, setContestId] = useState<number | undefined>(undefined);
  let [stompClient, setStompClient] = useState<any>(undefined);

  useEffect(() => {
    if (contestId) {
      let client = new Client({
        brokerURL: "ws://localhost:8080/api/live/websocket",
        //brokerURL: "wss://api.climblive.app/live/websocket",
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function (frame) {
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
        console.log("subscribe " + contestId);
        client.subscribe(
          "/topic/contest/" + contestId + "/updates/scoring",
          (message) => {
            console.log(JSON.parse(message.body));
            props.loadContenderScoring?.(JSON.parse(message.body));
          }
        );
        client.subscribe(
          "/topic/contest/" + contestId + "/updates/problem",
          (message) => {
            console.log(JSON.parse(message.body));
            props.loadSharedPoints?.(JSON.parse(message.body));
          }
        );
      };

      client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      };

      client.activate();
    }
  }, [contestId]);

  useEffect(() => {
    let id: string = props.match.params.contestId;
    if (id !== "new") {
      setContestId(parseInt(id));
    }
  }, [props.match]);

  useEffect(() => {
    if (contestId == undefined) {
      return;
    }

    Promise.all([
      props.colors == undefined ? props.loadColors?.() : Promise.resolve(),
      props.loadCompClasses?.(contestId),
      props.loadProblems?.(contestId),
      props.loadContenders?.(contestId),
      props.loadTicks?.(contestId),
      props.loadRaffles?.(contestId),
    ]);
  }, [contestId]);

  const selectTab = (event: any, newValue: string) => {
    props.history.push(newValue);
  };

  const createLink = (tab?: string): string => {
    if (contestId == undefined) {
      return "/contests/new";
    }

    let path = "/contests/" + contestId;
    if (tab != undefined) {
      path += "/" + tab;
    }

    return path;
  };

  if (!selectedPath.endsWith("/new") && contestId == undefined) {
    return <></>;
  }

  let tabs = [
    <Tab
      key={0}
      label="General information"
      value={createLink()}
      component={Link}
      to={createLink()}
    />,
  ];

  if (contestId) {
    tabs = [
      ...tabs,
      <Tab
        key={1}
        label="Classes"
        value={createLink("classes")}
        component={Link}
        to={createLink("classes")}
      />,
      <Tab
        key={2}
        label="Problems"
        value={createLink("problems")}
        component={Link}
        to={createLink("problems")}
      />,
      <Tab
        key={3}
        label="Contenders"
        value={createLink("contenders")}
        component={Link}
        to={createLink("contenders")}
      />,
      <Tab
        key={4}
        label="Raffles"
        value={createLink("raffles")}
        component={Link}
        to={createLink("raffles")}
      />,
    ];
  }

  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Tabs key="tabs" value={selectedPath} onChange={selectTab}>
        {tabs}
      </Tabs>

      <Switch>
        <Route path="/contests/:contestId" exact>
          <ContestEdit key="general" contestId={contestId} />
        </Route>
        <Route path="/contests/:contestId/classes">
          <CompClassList key="compClasses" contestId={contestId} />
        </Route>
        <Route path="/contests/:contestId/problems">
          <ProblemList key="problems" contestId={contestId} />
        </Route>
        <Route path="/contests/:contestId/contenders">
          <ContenderList key="contenders" contestId={contestId} />
        </Route>
        <Route path="/contests/:contestId/raffles">
          <RaffleList key="raffles" contestId={contestId} />
        </Route>
      </Switch>
    </div>
  );
};

function mapStateToProps(state: StoreState, props: any): Props {
  return {
    match: props.match,
    colors: state.colors,
  };
}

const mapDispatchToProps = {
  loadColors: reloadColors,
  loadCompClasses,
  loadProblems,
  loadContenders,
  loadTicks,
  loadRaffles,
  loadContenderScoring,
  loadSharedPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);