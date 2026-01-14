import { useState } from 'react';
import { Settings, Battery, Zap, TriangleAlert as AlertTriangle } from 'lucide-react';

const ManualControlPanel = ({ onSendIntention, isVisible }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAction = async (action, params = {}) => {
    setLoading(true);
    setMessage('');
    
    try {
      const intention = {
        target_agent: getTargetAgent(action),
        action: action,
        parameters: params,
        validity: {
          start: new Date().toISOString(),
          end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours from now
        }
      };
      
      const response = await onSendIntention(intention);
      setMessage(`✓ Intention accepted: ${response.intention_id}`);
    } catch (error) {
      setMessage(`✗ Failed to send intention: ${error.message}`);
    }
    
    setLoading(false);
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  const getTargetAgent = (action) => {
    switch (action) {
      case 'CHARGE_BATTERY':
      case 'DISCHARGE_BATTERY':
        return 'reactive_storage';
      case 'MAXIMIZE_PRODUCTION':
        return 'reactive_production';
      case 'EMERGENCY_STOP':
        return 'bdi_supervisor_01';
      default:
        return 'bdi_supervisor_01';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-orange-500">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-white">Manual Control Panel</h2>
        <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">
          MANUAL MODE
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-6">
        System is in manual mode. You can send direct intentions to agents.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => handleAction('CHARGE_BATTERY', { target_soc: 90, rate: 'max' })}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <Battery className="w-5 h-5" />
          Charge to 90%
        </button>
        
        <button
          onClick={() => handleAction('MAXIMIZE_PRODUCTION', { mode: 'max_power_point' })}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <Zap className="w-5 h-5" />
          Maximize Production
        </button>
        
        <button
          onClick={() => handleAction('DISCHARGE_BATTERY', { target_soc: 20, rate: 'controlled' })}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <Battery className="w-5 h-5 rotate-180" />
          Discharge Battery
        </button>
        
        <button
          onClick={() => handleAction('EMERGENCY_STOP', { reason: 'manual_intervention' })}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <AlertTriangle className="w-5 h-5" />
          Emergency Stop
        </button>
      </div>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          message.startsWith('✓') 
            ? 'bg-green-900 text-green-100 border border-green-700' 
            : 'bg-red-900 text-red-100 border border-red-700'
        }`}>
          {message}
        </div>
      )}
      
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-sm text-gray-400">Sending intention...</span>
        </div>
      )}
    </div>
  );
};

export default ManualControlPanel;