import { InjectionToken } from "@angular/core";
import { DashboardTheme } from "./theme.model";

export function themeFactory(): DashboardTheme {
    const savedTheme = localStorage.getItem('dashboardTheme'); 

    if(savedTheme){
        return JSON.parse(savedTheme);
    }

    return {
        primaryColor: '#1e3a8a',    
        backgroundColor: '#f8fafc',
        cardColor: '#ffffff',
        textColor: '#1f2937',
        accentColor: '#3b82f6',
        mode: 'light'
    };
}

export const THEME = new InjectionToken<DashboardTheme>('dashboard-theme'); 