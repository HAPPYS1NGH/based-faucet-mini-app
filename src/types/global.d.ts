import type { TelegramWebApps } from 'telegram-webapps-types';

declare global {
    interface Window {
        Telegram: TelegramWebApps.SDK;
    }
    type network = "base-sepolia"
    export type Hex = `0x${string}`

}

export { };