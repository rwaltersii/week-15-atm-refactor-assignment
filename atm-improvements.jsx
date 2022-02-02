const ATMDeposit = ({
  onChange,
  isDeposit,
  atmMode,
  validTransaction,
  inputValue,
}) => {
  const choice = ["Deposit", "Cash Back"];

  // console.log(`ATM isDeposit: ${isDeposit}`);
  // console.log(`atmMode: ${atmMode}`);
  // console.log(`validTranscation: ${validTransaction}`);

  let isValid = !validTransaction;

  return (
    <label className="label huge">
      <div>
        {atmMode && [
          <h3 id="1"> {choice[Number(!isDeposit)]}</h3>,
          <input
            value={inputValue}
            id="number-input"
            type="number"
            width="200"
            onChange={onChange}
          ></input>,
          <input
            type="submit"
            width="200"
            value="Submit"
            id="submit-input"
            disabled={isValid}
          ></input>,
        ]}
      </div>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectionValue, setSelectionValue] = React.useState("");

  let status = `Account Balance $ ${totalState} `;
  // console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    let userEntered = event.target.value;
    setInputValue(userEntered);
    if (userEntered <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode == "Cash Back" && userEntered > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    // console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setInputValue("");
    event.preventDefault();
    setAtmMode("");
    document.getElementById("mode-select").value = "no-selection";
  };

  const handleModeSelect = (event) => {
    let userSelected = event.target.value;
    setAtmMode(userSelected);
    if (userSelected == "Deposit") {
      setIsDeposit(true);
    } else if (userSelected == "Cash Back") {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        atmMode={atmMode}
        validTransaction={validTransaction}
        inputValue={inputValue}
      ></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
