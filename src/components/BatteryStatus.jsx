import { Battery, Thermometer, Zap, Gauge } from 'lucide-react';
import { getBatteryStatusColor, formatNumber } from '../utils/helpers';
import { BATTERY_STATUS_COLORS } from '../utils/constants';

const CircularProgress = ({ value, max = 100, size = 120, strokeWidth = 8, color = '#3B82F6' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{value}%</div>
          <div className="text-xs text-gray-400">SOC</div>
        </div>
      </div>
    </div>
  );
};

const BatteryStatus = ({ beliefs }) => {
  // Extract battery metrics from beliefs
  const getMetricValue = (key, defaultValue = 0) => {
    const belief = beliefs.find(b => b.key === key);
    return belief ? belief.value : defaultValue;
  };

  const soc = getMetricValue('battery.soc', 75);
  const temperature = getMetricValue('battery.temperature', 32.1);
  const current = getMetricValue('battery.current', 25.3);
  const voltage = getMetricValue('battery.voltage', 485.2);

  const batteryStatusColor = getBatteryStatusColor(soc, temperature);
  const statusColorClass = BATTERY_STATUS_COLORS[batteryStatusColor];

  // Determine charging status
  const getChargingStatus = () => {
    if (current > 5) return { status: 'CHARGING', color: 'text-green-400' };
    if (current < -5) return { status: 'DISCHARGING', color: 'text-red-400' };
    return { status: 'IDLE', color: 'text-gray-400' };
  };

  const chargingStatus = getChargingStatus();

  // Determine SOC color based on level
  const getSocColor = () => {
    if (soc >= 60) return '#10B981'; // green
    if (soc >= 20) return '#F59E0B'; // orange
    return '#EF4444'; // red
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Battery className={`w-5 h-5 ${statusColorClass}`} />
        Battery Status
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* SOC Gauge */}
        <div className="flex-shrink-0">
          <CircularProgress 
            value={soc} 
            color={getSocColor()}
            size={140}
          />
        </div>
        
        {/* Battery Metrics */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className={`w-4 h-4 ${temperature > 45 ? 'text-red-400' : temperature > 40 ? 'text-orange-400' : 'text-blue-400'}`} />
                <span className="text-sm text-gray-400">Temperature</span>
              </div>
              <div className="text-xl font-bold text-white">
                {formatNumber(temperature)}°C
              </div>
              {temperature > 45 && (
                <div className="text-xs text-red-400 mt-1">⚠ High Temperature</div>
              )}
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className={`w-4 h-4 ${chargingStatus.color}`} />
                <span className="text-sm text-gray-400">Current</span>
              </div>
              <div className="text-xl font-bold text-white">
                {current > 0 ? '+' : ''}{formatNumber(current)}A
              </div>
              <div className={`text-xs mt-1 ${chargingStatus.color}`}>
                {chargingStatus.status}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Voltage</span>
              </div>
              <div className="text-xl font-bold text-white">
                {formatNumber(voltage)}V
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Battery className={`w-4 h-4 ${statusColorClass}`} />
                <span className="text-sm text-gray-400">Status</span>
              </div>
              <div className={`text-sm font-medium ${statusColorClass}`}>
                {batteryStatusColor}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryStatus;