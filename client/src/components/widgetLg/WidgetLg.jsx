import "./widgetLg.css";
import { useState, useEffect } from "react";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import { toast } from "react-toastify";

const WidgetLg = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    request("GET", path.getLatestBilling)
      .then((res) => setTransactions(res))
      .catch((err) => toast.error(err.message));
  }, []);
  const Button = ({ type }) => {
    return <button className={"widget-lg__button " + type}>{type}</button>;
  };
  return (
    <div className="widget-lg">
      <h3 className="widget-lg--title">Latest transactions</h3>
      <table className="widget-lg__table">
        <tr className="widget-lg__tr">
          <th className="widget-lg__th">Customer</th>
          <th className="widget-lg__th">Date</th>
          <th className="widget-lg__th">Amount</th>
          <th className="widget-lg__th">Status</th>
        </tr>
        {transactions.map((transaction) => (
          <tr key={transactions.id} className="widget-lg__tr">
            <td className="widget-lg--user">
              <img
                src={transaction.users.avatar}
                alt=""
                className="widget-lg__img"
              />
              <span className="widget-lg--name">{transaction.users.email}</span>
            </td>
            <td className="widget-lg--date">{transaction.createdAt}</td>
            <td className="widget-lg--amount">{transaction.amount}</td>
            <td className="widget-lg--status">
              <Button type="Approved" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default WidgetLg;
