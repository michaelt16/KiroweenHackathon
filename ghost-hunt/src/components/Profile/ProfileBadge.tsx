import './ProfileBadge.css';

interface ProfileBadgeProps {
  username?: string;
  rank?: string;
  level?: number;
  xp?: number;
  xpToNextLevel?: number;
  investigationsCompleted?: number;
  ghostsCaught?: number;
  successRate?: number;
}

export function ProfileBadge({
  username = 'AGENT_001',
  rank = 'ROOKIE',
  level = 1,
  xp = 0,
  xpToNextLevel = 100,
  investigationsCompleted = 0,
  ghostsCaught = 0,
  successRate = 0,
}: ProfileBadgeProps) {
  const xpPercentage = (xp / xpToNextLevel) * 100;

  return (
    <div className="profile-badge">
      {/* Header */}
      <div className="profile-badge-header">
        <div className="profile-badge-title">INVESTIGATOR ID</div>
        <div className="profile-badge-clearance">CLEARANCE: LEVEL {level}</div>
      </div>

      {/* Avatar */}
      <div className="profile-avatar">
        <div className="profile-avatar-silhouette">👤</div>
        <div className="profile-avatar-static" />
      </div>

      {/* User Info */}
      <div className="profile-info">
        <div className="profile-username">{username}</div>
        <div className="profile-rank">{rank}</div>
      </div>

      {/* XP Progress */}
      <div className="profile-xp">
        <div className="profile-xp-label">
          <span>EXPERIENCE</span>
          <span>{xp} / {xpToNextLevel}</span>
        </div>
        <div className="profile-xp-bar">
          <div 
            className="profile-xp-fill"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="profile-stat">
          <div className="profile-stat-label">INVESTIGATIONS</div>
          <div className="profile-stat-value">{investigationsCompleted}</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-label">GHOSTS CAUGHT</div>
          <div className="profile-stat-value">{ghostsCaught}</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-label">SUCCESS RATE</div>
          <div className="profile-stat-value">{successRate}%</div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="profile-bracket profile-bracket-tl" />
      <div className="profile-bracket profile-bracket-tr" />
      <div className="profile-bracket profile-bracket-bl" />
      <div className="profile-bracket profile-bracket-br" />
    </div>
  );
}
