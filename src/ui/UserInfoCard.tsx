// src/UserInfoCard.tsx
import React from "react";

interface UserProfile {
  [key: string]: any;
}

// A simple, library-less JSON syntax highlighter component
function JsonViewer({ data }: { data: object }) {
  // ... (JsonViewer code from previous answer remains the same)
  const jsonString = JSON.stringify(data, null, 2);
  const formatLine = (line: string) => {
    const formattedLine = line
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match) => {
        if (/:$/.test(match)) {
          return `<span class="json-key">${match.slice(0, -1)}</span>:`;
        }
        return `<span class="json-string">${match}</span>`;
      })
      .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
      .replace(/\bnull\b/g, '<span class="json-null">$1</span>')
      .replace(/([0-9.]+)/g, '<span class="json-number">$1</span>');
    return <span dangerouslySetInnerHTML={{ __html: formattedLine }} />;
  };
  return (
    <pre className="json-viewer">
      <code>
        {jsonString.split("\n").map((line, i) => (
          <div key={i} className="json-line">
            <span className="line-number">{i + 1}</span>
            {formatLine(line)}
          </div>
        ))}
      </code>
    </pre>
  );
}

export function UserInfoCard({ profile }: { profile: UserProfile }) {
  // Safely extract nested data using optional chaining to prevent errors
  const credential = profile.hopae_provenance?.presentation?.credentials?.[0];
  const metadata = profile.hopae_provenance?._metadata;
  const issuer = credential?.issuer;

  const verifiedAt = metadata?.verified_at ? new Date(metadata.verified_at).toLocaleString() : undefined;

  return (
    <div className="info-card">
      {/* Section 1: User Profile */}
      <div className="info-section">
        <h3 className="section-title">User Profile</h3>
        <div className="info-grid">
          <InfoItem label="Full Name" value={profile.name} />
          <InfoItem label="Given Name(s)" value={profile.given_name} />
          <InfoItem label="Family Name" value={profile.family_name} />
          <InfoItem label="Birthdate" value={profile.birthdate} />
          <InfoItem label="Gender" value={profile.gender} />
          <InfoItem label="Subject ID" value={profile.sub} isCode />
        </div>
      </div>

      {/* Section 2: Verification Provenance */}
      <div className="info-section">
        <h3 className="section-title">Verification Provenance</h3>
        <div className="info-grid">
          <InfoItem label="Level of Assurance" value={profile.hopae_loa} />
          <InfoItem label="Issuer" value={issuer?.authority_name} />
          <BooleanItem label="Government Issuer" value={issuer?.is_government} />
        </div>
      </div>

      {/* Section 3: Verification Metadata */}
      <div className="info-section">
        <h3 className="section-title">Verification Metadata</h3>
        <div className="info-grid">
          <InfoItem label="Verification ID" value={metadata?.verification_id} isCode />
          <InfoItem label="Verified At" value={verifiedAt} />
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Data Status</h3>
        <MissingAttributes attributes={profile.missing_attributes} />
      </div>

      {/* Section 4: Raw Data */}
      <div className="info-section">
        <h3 className="section-title">Raw UserInfo Data</h3>
        <JsonViewer data={profile} />
      </div>
    </div>
  );
}

// Helper components for consistent display
const InfoItem = ({ label, value, isCode = false }: { label: string; value?: string | number; isCode?: boolean }) => {
  if (value === undefined || value === null) return null;
  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      {isCode ? <code>{value}</code> : <span className="info-value">{value}</span>}
    </div>
  );
};

const BooleanItem = ({ label, value }: { label: string; value?: boolean }) => {
  if (value === undefined || value === null) return null;
  const badgeClass = value ? "status-badge status-success" : "status-badge status-neutral";
  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <div className={badgeClass}>{value ? "Yes" : "No"}</div>
    </div>
  );
};

const MissingAttributes = ({ attributes }: { attributes?: string[] }) => {
  if (!attributes || attributes.length === 0) {
    return <div className="status-badge status-success">All requested attributes were provided.</div>;
  }
  return <div className="status-badge status-warning">Missing attributes: {attributes.join(", ")}</div>;
};
