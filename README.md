# DND api helper module
```
npm i dnd_api_helper
```
This module sends several requests to an [dnd5e api](http://www.dnd5eapi.co/docs/#overview).
The reason this module exists is to provide a simplified interface for developers to interact with chosen parts of the mentioned api. It is not meant to replace the already existing api unless the developer using this module is planning on creating a super simple dnd application.

#### Demo application
The demo application is restricted to people cloning the repo from github to decrease bundle size on npm, it can be launched by
* Cloning this repo to your local machine
* Running ```npm install``` followed by ```npm run demo```

The demo application will automatically be updated as new classes are added to the exports of src/index.js
and is not meant to be used as a source of truth but simply to show what kind of data you can expect from the different function calls.


#### Example usage
```js
import { EncounterCreator } from 'dnd_api_helper'

const encounterCreator = new EncounterCreator()

const monsters = await encounterCreator.getRandomMonsters(3)

console.log(monsters)
```

## Classes
> Not all classes are available to use with installed module
```mermaid
    classDiagram
        CRUDService <|-- MonsterService
        CRUDService <|-- ClassService
        CRUDService <|-- RaceService
        CRUDService <|-- SpellService

        MonsterService"1"<--EncounterCreator
        SpellService"1"<--CharacterCreator
        RaceService"1"<--CharacterCreator
        ClassService"1"<--CharacterCreator
        CharacterCreator-->Character


        class CRUDService{
            <<abstract>>
            +String url
            +getAll()
            +getOne()
            +getRandom()
        }

        class Character{
            -character
            +race
            +class
            +spells
            +proficiencies
            +subclass
            +features
            +getCharacter()
        }

        class Die{
            -sides
            -value
            +Dice(sides)
            +isValidSides(sides)
            +roll()
            +rollMultipleTimes(times)
            +toString()
            +toJSON()
        }

        class SpellService{
            +getClassSpells(classIndex)
        }

        class EncounterCreator{
            +getRandomMonsters(numberOfMonsters, challengeRating)
        }

        class CharacterCreator{
            +getRandomCharacter()
            +getRandomSpells(numberOfSpells)
            +getRandomFeatures(numberOfFeatures)
        }
```
### EncounterCreator
getRandomMonsters(@Optional numberOfMonsters: number, @Optional challengeRating: number). This method fetches all monsters with the desired challenge rating(if any has been specified) and picks one or more random monsters from the retrieved list.

### CharacterCreator
getRandomCharacter(). This method uses the different services to fetch random classes, races and so on to build a random character. This method is meant to be used as a simple way to quickly create npcs etc.

### Die
User to emulate a die

### MonsterService, ClassService, RaceService, SpellService
All of these classes are wrapper functions to simplify work with the dnd api.
#### Example usage
```js
const monsterService = new MonsterService();

cosnt monsters = await monsterService.getAll()

console.log(monsters)

const specificMonster = await monsterService.getOne(monsters.results[0].index)

console.log(specificMonster)
```
getAll(). This method fetches all available entries depending on service type.
getOne(index). Fetches one specific entry.

## Testing
Unittesting is done using Jest and is a work in progess.
```
npm test
```

## NPM
Information about the current version can be found on [npm](https://www.npmjs.com/package/dnd_api_helper).
