import chalk from 'chalk';
import { spawn } from 'child_process';
import { parse } from 'envfile';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// import package json
import packageJSON from './package.json' with { type: 'json' };

const packageJSONWatcher = {
  STORAGE_KEY: 'STORAGE_FOR_RESTORING_PACKAGE_JSON',
  WATCH: ['@pushprotocol/uiweb'],
  LOCAL_PACKAGES_REQ: [
    'animejs@^2.2.0',
    'classnames@^2.2.5',
    'raf@^3.4.0',
    'protobufjs@^7.2.6',
    'react-code-blocks@^0.1.6',
    '@livepeer/react@^2.9.2',
    '@livekit/components-react@^1.5.3',
    'livekit-client@^1.15.13',
  ],
};

const envPresets = {
  localsdk: {
    ENFORCE_WEBPACK_LOCAL: 'TRUE',
  },
  prodsdk: {
    ENFORCE_WEBPACK_LOCAL: 'FALSE',
  },
};

// This script is used to setup the local sdk environment for development
const prepForDeployment = async (sdkENV, tag, start) => {
  const cleanup = tag === 'cleanup' ? true : false;
  const runapp = start === 'start' ? true : false;

  if (sdkENV === 'localsdk') {
    // prep for local sdk
    console.log(chalk.bgBlack.white('Starting Local SDK Deployment Prebuild...'));

    // record package json
    const restorePackageValue = createRestorOGPackageValue();

    // setup modified env
    const envmodified = await verifyLocalSDKENV(sdkENV, restorePackageValue);

    // call cleanup only if env is modified and tag is cleanup
    if ((envmodified && tag === 'cleanup') || tag === 'forcecleanup') {
      // env is modified, which means sdk path is changed, clean up node_modules, yarn cache and reinstall
      await cleanupAndBuild(sdkENV);
    }
  } else if (sdkENV === 'prodsdk') {
    // prep for prod sdk
    console.log(chalk.bgBlack.white('Rolling back changes for Production SDK Deployment...'));

    // setup modified env
    const envmodified = await verifyLocalSDKENV(sdkENV, null);

    // call cleanup only if env is modified and tag is cleanup
    if ((envmodified && tag === 'cleanup') || tag === 'forcecleanup') {
      // env is modified, which means sdk path is changed, clean up node_modules, yarn cache and reinstall
      await cleanupAndBuild(sdkENV);
    }
  }

  if (runapp) {
    // start the dApp
    await startdApp(sdkENV);
  }
};

const createRestorOGPackageValue = () => {
  let value = '';
  for (const key in packageJSONWatcher.WATCH) {
    if (packageJSON.dependencies[packageJSONWatcher.WATCH[key]] === undefined) {
      console.log(chalk.red(`  -- ${packageJSONWatcher.WATCH[key]} not found in package.json`));
    } else if (packageJSON.dependencies[packageJSONWatcher.WATCH[key]] === '*') {
      console.log(chalk.yellow(`  -- ${packageJSONWatcher.WATCH[key]} is already locally linked, moving ahead...`));
    } else {
      value = `${value}${packageJSONWatcher.WATCH[key]}:${packageJSON.dependencies[packageJSONWatcher.WATCH[key]]}###`;
    }
  }

  if (value === '') {
    value = '*';
  } else {
    // remove last 3 characters
    value = value.slice(0, -3);
  }

  return value;
};

