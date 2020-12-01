# react-native-xupdate

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/@aurora-org/react-native-xupdate-typescript)
[![Issue](https://img.shields.io/github/issues/alazypig/alazypig-react-native-xupdate-typescript.svg)](https://github.com/alazypig/alazypig-react-native-xupdate-typescript/issues)
[![Star](https://img.shields.io/github/stars/alazypig/alazypig-react-native-xupdate-typescript.svg)](https://github.com/alazypig/alazypig-react-native-xupdate-typescript)

A React-Native plugin for XUpdate(Android Version Update Library).

## Getting started

`$ npm install @aurora-org/react-native-xupdate-typescript --save`

### Mostly automatic installation

React Native after 0.60 will autolinked modules.

<s>`$ react-native link @aurora-org/react-native-xupdate-typescript`</s>

### Manual installation

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.xuexiang.xupdate.RNXUpdatePackage;` to the imports at the top of the file

<s>2. Append the following lines to `android/settings.gradle`:</s>

```gradle
include ':@aurora-org_react-native-xupdate-typescript'
project(':@aurora-org_react-native-xupdate-typescript').projectDir = new File(rootProject.projectDir, 	'../node_modules/@aurora-org_react-native-xupdate-typescript/android')
```

<s>3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:</s>

```
compile project(':@aurora-org/react-native-xupdate-typescript')
```

## Usage

Only use for Android.

### Initialization

```javascript
import {XUpdate} from '@aurora-org/react-native-xupdate-typescript';

//Initialization
initXUpdate() {
    let args = new InitArgs();
    args.debug = true;
    args.isPostJson = false; // post json
    args.isWifiOnly = false;
    args.isAutoMode = false;
    args.supportSilentInstall = false; // need root privileges
    args.enableRetry = false;

    //Initialize SDK
    XUpdate.init(args).then(result => {
        this.setState({
            _message: 'Initialize success:' + JSON.stringify(result),
        });
    }).catch(error => {
        console.log(error);
        this.setState({
            _message: 'Initialize failed:' + error,
        });
    });

    XUpdate.setCustomParser({parseJson: this.customParser});
    XUpdate.addErrorListener(this.errorListener);
}
```

### JSON Format

```
{
  "Code": 0, // 0: success, other: failed
  "Msg": "", // error message
  "UpdateStatus": 1, // 0: no update, 1: non-mandatory update, 2: mandatory update
  "VersionCode": 3,
  "VersionName": "1.0.2",
  "ModifyContent": "",
  "DownloadUrl": "",
  "ApkSize": 2048,
  "ApkMd5": "..." // required
}
```

### CheckUpdate

```javascript
checkUpdateDefault() {
    let args = new UpdateArgs(_updateUrl);
    XUpdate.update(args);
}

checkUpdateSupportBackground() {
    let args = new UpdateArgs(_updateUrl);
    args.supportBackgroundUpdate = true;
    XUpdate.update(args);
}

checkUpdateRatio() {
    let args = new UpdateArgs(_updateUrl);
    args.widthRatio = 0.6;
    XUpdate.update(args);
}

// mandatory update
checkUpdateForce() {
    let args = new UpdateArgs(_updateUrl2);
    XUpdate.update(args);
}

// need root privileges
checkUpdateAutoMode() {
    let args = new UpdateArgs(_updateUrl);
    args.isAutoMode = true;
    XUpdate.update(args);
}

enableChangeDownLoadType() {
    let args = new UpdateArgs(_updateUrl);
    args.overrideGlobalRetryStrategy = true;
    args.enableRetry = true;
    args.retryContent = 'Switch to another site?';
    args.retryUrl = 'https://example.com/test.apk';
    XUpdate.update(args);
}

showRetryDialogTip() {
    XUpdate.showRetryUpdateTip('content', 'url');
}
```

### Custom JSON Format

1.Setting up a custom update parser

```javascript
XUpdate.setCustomParser({parseJson: this.customParser})

customParser = (json) => {
  let appInfo = JSON.parse(json)
  return {
    // required
    hasUpdate: appInfo['hasUpdate'],
    versionCode: appInfo['versionCode'],
    versionName: appInfo['versionName'],
    updateContent: appInfo['updateLog'],
    downloadUrl: appInfo['apkUrl'],

    // optional
    isIgnorable: appInfo['isIgnorable'],
    apkSize: appInfo['apkSize'],
  }
}
```

2.Set the parameter `isCustomParse` to true

```javascript
customJsonParse() {
    let args = new UpdateArgs(_updateUrl3);
    args.isCustomParse = true;
    XUpdate.update(args);
}
```

### Update By UpdateEntity Directly

```javascript
checkUpdateByUpdateEntity() {
    let args = new UpdateArgs();
    args.supportBackgroundUpdate = true;
    XUpdate.updateByInfo(args, {
        // required
        hasUpdate: AppInfo['hasUpdate'],
        versionCode: AppInfo['versionCode'],
        versionName: AppInfo['versionName'],
        updateContent: AppInfo['updateLog'],
        downloadUrl: AppInfo['apkUrl'],

        // optional
        isIgnorable: AppInfo['isIgnorable'],
        apkSize: AppInfo['apkSize'],
    });
}
```

### Custom Update Prompt Style

> Currently, only theme color and top picture customization are supported!

1.Configure top picture, Path: `android/app/src/main/res/values/drawable`

2.Set the parameter `themeColor` and `topImageRes`

```javascript
customPromptDialog() {
    let args = new UpdateArgs(_updateUrl);
    args.themeColor = '#FFFFAC5D';
    args.topImageRes = 'bg_update_top';
    XUpdate.update(args);
}
```
