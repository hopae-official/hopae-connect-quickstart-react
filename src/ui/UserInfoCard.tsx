import { useEffect } from "react";

interface UserProfile {
  given_name?: string;
  family_name?: string;
  birthdate?: string;
  acr?: string;
  hopae_loa?: number;
  missing_attributes?: string[];
  sub?: string;
  source_id?: string;
  hopae_provenance?: {
    _metadata?: {
      verification_id?: string;
      verified_at?: string;
    };
    presentation?: {
      credentials?: {
        type?: string;
      }[];
    };
  };
}

export function UserInfoCard({ profile }: { profile: UserProfile }) {
  useEffect(() => {
    console.log("Full userinfo object from Hopae Connect:", profile);
  }, [profile]);

  const verificationMethod = profile.hopae_provenance?.presentation?.credentials?.[0]?.type || "N/A";
  const verifiedAt = profile.hopae_provenance?._metadata?.verified_at ? new Date(profile.hopae_provenance._metadata.verified_at).toLocaleString() : "N/A";

  return (
    <div className="info-card">
      <div className="info-section">
        <h3 className="section-title">Primary Information</h3>
        <div className="info-grid">
          <InfoItem label="Given Name" value={profile.given_name} />
          <InfoItem label="Family Name" value={profile.family_name} />
          <InfoItem label="Birthdate" value={profile.birthdate} />
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Verification Details</h3>
        <div className="info-grid">
          <InfoItem label="Level of Assurance (LoA)" value={profile.hopae_loa} />
          <InfoItem label="Verification Method" value={verificationMethod} isCode />
          <InfoItem label="Verified At" value={verifiedAt} />
          <InfoItem label="Verification ID" value={profile.hopae_provenance?._metadata?.verification_id} isCode />
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Data Status</h3>
        <MissingAttributes attributes={profile.missing_attributes} />
      </div>

      <p className="console-note">The full, raw userinfo object has been logged to the developer console for inspection.</p>
    </div>
  );
}

// Helper component for consistent display
const InfoItem = ({ label, value, isCode = false }: { label: string; value?: string | number; isCode?: boolean }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    {isCode ? <code>{value || "N/A"}</code> : <span className="info-value">{value || "N/A"}</span>}
  </div>
);

// Helper component for displaying missing attributes
const MissingAttributes = ({ attributes }: { attributes?: string[] }) => {
  if (!attributes || attributes.length === 0) {
    return <div className="status-badge status-success">All requested attributes were provided.</div>;
  }
  return <div className="status-badge status-warning">Missing attributes: {attributes.join(", ")}</div>;
};
