declare namespace Stores{
    interface app{
        collapsed: boolean
        isMobile: boolean
        reloadFlag: boolean
        aliveKeys: Record<string, boolean>
        mode: 'pc' | 'mobile'
        colorScheme: 'light' | 'dark'
        layout: 'mix' | 'side'
        headerHeight: number,
        collapsedWidth: number,
        siderWidth: number,
    }
}
