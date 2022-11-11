import './App.css';

function Dice(props) {
  const hold= props.hold;
  return (
    <button className={hold ? "color dice" : "dice"} onClick={props.onHold}>
        {props.num}
    </button>
  );
}

export default Dice;