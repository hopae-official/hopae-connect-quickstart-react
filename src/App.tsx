import { useHopaeConnect } from "./HopaeConnectProvider";
import { UserInfoCard } from "./ui/UserInfoCard";

function App() {
  const { verifiedUser, startVerification, isLoading } = useHopaeConnect();

  if (isLoading) {
    return (
      <div className="card">
        <p className="text-muted-foreground">Connecting to Hopae Connect...</p>
      </div>
    );
  }

  return (
    <div className="card">
      {verifiedUser ? (
        // STATE 1: VERIFICATION COMPLETE
        <>
          <div className="card-header-container">
            <h1 className="card-header">✅ Verification Successful</h1>
            <button onClick={startVerification} className="button button-secondary">
              Verify Again
            </button>
          </div>
          <p className="card-description">
            Key claims from the <strong>/userinfo</strong> endpoint are displayed below, along with the full raw data.
          </p>
          <UserInfoCard profile={verifiedUser.profile} />
        </>
      ) : (
        // STATE 2: PENDING VERIFICATION
        <>
          <h1 className="card-header">Identity Verification Required</h1>
          <p className="card-description">To proceed, you must verify your identity using Hopae Connect.</p>
          <button onClick={startVerification} className="button button-primary">
            Start Verification
          </button>
        </>
      )}
    </div>
  );
}

export default App;
