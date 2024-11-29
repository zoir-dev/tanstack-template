/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DEFAULT_URL: string
    readonly VITE_MOBILE_URL: string
    readonly VITE_FAST_URL: string
    readonly VITE_SOCKET_URL: string
    readonly VITE_HASHED_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
