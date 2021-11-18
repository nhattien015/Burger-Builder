export interface User{
    kind?: string | null,
    localId?: string | null,
    email: string | null,
    displayName: string,
    idToken: string | null,
    registered: boolean,
    refreshToken: string | null
}
