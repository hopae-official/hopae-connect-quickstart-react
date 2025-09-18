import { UserInfoCard } from "./ui/UserInfoCard";
import { useHopaeConnect } from "./HopaeConnectProvider";

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
          <h1 className="card-header">✅ Verification Successful</h1>
          <p className="card-description">
            The user has been verified. Key claims from the <strong>/userinfo</strong> endpoint are displayed below.
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
