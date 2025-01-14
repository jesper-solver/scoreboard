import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactElement } from "react";

interface Props {
  color: string | undefined;
  className?: string;
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    box: {
      width: 24,
      height: 24,
      borderRadius: 5,
      backgroundColor: ({ color }) => color ?? "transparent",
      display: "inline-block",
      flexShrink: 0,
    },
  })
);

function ColorSquare(props: Props): ReactElement {
  const classes = useStyles(props);

  return <div className={`${classes.box} ${props.className}`}></div>;
}

export default ColorSquare;
