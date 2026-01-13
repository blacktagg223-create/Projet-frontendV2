export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatUptime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  return `${hours}h ${minutes}m`;
};

export const getBatteryStatusColor = (soc, temperature) => {
  if (soc < 20 || temperature > 45) return 'CRITICAL';
  if (soc < 60 || temperature > 40) return 'WARNING';
  return 'HEALTHY';
};

export const formatNumber = (value, decimals = 1) => {
  return Number(value).toFixed(decimals);
};