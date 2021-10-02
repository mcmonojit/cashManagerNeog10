import "./styles.css";
import Header from "./components/Header";
import GuideCard from "./components/GuideCard";
import Output from "./components/Output";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState();
  const [payment, setPayment] = useState();
  const [count, setCount] = useState([]);
  const [warning, setWarning] = useState("");
  const [flag, setFlag] = useState(false);
  const notes = [2000, 500, 100, 20, 10, 5, 1];
  let ct = [0, 0, 0, 0, 0, 0, 0];

  const calculateChange = () => {
    if (bill > 0 && payment > 0) {
      setFlag(true);
      setWarning("");
      let changeAmt = bill - payment;
      for (let i = 0; i < notes.length; i++) {
        if (notes[i] <= changeAmt) {
          ct[i] = Math.floor(changeAmt / notes[i]);
          changeAmt = changeAmt % notes[i];
        } else ct[i] = 0;
      }
      setCount(ct);
      console.log(count);
    } else {
      setWarning("Enter valid amount");
      setFlag(false);
    }
  };

  return (
    <div className="App">
      <Header title={"Cash Manager"} />

      <div className="guide">
        <GuideCard
          textContent={"Enter the bill amount"}
          styling={"cardYellow guideCard"}
        />
        <GuideCard
          textContent={"Enter the amount given by customer"}
          styling={"cardBlue guideCard"}
        />
        <GuideCard
          textContent={"Get minimum denomination of the change"}
          styling={"cardGreen guideCard"}
        />
      </div>

      <div className="Inputbar">
        <label>Bill amount:</label>
        <input
          type="search"
          className="userInput"
          onChange={(event) => {
            setBill(event.target.value);
          }}
        />
      </div>

      <div className="Inputbar">
        <label>Payment:</label>
        <input
          type="search"
          className="userInput"
          onChange={(event) => {
            setPayment(event.target.value);
          }}
        />
      </div>

      <div>
        <button className="btn" onClick={calculateChange}>
          Print
        </button>
      </div>

      <div>
        <>
          {warning.length > 0 ? (
            <div className="warning">
              <p>{warning}</p>
            </div>
          ) : (
            <></>
          )}
        </>

        <>
          {flag === false ? (
            <></>
          ) : (
            <div className="table-container">
              <label>Change:</label>
              <div className="output">
                <table>
                  <tbody>
                    <tr>
                      <td>Denomination</td>
                      {count.map((c) => (
                        <Output data={c} />
                        // return <td>{c}</td>;
                      ))}
                    </tr>
                    <tr>
                      <td>Notes</td>
                      {notes.map((n) => (
                        <Output data={n} />
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
