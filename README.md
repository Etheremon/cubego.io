## Folder Structure

```
voxel-web
|
+- index.html                   index file
+- webpack.*                    webpack configs
+- assets                       files that are served directly outside webpack & react
    +- js                       js files handling smart contract's communication
                                    & works as a portal talking to the smart contracts only (without touching the game logic)
                                    & NOTE: DO NOT INCLUDE ANY GAME LOGIC, LOGIC VARIABILES HERE. USE /src/constatns AS THE SINGLE SOURCE OF LOGIC CONFIG
+- src                          main files          
    +- app.jsx                  entry
    +- config.js                general config
    +- config_language.js       languague config
    +- config_store.js          redux store config (config saga)
    +- actions                  to define redux actions
    +- reducers                 to define redux reducers & store
    +- sagas                    to define redux-sagas
    +- views                    all web-views come here
        +- containers           web's pages
        +- components           big components which belong to our specific web.
        +- styles               all common styles
        +- widgets              all common widgets, web's general components.
    +- games                    all game-scenes come here, together with game's components.
                                    games should also include react wrappers of the games; so that the views do not have to touch
                                    game's logic
    +- constants                game's constants, may include logic config
    +- services                 services such as API, Web Trackers, Local Storage, etc.
    +- utils                    utility functions & logic
    +- shared                   all resource files come here                       
```

## Rules

### Git
* Branch Name: `name_date_description` .e.g `jarvis_20180830_adventure_mode`
* Commit: `[related modules] description` .e.g `[adventure] add monsters`

### Classname
* Follow http://getbem.com/naming/
* Try to use maximum 3 levels of element .e.g `block__element__child-element--modifier`
 

## Run

### Variables
* `dev`: env.ENV === 'dev'
* `prod`: env.END === 'prod' 

### Run Local

```
npm install
npm run startDev
npm run startProd
```

### Build Bundles

```
npm run buildDev
npm run buildProd
```