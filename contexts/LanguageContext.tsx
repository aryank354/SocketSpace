import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: 'Yodha',
    learn: 'Learn',
    sos: 'SOS',
    ar: 'AR',
    login: 'Login',
    logout: 'Logout',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Enter your name to continue',
    enterName: 'Enter your name',
    loginButton: 'Login',
    profile: 'Profile',
    sosWarning: 'Emergency Mode',
    sosDescription: 'Tap 3 times to activate emergency protocol',
    sosActivated: 'SOS Activated!',
    tapCount: 'Tap {count} of 3',
    arDemo: 'AR Experience',
    arDescription: 'Augmented Reality features coming soon',
    learningHub: 'Learning Hub',
    level: 'Level',
    xp: 'XP',
    modules: 'Modules',
    blogTitle: 'Latest Insights',
    yourProgress: 'Your Progress'
  },
  hi: {
    title: 'योद्धा',
    learn: 'सीखें',
    sos: 'SOS',
    ar: 'AR',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    loginTitle: 'वापस स्वागत है',
    loginSubtitle: 'जारी रखने के लिए अपना नाम दर्ज करें',
    enterName: 'अपना नाम दर्ज करें',
    loginButton: 'लॉगिन',
    profile: 'प्रोफाइल',
    sosWarning: 'आपातकालीन मोड',
    sosDescription: 'आपातकालीन प्रोटोकॉल सक्रिय करने के लिए 3 बार टैप करें',
    sosActivated: 'SOS सक्रिय!',
    tapCount: '{count} का टैप 3',
    arDemo: 'AR अनुभव',
    arDescription: 'संवर्धित वास्तविकता सुविधाएं जल्द आ रही हैं',
    learningHub: 'शिक्षा केंद्र',
    level: 'स्तर',
    xp: 'XP',
    modules: 'मॉड्यूल',
    blogTitle: 'नवीनतम अंतर्दृष्टि',
    yourProgress: 'आपकी प्रगति'
  },
  es: {
    title: 'Yodha',
    learn: 'Aprender',
    sos: 'SOS',
    ar: 'AR',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    loginTitle: 'Bienvenido de vuelta',
    loginSubtitle: 'Ingresa tu nombre para continuar',
    enterName: 'Ingresa tu nombre',
    loginButton: 'Iniciar sesión',
    profile: 'Perfil',
    sosWarning: 'Modo de emergencia',
    sosDescription: 'Toca 3 veces para activar el protocolo de emergencia',
    sosActivated: '¡SOS Activado!',
    tapCount: 'Toque {count} de 3',
    arDemo: 'Experiencia AR',
    arDescription: 'Características de realidad aumentada próximamente',
    learningHub: 'Centro de Aprendizaje',
    level: 'Nivel',
    xp: 'XP',
    modules: 'Módulos',
    blogTitle: 'Últimas perspectivas',
    yourProgress: 'Tu progreso'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en];
    if (translation) {
      return translation;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}