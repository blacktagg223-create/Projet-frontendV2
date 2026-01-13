import { useState, useEffect } from 'react';
import { TriangleAlert as AlertTriangle, X, Shield } from 'lucide-react';

const AlertsBanner = ({ alerts = [] }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  useEffect(() => {
    // Mock some alerts for demonstration
    const mockAlerts = [
      {
        id: 1,
        severity: 'WARNING',
        type: 'BATTERY_HIGH_TEMPERATURE',
        message: 'Battery temperature approaching safety limits',
        recommendation: 'Reduce charging rate',
        timestamp: new Date().toISOString()
      }
    ];
    
    setVisibleAlerts(alerts.length > 0 ? alerts : mockAlerts);
  }, [alerts]);

  const dismissAlert = (alertId) => {
    setVisibleAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Auto-dismiss alerts after 10 seconds
  useEffect(() => {
    const timers = visibleAlerts.map(alert => 
      setTimeout(() => dismissAlert(alert.id), 10000)
    );
    
    return () => timers.forEach(clearTimeout);
  }, [visibleAlerts]);

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`border-l-4 p-4 mb-2 mx-4 rounded-r-lg shadow-lg transition-all duration-300 ${
            alert.severity === 'CRITICAL'
              ? 'bg-red-900 border-red-500 text-red-100'
              : 'bg-orange-900 border-orange-500 text-orange-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {alert.type.includes('SECURITY') ? (
                  <Shield className={`w-5 h-5 ${
                    alert.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'
                  }`} />
                ) : (
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'
                  }`} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-red-800 text-red-100'
                      : 'bg-orange-800 text-orange-100'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-sm font-medium">
                    {alert.type.replace(/_/g, ' ')}
                  </span>
                </div>
                
                <p className="text-sm mb-2">{alert.message}</p>
                
                {alert.recommendation && (
                  <p className="text-xs opacity-75">
                    <strong>Recommendation:</strong> {alert.recommendation}
                  </p>
                )}
                
                <div className="text-xs opacity-60 mt-2">
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 ml-4 p-1 rounded hover:bg-black/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsBanner;