const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

const { platform, arch } = process;

let nativeBinding = null;
let localFileExisted = false;
let loadError = null;

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      return readFileSync('/usr/bin/ldd', 'utf8').includes('musl');
    } catch {
      return true;
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header;
    return !glibcVersionRuntime;
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.android-arm64.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.android-arm64.node')
            : require('skribble-css-android-arm64');
        } catch (error) {
          loadError = error;
        }
        break;
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.android-arm-eabi.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.android-arm-eabi.node')
            : require('skribble-css-android-arm-eabi');
        } catch (error) {
          loadError = error;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`);
    }

    break;
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.win32-x64-msvc.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.win32-x64-msvc.node')
            : require('skribble-css-win32-x64-msvc');
        } catch (error) {
          loadError = error;
        }
        break;
      case 'ia32':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.win32-ia32-msvc.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.win32-ia32-msvc.node')
            : require('skribble-css-win32-ia32-msvc');
        } catch (error) {
          loadError = error;
        }
        break;
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.win32-arm64-msvc.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.win32-arm64-msvc.node')
            : require('skribble-css-win32-arm64-msvc');
        } catch (error) {
          loadError = error;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`);
    }

    break;
  case 'darwin':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.darwin-x64.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.darwin-x64.node')
            : require('skribble-css-darwin-x64');
        } catch (error) {
          loadError = error;
        }
        break;
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.darwin-arm64.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.darwin-arm64.node')
            : require('skribble-css-darwin-arm64');
        } catch (error) {
          loadError = error;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`);
    }

    break;
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
    }

    localFileExisted = existsSync(join(__dirname, 'skribble_css.freebsd-x64.node'));
    try {
      nativeBinding = localFileExisted
        ? require('./skribble_css.freebsd-x64.node')
        : require('skribble-css-freebsd-x64');
    } catch (error) {
      loadError = error;
    }
    break;
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'skribble_css.linux-x64-musl.node'));
          try {
            nativeBinding = localFileExisted
              ? require('./skribble_css.linux-x64-musl.node')
              : require('skribble-css-linux-x64-musl');
          } catch (error) {
            loadError = error;
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'skribble_css.linux-x64-gnu.node'));
          try {
            nativeBinding = localFileExisted
              ? require('./skribble_css.linux-x64-gnu.node')
              : require('skribble-css-linux-x64-gnu');
          } catch (error) {
            loadError = error;
          }
        }

        break;
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'skribble_css.linux-arm64-musl.node'));
          try {
            nativeBinding = localFileExisted
              ? require('./skribble_css.linux-arm64-musl.node')
              : require('skribble-css-linux-arm64-musl');
          } catch (error) {
            loadError = error;
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'skribble_css.linux-arm64-gnu.node'));
          try {
            nativeBinding = localFileExisted
              ? require('./skribble_css.linux-arm64-gnu.node')
              : require('skribble-css-linux-arm64-gnu');
          } catch (error) {
            loadError = error;
          }
        }

        break;
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'skribble_css.linux-arm-gnueabihf.node'));
        try {
          nativeBinding = localFileExisted
            ? require('./skribble_css.linux-arm-gnueabihf.node')
            : require('skribble-css-linux-arm-gnueabihf');
        } catch (error) {
          loadError = error;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`);
    }

    break;
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError;
  }

  throw new Error(`Failed to load native binding`);
}

const { sum } = nativeBinding;

module.exports.sum = sum;