const verifyLocalSDKENV = async (sdkENV, restorePackageValue) => {
  console.log(chalk.green.dim('  -- Generating custom .localsdk.env file...'));

  // set up file modified flag
  let fileModified = false;

  // Load environment files
  const envpath = `./.localsdk.env`;
  const envsamplepath = `./.localsdk.env.sample`;

  if (!fs.existsSync(envpath)) {
    console.log(chalk.red('  -- Checking for Local SDK ENV File... Not Found, creating'));
    fs.writeFileSync(envpath, fs.readFileSync(envsamplepath, 'utf8'));
  } else {
    console.log(chalk.green.dim('  -- Checking for Local SDK ENV File... Found'));
  }

  // Now Load the environment
  const envData = fs.readFileSync(envpath, 'utf8');
  const envObject = parse(envData);

  const envSampleData = fs.readFileSync(envsamplepath, 'utf8');
  const envSampleObject = parse(envSampleData);

  const readIntSampleENV = readline.createInterface({
    input: fs.createReadStream(envsamplepath),
    output: false,
  });
  let realENVContents = '';

  console.log(chalk.green.dim('  -- Verifying and building Local SDK ENV File...'));

  // load custom env preset
  const customENVPreset = envPresets[sdkENV];
  let envParamOverridden = false;

  // check to see if env param should be overwritten and / or are empty
  for await (const line of readIntSampleENV) {
    let moddedLine = line;

    // Check if line is comment or environment variable
    if (moddedLine.startsWith('#') || moddedLine.startsWith('\n') || moddedLine.trim().length == 0) {
      // do nothing, just include it in the line
      // console.log("----");
    } else {
      // This is an environtment variable, first segregate the comment if any and the variable info
      const delimiter = '#';

      const index = moddedLine.indexOf('#');
      const splits =
        index == -1
          ? [moddedLine.slice(0, index), '']
          : [moddedLine.slice(0, index), ' ' + delimiter + moddedLine.slice(index + 1)];

      const envVar = splits[0].split('=')[0]; //  Get environment variable by splitting the sample and then taking first seperation
      const comment = splits[1];

      // check if key matched STORAGE_KEY, if so override those values
      envParamOverridden = false;
      if (!envParamOverridden && envVar === packageJSONWatcher.STORAGE_KEY) {
        // only restore if the value is not '*' and the sdkENV is localsdk
        if (restorePackageValue && sdkENV === 'localsdk' && restorePackageValue !== '*') {
          moddedLine = `${envVar}=${restorePackageValue}${comment}`;
          console.log(chalk.dim(`   -- LOCAL SDK ENV MODIFIED: ${moddedLine}`));
          fileModified = true;
          envParamOverridden = true;
        }
      }

      // check if envVar is in preset, if so override those values
      for (const [key, value] of Object.entries(customENVPreset)) {
        if (!envParamOverridden && key === envVar && value !== envObject[`${envVar}`]) {
          moddedLine = `${envVar}=${value}${comment}`;
          console.log(chalk.dim(`   -- ENV MODIFIED: ${moddedLine}`));
          fileModified = true;
          envParamOverridden = true;
        }
      }

      // Check and replace envVar value if it doesn't match
      if (!envParamOverridden && (!envObject[`${envVar}`] || envObject[`${envVar}`].trim() == '')) {
        // env key doesn't exist, ask for input
        console.log(chalk.bgBlack.white(`  Enter Local SDK ENV Variable Value --> ${envVar}`));

        var value = '';

        while (value.trim().length == 0) {
          const rl = readline.createInterface({
            input: process.stdin,
            output: null,
          });
          value = await doSyncPrompt(rl, `${envSampleObject[envVar]} >`);

          if (value.trim().length == 0) {
            console.log(chalk.bgRed.black("  Incorrect Entry, Field can't be empty"));
          }
        }

        console.log(chalk.bgBlack.white(`  [Saved] ${envVar}=${value}`));
        moddedLine = `${envVar}=${value}${comment}`;

        fileModified = true;
      } else if (!envParamOverridden) {
        // Value exists so just replicate
        moddedLine = `${envVar}=${envObject[envVar]}${comment}`;
      }
    }

    // if (envParamOverridden) {
    //   console.log(chalk.blue(moddedLine));
    // }

    // finally append the line
    realENVContents = `${realENVContents}\n${moddedLine}`;
  }

  if (fileModified) {
    console.log(chalk.green.dim('  -- Modified LOCAL SDK ENV file generated, saving'));
    fs.writeFileSync(envpath, realENVContents, { flag: 'w' });
    console.log(chalk.green.bold(' -- -- -- --  -- -- -- --  -- -- -- --'));
    console.log(chalk.green.bold(' CONTENT OF .LOCALSDK.ENV FILE CHANGED '));
    console.log(chalk.green.bold(' -- -- -- --  -- -- -- --  -- -- -- --'));
    if (sdkENV === 'localsdk') {
      console.log(chalk.green('👍 LOCAL SDK ENV modified for local sdk deployment'));
    } else if (sdkENV === 'prodsdk') {
      console.log(chalk.green('👍 package.json modified for production sdk deployment'));
    }
  } else {
    console.log(chalk.green.dim('  -- LOCAL SDK ENV file verified and unchanged!'));
  }

  return fileModified;
};

