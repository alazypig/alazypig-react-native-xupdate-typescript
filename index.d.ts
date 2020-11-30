declare module '@aurora-org/react-native-xupdate-typescript' {
  export class InitArgs {
    debug: boolean // log debug
    isPost: boolean // post request
    isPostJson: boolean // post json
    isWifiOnly: boolean // only update under wifi
    isAutoMode: boolean
    supportSilentInstall: boolean // machine need root privileges
    enableRetry: boolean
    retryContent: string
    retryUrl: string
    params: any
  }

  export class UpdateArgs {
    constructor(url: string)
    url: string
    params: any
    supportBackgroundUpdate: boolean
    isAutoMode: boolean
    isCustomParse: boolean
    themeColor: string
    topImageRes: string
    widthRatio: number
    heightRatio: number
    overrideGlobalRetryStrategy: boolean
    enableRetry: boolean
    retryContent: string
    retryUrl: string
  }

  export class UpdateEntity {
    constructor(
      hasUpdate: boolean,
      versionCode: number,
      versionName: string,
      updateContent: string,
      downloadUrl: string,
    )
    hasUpdate: boolean
    isForce: boolean
    isIgnorable: boolean
    versionCode: number
    versionName: string
    updateContent: string
    downloadUrl: string
    apkSize: number
    apkMd5: string
  }

  export class UpdateParser {
    parseJson: (json: string) => UpdateEntity
    constructor(parser: typeof this.parseJson)
  }

  export type XUpdateType = {
    init: (initArg: InitArgs) => Promise<any>
    setCustomParser: (parser: UpdateParser) => void
    addErrorListener: (listener: (event: any) => void) => void
    removeErrorListener: (listener: (event: any) => void) => void
    update: (updateArgs?: UpdateArgs) => Promise<string>
    updateByInfo: (updateArgs?: UpdateArgs, updateEntity: UpdateEntity) => void
    showRetryUpdateTip: (retryContent: string, retryUrl: string) => void
  }

  export const XUpdate: XUpdateType
}
