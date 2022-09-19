import { style } from "typestyle";

export const messageFormWrapperStyle = style({
  fontFamily:
    "system-ui,-apple-system,system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif",
  border: "1px solid aliceblue",
  borderRadius: ".25rem",
  boxShadow: "aliceblue 0 1px 3px 0",
  padding: "1rem",
  margin: "1rem",
});

export const messageFormHeadingStyle = style({
  fontSize: "1rem",
  textAlign: "center",
  margin: "0 0 20px 0",
  color: "aliceblue",
});

export const messageFormStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "10px",
  color: "white",
});

export const inputWrapperStyle = style({
  display: "flex",
  flexDirection: "column",
  rowGap: "5px",
  width: "100%",
});

export const inputStyle = style({
  fontSize: "1rem",
});

export const buttonStyle = style({
  marginTop: "10px",
  fontSize: "15px",
  padding: "5px 30px",
  fontWeight: "500",
});
