import { Activity, Clock, Zap } from 'lucide-react';
import { AGENT_STATES, AGENT_TYPES } from '../utils/constants';
import { formatTimestamp, formatUptime } from '../utils/helpers';

const AgentCard = ({ agent }) => {
  const stateConfig = AGENT_STATES[agent.state] || AGENT_STATES.IDLE;
  const typeConfig = AGENT_TYPES[agent.type] || AGENT_TYPES.REACTIVE;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-white text-sm mb-1">
            {agent.agent_id.replace(/_/g, ' ').toUpperCase()}
          </h3>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
        </div>
        <div className={`w-3 h-3 rounded-full ${stateConfig.color}`} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">{stateConfig.label}</span>
        </div>

        {agent.current_action && (
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">
              {agent.current_action.replace(/_/g, ' ').toLowerCase()}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">
            {agent.last_activity ? formatTimestamp(agent.last_activity) : 'No activity'}
          </span>
        </div>

        {agent.uptime && (
          <div className="text-xs text-gray-500">
            Uptime: {formatUptime(agent.uptime)}
          </div>
        )}
      </div>
    </div>
  );
};

const AgentStatus = ({ agents }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Agent Status</h2>
      <div className="space-y-3">
        {agents.map((agent, index) => (
          <AgentCard key={agent.agent_id || index} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentStatus;