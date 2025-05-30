import { useState } from "react";
import "./CalculateEMI.scss";

const CalculateEMI = () => {
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [isYearly, setIsYearly] = useState<boolean>(true);

  const monthlyRate = rate / 12 / 100;
  const totalMonths = isYearly ? tenure * 12 : tenure;

  const emi =
    amount && rate && tenure
      ? (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  return (
    <div className="emi-container">
      <h2>Calculate EMI</h2>
      <div className="emi-wrapper">
        <div className="emi-form">
          <h3>EMI Calculator</h3>
          <label>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter loan amount"
            />
          </label>

          <label>
            Interest Rate (%)
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="Annual interest rate"
            />
          </label>

          <label>
            Loan Tenure
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              placeholder="Loan duration"
            />
          </label>

          <div className="emi-radio">
            <label>
              <input
                type="radio"
                checked={isYearly}
                onChange={() => setIsYearly(true)}
              />
              Yearly
            </label>
            <label>
              <input
                type="radio"
                checked={!isYearly}
                onChange={() => setIsYearly(false)}
              />
              Monthly
            </label>
          </div>
        </div>

        <div className="emi-results">
          <div>
            <h4>Loan EMI</h4>
            <p>₹ {emi.toFixed(0)}</p>
          </div>
          <div>
            <h4>Total Interest Payable</h4>
            <p>₹ {totalInterest.toFixed(0)}</p>
          </div>
          <div>
            <h4>Total of Payments (Principal + Interest)</h4>
            <p>₹ {totalPayment.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateEMI;
