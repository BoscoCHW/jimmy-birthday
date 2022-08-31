import { style } from "typestyle";

export const counterStyle = style({
  display: 'flex',
  alignItems: 'center',
  margin: '2rem',
  columnGap: '5px'
});

export const timeComponentWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  columnGap: '5px'
})

export const numberCardsWrapperStyle = style({
  display: 'flex',
  columnGap: '2px'
})

export const numberCardStyle = style({
  position: 'relative',
  flex: '0 1 25%',
  fontSize: '1.7rem',
  backgroundColor: '#404549',
  borderRadius: '5px',
  padding: '10px 12px',
  color: 'white'
})

export const colonDotsWrapperStyle = style({
  display: "flex",
  flexDirection: 'column',
  alignSelf: 'end',
  marginBottom: '12px'
})

export const colonDotStyles = style({
  display: "inline-block",
  width: "6px",
  height: "6px",
  backgroundColor: "black",
  margin: "5px 0px",
  borderRadius: '6px',
});
