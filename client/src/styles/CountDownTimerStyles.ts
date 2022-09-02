import { style } from "typestyle";

export const countdownTimerWrapperStyle = style({
  textAlign: "center",
});

export const countdownTimerHeadingStyle = style({
  fontFamily:
    "system-ui,-apple-system,system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif",
  fontWeight: "600",
  fontSize: "1.1rem",
});

export const subscribeButtonStyle = style({
  fontSize: "15px",
  padding: "10px",
  margin: "1rem",
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: ".25rem",
  boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
  cursor: "pointer",
  fontFamily:
    "system-ui,-apple-system,system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif",
  fontWeight: "500",
  $nest: {
    "&:hover": {
      borderColor: "rgba(0, 0, 0, 0.15)",
      boxShadow: "rgba(0, 0, 0, 0.1) 0 4px 12px",
      color: "rgba(0, 0, 0, 0.65)",
    },
  },
});
