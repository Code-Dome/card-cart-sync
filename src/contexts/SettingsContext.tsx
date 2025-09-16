import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  conversionRate: number;
  enableConversions: boolean;
  setEnableConversions: (enable: boolean) => void;
  useFixedRate: boolean;
  setConversionRate: (rate: number) => void;
  setUseFixedRate: (fixed: boolean) => void;
  getConversionRate: () => Promise<number>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [conversionRate, setConversionRateState] = useState(18.50);
  const [useFixedRate, setUseFixedRate] = useState(true);

  const [enableConversions, setEnableConversionsState] = useState(false);

  const setEnableConversions = (enable: boolean) => {
    setEnableConversionsState(enable);
    localStorage.setItem("enableConversions", JSON.stringify(enable));
  }

  const setConversionRate = (rate: number) => {
    setConversionRateState(rate);
    localStorage.setItem('conversionRate', rate.toString());
  };

  const getConversionRate = async (): Promise<number> => {
    if (useFixedRate) {
      return conversionRate;
    }
    
    // Fetch live rate from external API (mock implementation)
    try {
      // This would normally call xe.com API or similar
      // For now, return a slightly varying rate to simulate live data
      const mockLiveRate = 18.50 + (Math.random() - 0.5) * 2;
      return Number(mockLiveRate.toFixed(2));
    } catch (error) {
      console.error('Failed to fetch live conversion rate, using fixed rate:', error);
      return conversionRate;
    }
  };

  // Load saved settings on init
  React.useEffect(() => {
    const savedRate = localStorage.getItem('conversionRate');
    const savedUseFixed = localStorage.getItem('useFixedRate');
    const enableConversions = localStorage.getItem('enableConversions');

    if (enableConversions)
    {
      setEnableConversionsState(Boolean(enableConversions))
    }

    if (savedRate) {
      setConversionRateState(Number(savedRate));
    }
    if (savedUseFixed) {
      setUseFixedRate(savedUseFixed === 'true');
    }
  }, []);

  // Save useFixedRate to localStorage
  React.useEffect(() => {
    localStorage.setItem('useFixedRate', useFixedRate.toString());
  }, [useFixedRate]);

  return (
    <SettingsContext.Provider value={{
      conversionRate,
      enableConversions,
      setEnableConversions,
      useFixedRate,
      setConversionRate,
      setUseFixedRate,
      getConversionRate,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};