// Compass calibration prompt component
import { useState } from 'react';

interface CompassCalibrationProps {
  accuracy: number; // Current compass accuracy in degrees
  onDismiss: () => void;
}

/**
 * Compass calibration component
 * Shows when compass accuracy is poor (> 20°)
 * Provides instructions for calibrating the device compass
 */
export function CompassCalibration({ accuracy, onDismiss }: CompassCalibrationProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if accuracy is good or user dismissed
  if (accuracy <= 20 || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss();
  };

  // Determine accuracy level for color coding
  const getAccuracyLevel = () => {
    if (accuracy > 40) return 'poor';
    if (accuracy > 30) return 'fair';
    return 'moderate';
  };

  const accuracyLevel = getAccuracyLevel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-lg bg-slate-900 border-2 border-cyan-500/30 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🧭</div>
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Compass Calibration</h2>
            <p className="text-sm text-slate-400">Improve heading accuracy</p>
          </div>
        </div>

        {/* Accuracy Meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-300">Current Accuracy</span>
            <span
              className={`text-sm font-bold ${
                accuracyLevel === 'poor'
                  ? 'text-red-400'
                  : accuracyLevel === 'fair'
                  ? 'text-yellow-400'
                  : 'text-orange-400'
              }`}
            >
              ±{accuracy.toFixed(0)}°
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                accuracyLevel === 'poor'
                  ? 'bg-red-500'
                  : accuracyLevel === 'fair'
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
              }`}
              style={{ width: `${Math.min(100, (accuracy / 50) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Target: ±20° or better</p>
        </div>

        {/* Instructions */}
        <div className="mb-6 space-y-3">
          <p className="text-sm text-slate-300">
            To calibrate your compass, move your device in a figure-8 pattern:
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">1.</span>
              <p className="text-sm text-slate-300">
                Hold your device flat in front of you
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">2.</span>
              <p className="text-sm text-slate-300">
                Move it in a figure-8 motion (∞) for 10-15 seconds
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">3.</span>
              <p className="text-sm text-slate-300">
                Rotate your body 360° while holding the device
              </p>
            </div>
          </div>

          {/* Visual Figure-8 */}
          <div className="flex justify-center py-4">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              className="text-cyan-400/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M 20 30 Q 35 10, 50 30 T 80 30 Q 95 50, 110 30"
                strokeLinecap="round"
              />
              <circle cx="20" cy="30" r="4" fill="currentColor" />
            </svg>
          </div>

          <p className="text-xs text-slate-400 italic">
            💡 Tip: Move away from metal objects and electronics for best results
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
