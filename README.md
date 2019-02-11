# THIS REPOSITORY IS CURRENTLY NO LONGER MAINTAINED.
Ideally, there will be a @types version at some point found in [this repo](https://github.com/Colorfulstan/overwolf-dts).
You still can use this type definitions, and contributions for updates are welcome.

# Overwolf-types
typescript definitions for overwolf API

originally forked gist from https://gist.github.com/danpantry/f90ec0cd48d73a0accdf

For now just using this repo for typings definition manager dependency but would like to get a maintained defintion out of this somewhen

## Installation

```npm i -g typings```

In your project

```typings install overwolf=github:Colorfulstan/typed-overwolf --global --save```


### TODO

Last update: v 0.85 - Documentations and definitions needs to be updated

- [ ] update Overwolf.Static members acchording to [api list](http://developers.overwolf.com/documentation/sdk/overwolf/) 
- [ ] update project acchording to [generator-typings](https://github.com/typings/generator-typings)
- [ ] add [tslint config](https://github.com/typings/tslint-config-typings) (maybe included in generator-typings)
- [ ] add versioning for typings
- [ ] split project into .d.ts files or folders for each Overwolf.Static member
- [ ] add githook (pre-commit?) to combine all files to distribution file
- [ ] add lists for updating Overwolf.Static members
- [ ] use namespaces for structuring
- [ ] release to [typings registry](https://github.com/typings/registry)
