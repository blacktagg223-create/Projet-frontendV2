import { Zap, Sun, Thermometer, Grid3x2 as Grid3X3, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

const MetricCard = ({ icon: Icon, label, value, unit, trend, color = "text-blue-400" }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        {trend !== undefined && (
          <div className="flex items-center">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : null}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">
          {formatNumber(value)}
          <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
};

const ProductionMetrics = ({ beliefs }) => {
    console.log(beliefs);
  // Extract metrics from beliefs data
  const getMetricValue = (key, defaultValue = 0) => {
    const belief = beliefs.find(b => b.key === key);
    return belief ? belief.value : defaultValue;
  };

  const currentPower = getMetricValue('sensor.production.production');
  const irradiance = getMetricValue('sensor.irradiance.irradiance');
  const panelTemp = getMetricValue('sensor.temperature.temperature');
  const gridInjection = getMetricValue('sensor.battery_current.battery_current');

  // Mock trend data (in real app, this would be calculated from historical data)
  const trends = {
    power: 0.05, // 5% up
    irradiance: -0.02, // 2% down
    temp: 0.01, // 1% up
    grid: 0.03 // 3% up
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        Production Metrics
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard
          icon={Zap}
          label="Current Production"
          value={currentPower}
          unit="kW"
          trend={trends.power}
          color="text-yellow-500"
        />
        
        <MetricCard
          icon={Sun}
          label="Solar Irradiance"
          value={irradiance}
          unit="W/m²"
          trend={trends.irradiance}
          color="text-orange-500"
        />
        
        <MetricCard
          icon={Thermometer}
          label="Panel Temperature"
          value={panelTemp}
          unit="°C"
          trend={trends.temp}
          color="text-red-500"
        />
        
        <MetricCard
          icon={Grid3X3}
          label="Grid Injection"
          value={gridInjection}
          unit="kW"
          trend={trends.grid}
          color="text-green-500"
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Last updated: {beliefs.length > 0 ? new Date(beliefs[0].timestamp).toLocaleTimeString() : 'No data'}
      </div>
    </div>
  );
};

export default ProductionMetrics;