async function doSyncPrompt(rl, message) {
  var promptInput = await readLineAsync(rl, message);
  rl.close();

  return promptInput;
}

function readLineAsync(rl, message) {
  return new Promise((resolve, reject) => {
    rl.question(message, (answer) => {
      resolve(answer.trim());
    });
  });
}

const derivePackageJSONValue = (key, storageValue) => {
  // Split storageValue into array divided by ###
  const storageArray = storageValue.split('###');

  // Loop through each item in the array
  for (const item of storageArray) {
    // Split each item based on ':'
    const keyValueArray = item.split(':');

    // Check if the first value matches the key
    if (keyValueArray[0] === key) {
      // If true, return the second value
      return keyValueArray[1];
    }
  }

  // If no match is found, return null or an appropriate default value
  return null;
};

const cleanupAndBuild = async (sdkENV) => {
  console.log(
    chalk.green.dim(
      `  -- Cleaning up node_modules, yarn cache, packages and ${
        sdkENV === 'localsdk' ? 'linking' : 'unlinking'
      } local SDK...`
    )
  );

  // remove node_modules
  if (fs.existsSync('./node_modules')) {
    try {
      await fs.promises.rm('./node_modules', { recursive: true });
      console.log(chalk.green('  -- node_modules removed'));
    } catch (err) {
      console.error(chalk.red(`Error removing node_modules: ${err}`));
    }
  }

  // clear yarn cache
  const yarnCacheClear = spawn('yarn', ['cache', 'clean'], {
    stdio: 'inherit',
    shell: true,
  });
  await new Promise((resolve) => yarnCacheClear.on('close', resolve));

  // empty yarn.lock instead of removing
  fs.writeFileSync('./yarn.lock', '');
  console.log(chalk.green('  -- yarn.lock emptied'));

  // remove @pushprotocol/uiweb from dependencies
  if (packageJSON.dependencies && packageJSON.dependencies['@pushprotocol/uiweb']) {
    delete packageJSON.dependencies['@pushprotocol/uiweb'];
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
    console.log(chalk.green('  -- @pushprotocol/uiweb removed from dependencies'));
  }

  // Mostly not needed
  // unlink @pushprotocol/uiweb
  console.log(chalk.green.dim('  -- Unlinking @pushprotocol/uiweb...'));
  const yarnUnlink = spawn('yarn', ['unlink', '@pushprotocol/uiweb'], {
    stdio: 'inherit',
    shell: true,
  });
  await new Promise((resolve) => yarnUnlink.on('close', resolve));

  // remove @pushprotocol/uiweb from resolutions
  if (packageJSON.resolutions && packageJSON.resolutions['@pushprotocol/uiweb']) {
    delete packageJSON.resolutions['@pushprotocol/uiweb'];
    if (Object.keys(packageJSON.resolutions).length === 0) {
      delete packageJSON.resolutions;
    }

    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
    console.log(chalk.green('  -- @pushprotocol/uiweb removed from resolutions'));
  }

  // remove manual dependencies for uiweb
  // ----
  packageJSONWatcher.LOCAL_PACKAGES_REQ.forEach((item) => {
    // Split the item at '@' but ignore the first '@' if it's at the beginning
    const splitIndex = item.indexOf('@', 1); // Start searching from index 1
    const key = item.substring(0, splitIndex);

    delete packageJSON.dependencies[key];
  });
  fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
  console.log(
    chalk.green(`  -- Manual dependencies removed to package.json: ${packageJSONWatcher.LOCAL_PACKAGES_REQ.join(', ')}`)
  );
  // ----
  // adjust this as needed

  // if env is localsdk -> Add @pushprotocol/uiweb (*) to dependencies and then link -p
  if (sdkENV === 'localsdk') {
    // link local sdk
    const envData = fs.readFileSync('./.localsdk.env', 'utf8');
    const envObject = parse(envData);

    // add dependency
    packageJSON.dependencies['@pushprotocol/uiweb'] = '*';
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
    console.log(chalk.green('  -- @pushprotocol/uiweb (*) added to dependencies'));

    // add manual dependencies for uiweb
    // ----
    packageJSONWatcher.LOCAL_PACKAGES_REQ.forEach((item) => {
      // Split the item at '@' but ignore the first '@' if it's at the beginning
      const splitIndex = item.indexOf('@', 1); // Start searching from index 1
      const key = item.substring(0, splitIndex);
      const value = item.substring(splitIndex + 1);

      packageJSON.dependencies[key] = value;
    });
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
    console.log(
      chalk.green(`  -- Manual dependencies added to package.json: ${packageJSONWatcher.LOCAL_PACKAGES_REQ.join(', ')}`)
    );
    // ----
    // adjust this as needed

    // Check for yarn.lock in the specified directory
    const sdkPath = envObject['LOCAL_PUSH_SDK_UIWEB_ABS_PATH'];
    const yarnLockPath = path.join(sdkPath, 'yarn.lock');

    if (!fs.existsSync(yarnLockPath)) {
      console.log(chalk.yellow('yarn.lock not found, creating one...'));
      // Create an empty yarn.lock file
      fs.writeFileSync(yarnLockPath, '');
      console.log(chalk.green('yarn.lock created.'));
    } else {
      console.log(chalk.green.dim('yarn.lock already exists. moving ahead'));
    }

    // link local sdk
    console.log(chalk.green.dim('  -- Linking local @pushprotocol/uiweb...'));
    const yarnkLink = spawn('yarn', ['link -p', envObject['LOCAL_PUSH_SDK_UIWEB_ABS_PATH']], {
      stdio: 'inherit',
      shell: true,
    });
    await new Promise((resolve) => yarnkLink.on('close', resolve));
  }

  // if env is prodsdk, add @pushprotocol/uiweb but read version from .localsdk.env
  if (sdkENV === 'prodsdk') {
    const envData = fs.readFileSync('./.localsdk.env', 'utf8');
    const envObject = parse(envData);

    let version = 'latest';
    // decode version from .localsdk.env
    if (envObject[packageJSONWatcher.STORAGE_KEY]) {
      const keyValue = derivePackageJSONValue('@pushprotocol/uiweb', envObject[packageJSONWatcher.STORAGE_KEY]);
      if (keyValue) {
        version = keyValue;
      }
    }

    packageJSON.dependencies['@pushprotocol/uiweb'] = version;
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
    console.log(chalk.green(`  -- @pushprotocol/uiweb added to dependencies with ${version} from .localsdk.env`));
  }

  // remove yarn cache
  if (fs.existsSync('./.yarn/cache')) {
    try {
      await fs.promises.rm('./.yarn/cache', { recursive: true });
      console.log(chalk.green('  -- yarn cache removed'));
    } catch (err) {
      console.error(chalk.red(`Error removing yarn cache: ${err}`));
    }
  }

  // reinstall by running yarn install
  console.log(chalk.green.dim('  -- Reinstalling via Yarn install...'));
  const yarnInstall = spawn('yarn', ['install'], {
    stdio: 'inherit',
    shell: true,
  });
  await new Promise((resolve) => yarnInstall.on('close', resolve));
};

const startdApp = async (sdkENV) => {
  if (sdkENV === 'localsdk') {
    console.log(chalk.green.bold(' ✅ Starting dApp with preserved symlinks...'));
    const startdApp = spawn('node', ['--preserve-symlinks', 'node_modules/vite/bin/vite.js'], {
      stdio: 'inherit',
      shell: true,
    });
    await new Promise((resolve) => startdApp.on('close', resolve));
  } else if (sdkENV === 'prodsdk') {
    console.log(chalk.green.bold(' ✅ Starting dApp via yarn start...'));
    const startdApp = spawn('yarn', ['start'], {
      stdio: 'inherit',
      shell: true,
    });
    await new Promise((resolve) => startdApp.on('close', resolve));
  }
};

var args = process.argv.slice(2);
await prepForDeployment(args[0], args[1], args[2]);
