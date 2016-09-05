VIDEO ESSENCE
================================

BECAUSE RED IS FASTAAAAA!

# INSTALLATION

1. create database `video_essence` (default login/password: `root`/`root`)
2. install [composer](https://getcomposer.org/download/)
3. install [nodejs with npm](https://nodejs.org/download/)
4. install [grunt](http://gruntjs.com/) `npm install -g grunt-cli`
5. install [redis](http://redis.io/download) `2.8` or highter (for [windows](https://github.com/MSOpenTech/redis/releases))
6. install php dependencies

      ```
      composer global require "fxp/composer-asset-plugin:1.0.0"
      composer install
      ```

7. install nodejs dependencies

      ```
      npm install
      ```

8. run migrations

      ```
      ./yii migrate --migrationPath=@app//vendor/dektrium/yii2-user/migrations
      ./yii migrate
      ```

9. to build assets, run grunt

      ```
      grunt build
      ```

10. to rebuild assets on file changes (watch), run grunt

      ```
      grunt
      ```

# DIRECTORY STRUCTURE

      .rocketeer/         contains deploy settings
      assets/             contains assets definition
      commands/           contains console commands (controllers)
      components/         contains VIDEO components and another strange stuff
      config/             contains application configurations
      controllers/        contains Web controller classes
      docs/               contains ALL that you need to know about this project
      mail/               contains view files for e-mails
      models/             contains model classes
      node_modules/       contains nodejs dev-dependencies
      runtime/            contains files generated during runtime
      static/             contains frontend files like sass, scss, js, images
      tests/              contains various tests for the basic application
      vendor/             contains dependent 3rd-party packages
      views/              contains view files for the Web application
      web/                contains the entry script and Web resources



# REQUIREMENTS

The minimum requirement by this application template that your Web server supports PHP 5.4.0.

# WORKFLOW

## Branches:

- `master` - main branch, for deployment
- `dev` - Base for other branches; merged to `master`
- `$feature-name` - Based on `dev`; after finished merged to `dev`

Examples of using branches:

### Starting a new feature:
```
git fetch origin
git checkout origin/dev
git checkout -b new-feature-name
```

### When the feature is ready
```
git commit 
git push origin new-feature-name
git fetch origin
git checkout origin/dev 
git merge --no-ff new-feature-name
git push origin HEAD:dev
git checkout new-feature-name
```

## Deploy
```
git fetch
git checkout origin/master
git merge --ff origin/dev -X theirs 
git push origin HEAD:master
rocketeer deploy
```
