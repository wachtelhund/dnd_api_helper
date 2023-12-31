import { ClassService } from '../services/classes/ClassService';
import { RaceService } from '../services/races/RaceService';
import { SpellService } from '../services/spells/SpellService';
import { Response } from '../types/Response';
import { CharacterData } from '../types/character/CharacterData';
import { Character } from './Character';

export class CharacterCreator {
  private spellService: SpellService;
  private classService: ClassService;
  private raceService: RaceService;
  constructor() {
    this.spellService = new SpellService();
    this.classService = new ClassService();
    this.raceService = new RaceService();
  }

  async generateRandomizedCharacter(
    numberOfSpells = 4,
    numberOfFeatures = 2,
  ): Promise<Character> {
    const race = await this.raceService.getRandom();
    const classData = await this.classService.getRandom();

    const spells = await this.getRandomSpells(classData.index, numberOfSpells);
    const features = await this.getRandomFeatures(
      classData.index,
      numberOfFeatures,
    );
    const randomSubclass =
      classData.subclasses[
        Math.floor(Math.random() * classData.subclasses.length)
      ];

    const charData = {
      race,
      class: classData,
      subclass: randomSubclass,
      spells,
      proficiencies: classData.proficiencies,
      features,
    } as CharacterData;
    return new Character(charData);
  }

  async getRandomSpells(
    classIndex: string,
    numberOfSpells: number = 4,
  ): Promise<Response> {
    const spells = await this.spellService.getClassSpells(classIndex);
    const randomSpells: Response = {
      count: 0,
      results: [],
    };
    const amountOfSpells =
      spells.count > numberOfSpells ? numberOfSpells : spells.count;
    for (let i = 0; i < amountOfSpells; i++) {
      const random = Math.floor(Math.random() * spells.count);
      const spell = spells.results[random];
      if (spell) {
        randomSpells.results.push(spell);
        randomSpells.count++;
      }
    }
    return randomSpells;
  }

  async getRandomFeatures(
    classIndex: string,
    numberOfFeatures: number = 4,
  ): Promise<Response> {
    const features = await this.classService.getClassFeatures(classIndex);
    const randomFeatures: Response = {
      count: 0,
      results: [],
    };

    const amountOfFeatures =
      features.count > numberOfFeatures ? numberOfFeatures : features.count;
    for (let i = 0; i < amountOfFeatures; i++) {
      const random = Math.floor(Math.random() * features.count);
      const feature = features.results[random];
      if (feature) {
        randomFeatures.results.push(feature);
        randomFeatures.count++;
      }
    }
    return randomFeatures;
  }
}
