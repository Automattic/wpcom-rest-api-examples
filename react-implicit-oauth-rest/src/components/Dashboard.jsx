import Profile from "./Profile";
import PublishPost from "./PublishPost";

const Dashboard = ({ profile, accessToken, tokenInfo }) => {
  if (!profile || !tokenInfo || !accessToken) return null;

  return (
    <div>
      <Profile profile={profile} accessToken={accessToken} tokenInfo={tokenInfo} />
      {accessToken && <PublishPost accessToken={accessToken} tokenInfo={tokenInfo} />}
    </div>
  );
};

export default Dashboard;