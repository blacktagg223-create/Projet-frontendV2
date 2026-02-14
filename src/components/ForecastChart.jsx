import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ForecastChart = ({ forecast }) => {
    console.log(forecast.forecast.predictions);
    forecast = forecast.forecast;
  if (!forecast || !forecast.predictions || forecast.predictions.length === 0) {
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
  // ✅ Adapter les données du backend au format attendu
  const chartData = forecast?.predictions?.map((pred, index) => ({
    horizon: pred.horizon || `T+${index + 1}h`,
    value: pred.value || pred.production_kw || 0,
    upperBound: pred.upper_bound || pred.value * 1.15 || 0,
    lowerBound: pred.lower_bound || pred.value * 0.85 || 0,
    uncertainty: (pred.upper_bound - pred.lower_bound) / 2 || pred.value * 0.15 || 0,
    confidence: pred.confidence || 0.85,
    timestamp: pred.timestamp
  })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-blue-400">
            Forecast: {data.value.toFixed(1)} kWh
          </p>
          <p className="text-gray-400">
            Uncertainty: ±{data.uncertainty.toFixed(1)} kWh
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Confidence: {Math.round(data.confidence * 100)}%
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
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="rgba(59, 130, 246, 0.1)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="rgba(59, 130, 246, 0.05)"
              fillOpacity={1}
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