

import '../styles/dashboard.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const Dashboard = () => {
  return (
    <div className="dashboard__wrapper">
      <div className="dashboard__container">
        <span className="dishboard__title">Users</span>
        <div className="dashboard__cards">
          <span className="dashboard__span">13.5K</span>
        </div>
      </div>
      <div className="dashboard__container">
        <span className="dishboard__title">Posts</span>
        <div className="dashboard__cards">
          <span className="dashboard__span">135K</span>
        </div>
      </div>
      <div className="dashboard__container">
        <span className="dishboard__title">View all</span>
        <div className="dashboard__cards">
          <span className="dashboard__span">187K</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;