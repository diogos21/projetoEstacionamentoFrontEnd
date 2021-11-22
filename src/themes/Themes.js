import { DefaultTheme, DarkTheme } from 'react-native-paper'

export const Light = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3f51b5',
        accent: '#757de8',
        background: '#e1e1e1',
        surface: '#f3f3f3',
        text: '#232323'
    }
}

export const Dark = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#1769aa',
        accent: '#002984',
        background: '#3c4557',
        surface: '#232323',
        text: '#f3f3f3'
    }
}