import { Sun, Power, Wifi } from 'lucide-react';

const Header = ({ systemMode, onModeChange, agentsHealthy, lastUpdated }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            <h1 className="text-xl font-bold text-white">
              Solar PV Multi-Agent System
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${agentsHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-400">
              {agentsHealthy ? 'All Systems Operational' : 'System Issues Detected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wifi className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">System Mode:</span>
            <button
              onClick={() => onModeChange(systemMode === 'AUTO' ? 'MANUAL' : 'AUTO')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                systemMode === 'AUTO'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              <Power className="w-4 h-4" />
              {systemMode}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;