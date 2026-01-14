import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { MOCK_DATA } from '../utils/constants';

const POLLING_INTERVAL = 5000; // 5 seconds

export const useApiData = () => {
  const [data, setData] = useState({
    agents: [],
    forecast: null,
    beliefs: [],
    systemMode: 'AUTO',
    loading: true,
    error: null,
    lastUpdated: null
  });

  const [useMockData, setUseMockData] = useState(false);

  const fetchData = useCallback(async () => {
    if (useMockData) {
      setData(prev => ({
        ...prev,
        agents: MOCK_DATA.agents,
        forecast: MOCK_DATA.forecast,
        beliefs: MOCK_DATA.beliefs,
        loading: false,
        error: null,
        lastUpdated: new Date()
      }));
      return;
    }

    try {
      const [agentsResponse, forecastResponse, beliefsResponse] = await Promise.all([
        api.get('/agents/status').catch(() => null),
        api.get('/forecast/latest').catch(() => null),
        api.get('/beliefs', { category: 'sensor', limit: 20 }).catch(() => null)
      ]);

      // If all requests fail, switch to mock data
      if (!agentsResponse && !forecastResponse && !beliefsResponse) {
        setUseMockData(true);
        setData(prev => ({
          ...prev,
          error: 'API unavailable, using mock data',
          loading: false
        }));
        return;
      }

      setData(prev => ({
        ...prev,
        agents: agentsResponse?.agents || prev.agents,
        forecast: forecastResponse || prev.forecast,
        beliefs: beliefsResponse?.beliefs || prev.beliefs,
        loading: false,
        error: null,
        lastUpdated: new Date()
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  }, [useMockData]);

  const setSystemMode = useCallback(async (mode) => {
    try {
      if (!useMockData) {
        await api.post('/system/mode', { mode, reason: 'Manual override' });
      }
      setData(prev => ({ ...prev, systemMode: mode }));
    } catch (error) {
      console.error('Error setting system mode:', error);
    }
  }, [useMockData]);

  const sendIntention = useCallback(async (intention) => {
    try {
      if (!useMockData) {
        return await api.post('/intentions', intention);
      }
      return { status: 'accepted', intention_id: `int_${Date.now()}` };
    } catch (error) {
      console.error('Error sending intention:', error);
      throw error;
    }
  }, [useMockData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    ...data,
    setSystemMode,
    sendIntention,
    refresh: fetchData
  };
};