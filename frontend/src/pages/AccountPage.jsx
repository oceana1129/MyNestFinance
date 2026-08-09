import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import NavBar from "../components/navigation/NavBar";
import AppPageDisplay from "../components/data-display/AppPageDisplay";
import { formatCurrency } from "../utils/FormatCurrency.js";

const AccountPage = () => {
  const { user, profile, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // formats an amount using user's currency/decimal preferences
  const displayMoney = (amount) => formatCurrency(amount, profile?.settings);

  return (
    <AppPageDisplay
      nav={<NavBar activePage="settings" />}
      contentPrimary={
        <div className="p-4 flex flex-col gap-4">
          <p>User Email: {user && user.email}</p>
          <p>Example amount: {displayMoney(1234.5)}</p>
          <button onClick={handleLogout} className="btn btn-primary">
            Log Out
          </button>
        </div>
      }
    />
  );
};

export default AccountPage;
