import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ForecastChart = ({ forecast }) => {
  if (!forecast || !forecast.horizons) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">Production Forecast</h2>
        </div>
        <div className="flex items-center justify-center h-64 text-gray-400">
          No forecast data available
        </div>
      </div>
    );
  }

  const horizonLabels = {
    '15min': '15 Min',
    '1h': '1 Hour',
    '4h': '4 Hours',
    '24h': '24 Hours'
  };

  const chartData = Object.entries(forecast.horizons).map(([key, data]) => ({
    horizon: horizonLabels[key] || key,
    value: data.value,
    upperBound: data.value + data.uncertainty,
    lowerBound: Math.max(0, data.value - data.uncertainty),
    uncertainty: data.uncertainty
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-blue-400">
            {`Forecast: ${data.value.toFixed(1)} kWh`}
          </p>
          <p className="text-gray-400">
            {`Uncertainty: ±${data.uncertainty.toFixed(1)} kWh`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">Production Forecast</h2>
        </div>
        {forecast.confidence && (
          <span className="text-sm text-gray-400">
            {Math.round(forecast.confidence * 100)}% confidence
          </span>
        )}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="horizon" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ value: 'Production (kWh)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Uncertainty area */}
            <Bar 
              dataKey="upperBound" 
              fill="rgba(59, 130, 246, 0.1)" 
              stroke="none"
              stackId="uncertainty"
            />
            <Bar 
              dataKey="lowerBound" 
              fill="rgba(59, 130, 246, -0.1)" 
              stroke="none"
              stackId="uncertainty"
            />
            
            {/* Main forecast line */}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {forecast.model_version && (
        <div className="mt-4 text-xs text-gray-500">
          Model: {forecast.model_version}
        </div>
      )}
    </div>
  );
};

export default ForecastChart;