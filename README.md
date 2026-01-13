# Solar PV Multi-Agent System Dashboard

A modern, real-time monitoring dashboard for a photovoltaic multi-agent system built with React and Tailwind CSS.

## 🎯 Overview

This dashboard provides comprehensive monitoring and control capabilities for a solar photovoltaic station managed by multiple AI agents including:
- BDI Supervisor Agent
- Forecast Agent  
- Reactive Production Agent
- Reactive Storage Agent
- Security Agent

## 🚀 Features

- **Real-time Monitoring**: Live updates every 5 seconds from the multi-agent system
- **Agent Status Tracking**: Monitor all 5 agents with state indicators and activity logs
- **Production Forecasting**: Interactive charts showing 15min, 1h, 4h, and 24h forecasts
- **Battery Management**: Comprehensive battery status with SOC gauge and temperature monitoring  
- **Manual Control**: Direct agent intention sending when in manual mode
- **Alert System**: Real-time security alerts and system warnings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🏗️ Technology Stack

- **React 18+** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and dev server

## 📡 Backend API Requirements

The dashboard connects to a backend API running on `http://localhost:8000/api/v1` with Bearer token authentication.

### Required Endpoints:
- `GET /agents/status` - Agent status information
- `GET /forecast/latest` - Production forecasts  
- `GET /beliefs` - Sensor data and beliefs
- `POST /intentions` - Send intentions to agents
- `POST /system/mode` - Change system mode (AUTO/MANUAL)

## 🛠️ Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

The dashboard is configured to connect to the backend API at `http://localhost:8000/api/v1` with the default token `demo-token`.

To modify the API configuration, edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';
const API_TOKEN = 'demo-token';
```

## 🎨 Design System

### Color Palette
- **Primary**: #3b82f6 (Blue)
- **Success**: #10b981 (Green)  
- **Warning**: #f59e0b (Orange)
- **Danger**: #ef4444 (Red)
- **Dark**: #0f172a (Background)

### Layout Structure
```
┌─────────────────────────────────────────────────────┐
│ Header: Logo + Title + Mode Toggle                  │
├─────────────────┬───────────────────────────────────┤
│ Agent Status    │ Forecast Chart                    │
│ (5 agents)      │ (4 horizons)                      │
├─────────────────┼───────────────────────────────────┤
│ Production      │ Battery Status                    │
│ Metrics         │ (SOC, Temp, Current)              │
├─────────────────┴───────────────────────────────────┤
│ Manual Control Panel (MANUAL mode only)             │
├─────────────────────────────────────────────────────┤
│ Alerts Banner (bottom overlay)                      │
└─────────────────────────────────────────────────────┘
```

## 🔄 Real-time Updates

The dashboard automatically polls the API every 5 seconds for:
- Agent status updates
- Latest forecast data
- Sensor beliefs and measurements

Updates are shown with timestamp indicators and smooth transitions.

## 📱 Responsive Breakpoints

- **Desktop**: 4-column grid layout (≥1024px)
- **Tablet**: 2-column grid layout (768px - 1024px)  
- **Mobile**: Single column stack (<768px)

## 🚨 Error Handling

- **API Failures**: Automatic retry with exponential backoff
- **Network Issues**: Graceful degradation to mock data
- **Loading States**: Skeleton loaders and spinners
- **User Feedback**: Toast notifications for actions

## 🧪 Mock Data

If the backend API is unavailable, the dashboard automatically switches to mock data mode, allowing you to:
- View the complete UI with sample data
- Test all interactions and controls
- Develop and demo without backend dependency

## 🔐 Security Features

- Bearer token authentication
- Input validation and sanitization
- Secure intention posting with validity periods
- Alert system for security events

## 📊 Key Metrics Displayed

### Agent Monitoring
- Agent state (EXECUTING, IDLE, MONITORING, DEGRADED, EMERGENCY)
- Current actions and uptime
- Last activity timestamps

### Production Data  
- Real-time power generation (kW)
- Solar irradiance (W/m²)
- Panel temperature (°C)
- Grid injection power (kW)

### Battery Status
- State of Charge (SOC) with circular gauge
- Temperature monitoring with warnings
- Charge/discharge current and rates
- Voltage and overall health status

### Forecasting
- Multi-horizon predictions (15min to 24h)
- Uncertainty bounds visualization
- Model confidence scoring

## 🎮 Manual Control Features

When in MANUAL mode, operators can:
- Send direct charging intentions to storage agent
- Request production maximization
- Initiate emergency stops
- Monitor intention acknowledgments

## 🐛 Troubleshooting

### API Connection Issues
1. Ensure backend server is running on port 8000
2. Check CORS configuration on backend
3. Verify Bearer token is correct
4. Check browser console for detailed errors

### Performance Issues
1. Monitor network tab for slow API calls
2. Check component re-render frequency
3. Verify polling interval (default 5 seconds)

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Maintain responsive design principles
3. Add proper error handling for new features
4. Update documentation for any API changes

## 📄 License

This project is part of a research initiative for solar PV multi-agent systems.

---

For questions or support, please refer to the system documentation or contact the development team.