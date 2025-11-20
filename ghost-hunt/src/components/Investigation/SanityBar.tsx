// Sanity bar component
import { useInvestigation } from '../../context/InvestigationContext';

export function SanityBar() {
  const { sanity } = useInvestigation();

  const getColor = () => {
    if (sanity > 60) return '#10b981';
    if (sanity > 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        minWidth: '200px',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: getColor(),
          marginBottom: '6px',
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Sanity
      </div>
      <div
        style={{
          height: '8px',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${sanity}%`,
            background: getColor(),
            transition: 'width 0.5s, background-color 0.5s',
            boxShadow: `0 0 10px ${getColor()}`,
          }}
        />
      </div>
    </div>
  );
}
