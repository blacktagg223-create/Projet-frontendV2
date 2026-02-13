import { useState } from 'react';
import { Brain, Clock, Target, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { formatTimestamp } from '../utils/helpers';

const DecisionCard = ({ decision }) => {
  const getDecisionIcon = (status) => {
    switch (status) {
      case 'EXECUTED':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'PENDING':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Brain className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'EXECUTED':
        return 'text-green-400 bg-green-900/20 border-green-700';
      case 'FAILED':
        return 'text-red-400 bg-red-900/20 border-red-700';
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      default:
        return 'text-blue-400 bg-blue-900/20 border-blue-700';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getDecisionIcon(decision.status)}
          <span className="font-medium text-white text-sm">
            {decision.agent_id.replace(/_/g, ' ').toUpperCase()}
          </span>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(decision.status)}`}>
          {decision.status}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="text-sm font-medium text-white mb-1">{decision.decision_type}</h4>
          <p className="text-sm text-gray-300">{decision.description}</p>
        </div>

        {decision.reasoning && (
          <div className="bg-gray-900 rounded p-3">
            <h5 className="text-xs font-medium text-gray-400 mb-1">REASONING</h5>
            <p className="text-xs text-gray-300">{decision.reasoning}</p>
          </div>
        )}

        {decision.parameters && Object.keys(decision.parameters).length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-400 mb-1">PARAMETERS</h5>
            <div className="flex flex-wrap gap-1">
              {Object.entries(decision.parameters).map(([key, value]) => (
                <span key={key} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimestamp(decision.timestamp)}
          </div>
          {decision.confidence && (
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {Math.round(decision.confidence * 100)}% confidence
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AgentDecisions = ({ decisions = [] }) => {
  const [filter, setFilter] = useState('ALL');
  const [selectedAgent, setSelectedAgent] = useState('ALL');

  // Mock decisions data if none provided
  const mockDecisions = [
    {
      id: 1,
      agent_id: "bdi_supervisor_01",
      decision_type: "SYSTEM_MODE_CHANGE",
      description: "Switched to manual mode due to operator request",
      reasoning: "Operator intervention required for maintenance procedures",
      status: "EXECUTED",
      timestamp: "2026-01-13T00:58:30Z",
      confidence: 1.0,
      parameters: {
        previous_mode: "AUTO",
        new_mode: "MANUAL",
        reason: "maintenance"
      }
    },
    {
      id: 2,
      agent_id: "forecast_agent_01",
      decision_type: "MODEL_UPDATE",
      description: "Updated forecast model based on weather pattern changes",
      reasoning: "Detected significant deviation in weather patterns requiring model recalibration",
      status: "EXECUTED",
      timestamp: "2026-01-13T00:55:15Z",
      confidence: 0.92,
      parameters: {
        model_version: "lstm_v2.4.1",
        training_data_points: 1440,
        accuracy_improvement: "3.2%"
      }
    },
    {
      id: 3,
      agent_id: "reactive_production",
      decision_type: "MPPT_OPTIMIZATION",
      description: "Adjusted MPPT parameters to maximize power output",
      reasoning: "Solar irradiance increased above 800 W/m², optimal conditions for maximum power point tracking",
      status: "EXECUTED",
      timestamp: "2026-01-13T00:59:45Z",
      confidence: 0.98,
      parameters: {
        voltage_setpoint: "485.2V",
        current_limit: "260A",
        efficiency_gain: "2.1%"
      }
    },
    {
      id: 4,
      agent_id: "reactive_storage",
      decision_type: "CHARGING_STRATEGY",
      description: "Initiated fast charging due to excess production",
      reasoning: "Production exceeds consumption by 45kW, battery SOC at 75%, optimal conditions for charging",
      status: "PENDING",
      timestamp: "2026-01-13T00:59:58Z",
      confidence: 0.89,
      parameters: {
        target_soc: "90%",
        charging_rate: "25.3A",
        estimated_duration: "45min"
      }
    },
    {
      id: 5,
      agent_id: "security_agent",
      decision_type: "THREAT_ASSESSMENT",
      description: "Elevated monitoring due to temperature anomaly",
      reasoning: "Battery temperature approaching warning threshold, increased monitoring frequency required",
      status: "EXECUTED",
      timestamp: "2026-01-13T00:57:22Z",
      confidence: 0.85,
      parameters: {
        monitoring_interval: "30s",
        alert_threshold: "45°C",
        escalation_level: "MEDIUM"
      }
    }
  ];

  const displayDecisions = decisions.length > 0 ? decisions : mockDecisions;

  // Get unique agents for filter
  const agents = [...new Set(displayDecisions.map(d => d.agent_id))];

  // Filter decisions
  const filteredDecisions = displayDecisions.filter(decision => {
    const statusMatch = filter === 'ALL' || decision.status === filter;
    const agentMatch = selectedAgent === 'ALL' || decision.agent_id === selectedAgent;
    return statusMatch && agentMatch;
  });

  // Sort by timestamp (newest first)
  const sortedDecisions = filteredDecisions.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-white">Agent Decisions</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ALL">All Agents</option>
            {agents.map(agent => (
              <option key={agent} value={agent}>
                {agent.replace(/_/g, ' ').toUpperCase()}
              </option>
            ))}
          </select>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ALL">All Status</option>
            <option value="EXECUTED">Executed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedDecisions.length > 0 ? (
          sortedDecisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No decisions found for the selected filters</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 border-t border-gray-800 pt-4">
        Showing {sortedDecisions.length} of {displayDecisions.length} decisions
      </div>
    </div>
  );
};

export default AgentDecisions;