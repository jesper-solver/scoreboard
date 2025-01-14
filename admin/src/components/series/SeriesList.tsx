import { Button, TableCell } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RefreshIcon from "@material-ui/icons/Refresh";
import React, { useCallback, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getSelectedOrganizer } from "src/selectors/selector";
import { setTitle } from "../../actions/actions";
import { reloadSeries } from "../../actions/asyncActions";
import { Series } from "../../model/series";
import { StoreState } from "../../model/storeState";
import ContentLayout from "../ContentLayout";
import { ProgressButton } from "../ProgressButton";
import ResponsiveTableHead from "../ResponsiveTableHead";
import ResponsiveTableSpanningRow from "../ResponsiveTableSpanningRow";
import SeriesEdit from "./SeriesEdit";
import SeriesView from "./SeriesView";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emptyText: { padding: theme.spacing(2) },
  })
);

const breakpoints = new Map<number, string>();

const SeriesList = (props: Props & PropsFromRedux) => {
  const { setTitle, reloadSeries } = props;

  React.useEffect(() => {
    setTitle("Series");
  }, [setTitle]);

  const refreshSeries = useCallback(() => {
    setRefreshing(true);
    reloadSeries().finally(() => setRefreshing(false));
  }, [reloadSeries]);

  React.useEffect(() => {
    if (props.series === undefined) {
      refreshSeries();
    }
  }, [props.series, refreshSeries]);

  const classes = useStyles();

  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onCreateDone = () => {
    setShowCreate(false);
  };

  const buttons = [
    <Button
      variant="contained"
      color="secondary"
      size="small"
      disabled={showCreate}
      onClick={() => setShowCreate(true)}
      startIcon={<AddIcon />}
    >
      Add
    </Button>,
    <ProgressButton
      variant="contained"
      color="secondary"
      size="small"
      onClick={refreshSeries}
      startIcon={<RefreshIcon />}
      loading={refreshing}
    >
      Refresh
    </ProgressButton>,
  ];

  const headings = [<TableCell>Name</TableCell>];

  return (
    <ContentLayout buttons={buttons}>
      <Table>
        <ResponsiveTableHead cells={headings} breakpoints={breakpoints} />
        <TableBody>
          {showCreate && (
            <ResponsiveTableSpanningRow colSpan={3}>
              <SeriesEdit
                onDone={onCreateDone}
                cancellable
                series={{
                  name: "",
                  organizerId: props.selectedOrganizer?.id!,
                }}
              />
            </ResponsiveTableSpanningRow>
          )}

          {props.series?.toArray()?.map((series: Series) => (
            <SeriesView
              key={series.id!}
              series={series}
              breakpoints={breakpoints}
            />
          ))}
        </TableBody>
      </Table>
      {!showCreate && props.series?.size === 0 && (
        <div className={classes.emptyText}>
          Use the plus button to create your first series.
        </div>
      )}
    </ContentLayout>
  );
};

const mapStateToProps = (state: StoreState, props: Props) => ({
  series: state.series,
  selectedOrganizer: getSelectedOrganizer(state),
});

const mapDispatchToProps = {
  reloadSeries,
  setTitle,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SeriesList);
