import KoFi from "./KoFi";

// import styles from "./styles.css";

export default function App(props) {
  return (
    <div className="flex  justify-start">
      {/* <h1>Ko-Fi button</h1> */}

      <a href={`https://ko-fi.com/${props.kofiId?props.kofiId:'prototyprio'}`} target='_blank'>
        <img height='36' style={{border:'0px',height:'28px'}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />
      </a>
      
        {/* <KoFi color={props.color?props.color:"#29abe0"} id={props.kofiId?props.kofiId:'prototyprio'} label={"Donate"} /> */}
      {/* <p>
        <KoFi color="#29ab00" id="L3L7R7WE" label="Buy me a Ko-fi" />
      </p>   */}
    </div>
  );
}
