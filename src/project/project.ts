import { Project as MorphProject } from "ts-morph"

export class Project {
  private project: MorphProject = null;

  constructor(public cryocon: string) {
    
  }
}
