import { useApiData } from './hooks/useApiData';
import Header from './components/Header';
import AgentStatus from './components/AgentStatus';
import AgentDecisions from './components/AgentDecisions';
import ForecastChart from './components/ForecastChart';
import ProductionMetrics from './components/ProductionMetrics';
import BatteryStatus from './components/BatteryStatus';
import AlertsBanner from './components/AlertsBanner';
import ManualControlPanel from './components/ManualControlPanel';

function App() {
  const {
    agents,
    forecast,
    beliefs,
    systemMode,
    loading,
    error,
    lastUpdated,
    setSystemMode,
    sendIntention
  } = useApiData();

  // Check if all agents are healthy
  const agentsHealthy = agents.every(agent =>
    agent.state !== 'EMERGENCY' && agent.state !== 'DEGRADED'
  );

  if (loading && agents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading solar system data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header
        systemMode={systemMode}
        onModeChange={setSystemMode}
        agentsHealthy={agentsHealthy}
        lastUpdated={lastUpdated}
      />

      <main className="p-6">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">System Alert</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Agent Status - takes 1 column */}
          <div className="lg:col-span-1">
            <AgentStatus agents={agents} />
          </div>

          {/* Forecast Chart - takes 3 columns */}
          <div className="lg:col-span-3">
            <ForecastChart forecast={forecast} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Production Metrics */}
          <ProductionMetrics beliefs={beliefs} />

          {/* Battery Status */}
          <BatteryStatus beliefs={beliefs} />
        </div>

        {/* Agent Decisions */}
        <div className="mb-6">
          <AgentDecisions />
        </div>
        
        {/* Agent Decisions */}
        <div className="mb-6">
          <AgentDecisions />
        </div>
        
        {/* Manual Control Panel - only show when in manual mode */}
        <ManualControlPanel 
          onSendIntention={sendIntention}
          isVisible={systemMode === 'MANUAL'}
        />
      </main>
      
      <AlertsBanner />
    </div>
  );
}

export default App;