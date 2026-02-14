export const AGENT_STATES = {
  RUNNING: { color: 'bg-green-500', label: 'Executing' },
  IDLE: { color: 'bg-gray-500', label: 'Idle' },
  MONITORING: { color: 'bg-blue-500', label: 'Monitoring' },
  DEGRADED: { color: 'bg-orange-500', label: 'Degraded' },
  EMERGENCY: { color: 'bg-red-500', label: 'Emergency' }
};

export const AGENT_TYPES = {
  BDI: { color: 'bg-purple-100 text-purple-800', label: 'BDI' },
  LEARNING: { color: 'bg-blue-100 text-blue-800', label: 'Learning' },
  REACTIVE: { color: 'bg-green-100 text-green-800', label: 'Reactive' }
};

export const BATTERY_STATUS_COLORS = {
  HEALTHY: 'text-green-500',
  WARNING: 'text-orange-500',
  CRITICAL: 'text-red-500'
};

export const MOCK_DATA = {
  agents: [
    { 
      agent_id: "bdi_supervisor_01", 
      type: "BDI", 
      state: "MONITORING",
      uptime: 172800,
      last_activity: "2026-01-13T00:59:55Z"
    },
    { 
      agent_id: "forecast_agent_01", 
      type: "FORECAST", 
      state: "IDLE",
      uptime: 172800,
      last_activity: "2026-01-13T00:58:30Z"
    },
    { 
      agent_id: "reactive_production", 
      type: "REACTIVE", 
      state: "EXECUTING", 
      current_action: "MAXIMIZE_MPPT",
      uptime: 172800,
      last_activity: "2026-01-13T00:59:58Z"
    },
    { 
      agent_id: "reactive_storage", 
      type: "REACTIVE", 
      state: "EXECUTING", 
      current_action: "CHARGE_BATTERY",
      uptime: 172800,
      last_activity: "2026-01-13T00:59:59Z"
    },
    { 
      agent_id: "security_agent", 
      type: "REACTIVE", 
      state: "MONITORING",
      uptime: 172800,
      last_activity: "2026-01-13T00:59:45Z"
    }
  ],
  forecast: {
    timestamp: "2026-01-13T01:00:00Z",
    model_version: "lstm_v2.4.0",
    horizons: {
      "15min": { value: 12.3, uncertainty: 1.2 },
      "1h": { value: 45.2, uncertainty: 5.1 },
      "4h": { value: 180.5, uncertainty: 20.3 },
      "24h": { value: 342.7, uncertainty: 45.3 }
    },
    confidence: 0.85
  },
  beliefs: [
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "sensor.irradiance",
      value: 850.5,
      unit: "W/m²",
      confidence: 0.95,
      source: "sensor_gateway"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "sensor.panel_temperature",
      value: 35.2,
      unit: "°C",
      confidence: 0.98,
      source: "sensor_gateway"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "production.current_power",
      value: 125.8,
      unit: "kW",
      confidence: 0.99,
      source: "inverter"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "grid.injection_power",
      value: 95.2,
      unit: "kW",
      confidence: 0.99,
      source: "grid_meter"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "battery.soc",
      value: 75,
      unit: "%",
      confidence: 0.99,
      source: "bms"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "battery.temperature",
      value: 32.1,
      unit: "°C",
      confidence: 0.98,
      source: "bms"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "battery.current",
      value: 25.3,
      unit: "A",
      confidence: 0.99,
      source: "bms"
    },
    {
      timestamp: "2026-01-13T01:00:00Z",
      key: "battery.voltage",
      value: 485.2,
      unit: "V",
      confidence: 0.99,
      source: "bms"
    }
  ]
};